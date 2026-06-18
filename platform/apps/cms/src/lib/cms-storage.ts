import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const useSupabase = SUPABASE_URL !== '' && SUPABASE_SERVICE_ROLE_KEY !== '';

const DATA_DIR = path.join(process.cwd(), '.cms-data');
const TABLE = 'cms_documents';

let cachedClient: SupabaseClient | null = null;

function getClient(): SupabaseClient {
    if (cachedClient === null) {
        cachedClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false }
        });
    }
    return cachedClient;
}

export function isSupabaseConfigured(): boolean {
    return useSupabase;
}

export async function uploadImage(
    fileName: string,
    bytes: Buffer,
    contentType: string
): Promise<string> {
    const client = getClient();
    const { error } = await client.storage
        .from('uploads')
        .upload(fileName, bytes, { contentType, upsert: false });
    if (error !== null) throw new Error('Supabase upload failed: ' + error.message);
    return client.storage.from('uploads').getPublicUrl(fileName).data.publicUrl;
}

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'];

export interface StoredImage {
    name: string;
    path: string;
    uploadedAt: string;
}

function isImageName(name: string): boolean {
    const ext = path.extname(name).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
}

function storageNameFromPath(filePath: string): string {
    const marker = '/uploads/';
    const index = filePath.lastIndexOf(marker);
    return index === -1 ? filePath : filePath.slice(index + marker.length);
}

export async function listStoredImages(): Promise<StoredImage[]> {
    if (useSupabase) {
        const client = getClient();
        const { data, error } = await client.storage
            .from('uploads')
            .list('', { limit: 1000, sortBy: { column: 'created_at', order: 'desc' } });
        if (error !== null) throw new Error('Supabase list failed: ' + error.message);
        return (data ?? [])
            .filter((file) => file.id !== null && isImageName(file.name))
            .map((file) => ({
                name: file.name,
                path: client.storage.from('uploads').getPublicUrl(file.name).data.publicUrl,
                uploadedAt: file.created_at ?? new Date(0).toISOString()
            }));
    }

    let entries: string[];
    try {
        entries = await fs.readdir(UPLOAD_DIR);
    } catch {
        return [];
    }
    const images: StoredImage[] = [];
    for (const name of entries) {
        if (name.startsWith('.') || !isImageName(name)) continue;
        const stat = await fs.stat(path.join(UPLOAD_DIR, name));
        if (!stat.isFile()) continue;
        images.push({ name, path: '/uploads/' + name, uploadedAt: stat.mtime.toISOString() });
    }
    return images;
}

export async function deleteStoredImage(filePath: string): Promise<void> {
    const name = storageNameFromPath(filePath);
    if (useSupabase) {
        const { error } = await getClient().storage.from('uploads').remove([name]);
        if (error !== null) throw new Error('Supabase delete failed: ' + error.message);
        return;
    }
    try {
        await fs.unlink(path.join(UPLOAD_DIR, name));
    } catch {
        return;
    }
}

export async function peekDoc<T>(key: string): Promise<T | null> {
    if (useSupabase) {
        const { data, error } = await getClient()
            .from(TABLE)
            .select('data')
            .eq('key', key)
            .maybeSingle();
        if (error !== null) throw new Error('Supabase read failed for ' + key + ': ' + error.message);
        return data === null ? null : (data.data as T);
    }

    const file = path.join(DATA_DIR, key + '.json');
    try {
        const raw = await fs.readFile(file, 'utf8');
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

export async function readDoc<T>(key: string, fallback: () => T | Promise<T>): Promise<T> {
    if (useSupabase) {
        const { data, error } = await getClient()
            .from(TABLE)
            .select('data')
            .eq('key', key)
            .maybeSingle();
        if (error !== null) throw new Error('Supabase read failed for ' + key + ': ' + error.message);
        if (data === null) {
            const seeded = await fallback();
            await writeDoc(key, seeded);
            return seeded;
        }
        return data.data as T;
    }

    const file = path.join(DATA_DIR, key + '.json');
    try {
        const raw = await fs.readFile(file, 'utf8');
        return JSON.parse(raw) as T;
    } catch {
        const seeded = await fallback();
        await writeDoc(key, seeded);
        return seeded;
    }
}

export async function writeDoc<T>(key: string, value: T): Promise<void> {
    if (useSupabase) {
        const { error } = await getClient()
            .from(TABLE)
            .upsert({ key, data: value, updated_at: new Date().toISOString() });
        if (error !== null) throw new Error('Supabase write failed for ' + key + ': ' + error.message);
        return;
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(DATA_DIR, key + '.json'), JSON.stringify(value, null, 2), 'utf8');
}
