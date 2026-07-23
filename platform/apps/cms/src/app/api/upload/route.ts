import { randomBytes } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { isSupabaseConfigured, uploadImage } from '@/lib/cms-storage';
import { recordAsset } from '@/lib/assets-store';
import type { AssetUploadResponse } from '@/lib/assets.types';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

function displayNameFor(originalName: string): string {
    const base = originalName.replace(/\.[^.]+$/, '').trim();
    return base.length > 0 ? base : 'Untitled image';
}

function megabytes(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1);
}

export async function POST(request: Request): Promise<NextResponse<AssetUploadResponse>> {
    try {
        const form = await request.formData();
        const file = form.get('file');
        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
        }
        if (file.size === 0) {
            return NextResponse.json({ error: 'That file is empty.' }, { status: 400 });
        }
        if (file.size > MAX_UPLOAD_BYTES) {
            return NextResponse.json(
                {
                    error:
                        'That image is ' +
                        megabytes(file.size) +
                        'MB. The limit is ' +
                        megabytes(MAX_UPLOAD_BYTES) +
                        'MB — please compress it and try again.'
                },
                { status: 413 }
            );
        }

        const bytes = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name).toLowerCase() || '.png';
        const name = 'img_' + Date.now().toString(36) + '_' + randomBytes(4).toString('hex') + ext;
        const uploadedPath = isSupabaseConfigured()
            ? await uploadImage(name, bytes, file.type || 'image/png')
            : await writeLocal(name, bytes);

        await recordAsset(uploadedPath, displayNameFor(file.name), new Date().toISOString());
        return NextResponse.json({ path: uploadedPath });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown upload error.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

async function writeLocal(name: string, bytes: Buffer): Promise<string> {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
    return '/uploads/' + name;
}
