import { NextResponse } from 'next/server';
import { deleteAsset, findAssetUsage } from '@/lib/assets-store';
import type { AssetDeleteResponse } from '@/lib/assets.types';

interface DeleteBody {
    path?: string;
}

export async function POST(request: Request): Promise<NextResponse<AssetDeleteResponse>> {
    const body = (await request.json()) as DeleteBody;
    const assetPath = body.path?.trim() ?? '';
    if (assetPath === '') {
        return NextResponse.json({ ok: false, usedIn: [] }, { status: 400 });
    }
    const usedIn = await findAssetUsage(assetPath);
    if (usedIn.length > 0) {
        return NextResponse.json({ ok: false, usedIn });
    }
    await deleteAsset(assetPath);
    return NextResponse.json({ ok: true, usedIn: [] });
}
