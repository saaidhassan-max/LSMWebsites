import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

const CMS_UPLOADS_DIR = path.resolve(process.cwd(), '../cms/public/uploads');

function contentType(file: string): string {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
    if (ext === '.webp') return 'image/webp';
    if (ext === '.svg') return 'image/svg+xml';
    return 'image/png';
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ file: string }> }
): Promise<Response> {
    const { file } = await params;
    if (file !== path.basename(file)) notFound();

    try {
        const bytes = await fs.readFile(path.join(CMS_UPLOADS_DIR, file));
        return new Response(bytes, {
            headers: {
                'Content-Type': contentType(file),
                'Cache-Control': 'public, max-age=60'
            }
        });
    } catch {
        notFound();
    }
}
