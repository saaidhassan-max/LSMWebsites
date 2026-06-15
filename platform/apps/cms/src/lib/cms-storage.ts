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
