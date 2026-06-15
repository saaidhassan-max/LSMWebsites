import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { isSupabaseConfigured, uploadImage } from '@/lib/cms-storage';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: Request): Promise<NextResponse> {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || '.png';
    const name = 'img_' + Date.now().toString(36) + ext;

    if (isSupabaseConfigured()) {
        const url = await uploadImage(name, bytes, file.type || 'image/png');
        return NextResponse.json({ path: url });
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
    return NextResponse.json({ path: '/uploads/' + name });
}
