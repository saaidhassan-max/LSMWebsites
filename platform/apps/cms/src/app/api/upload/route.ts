import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { isSupabaseConfigured, uploadImage } from '@/lib/cms-storage';
import { recordAsset } from '@/lib/assets-store';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

function displayNameFor(originalName: string): string {
    const base = originalName.replace(/\.[^.]+$/, '').trim();
    return base.length > 0 ? base : 'Untitled image';
}

export async function POST(request: Request): Promise<NextResponse> {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || '.png';
    const name = 'img_' + Date.now().toString(36) + ext;
    const uploadedPath = isSupabaseConfigured()
        ? await uploadImage(name, bytes, file.type || 'image/png')
        : await writeLocal(name, bytes);

    await recordAsset(uploadedPath, displayNameFor(file.name), new Date().toISOString());
    return NextResponse.json({ path: uploadedPath });
}

async function writeLocal(name: string, bytes: Buffer): Promise<string> {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
    return '/uploads/' + name;
}
