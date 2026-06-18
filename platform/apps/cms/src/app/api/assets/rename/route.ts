import { NextResponse } from 'next/server';
import { renameAsset } from '@/lib/assets-store';

interface RenameBody {
    path?: string;
    name?: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as RenameBody;
    const assetPath = body.path?.trim() ?? '';
    const name = body.name?.trim() ?? '';
    if (assetPath === '' || name === '') {
        return NextResponse.json({ error: 'Path and name are required' }, { status: 400 });
    }
    await renameAsset(assetPath, name);
    return NextResponse.json({ ok: true });
}
