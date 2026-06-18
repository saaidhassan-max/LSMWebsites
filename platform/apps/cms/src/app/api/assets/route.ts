import { NextResponse } from 'next/server';
import { listAssets } from '@/lib/assets-store';
import type { AssetListResponse } from '@/lib/assets.types';

export async function GET(): Promise<NextResponse<AssetListResponse>> {
    const assets = await listAssets();
    return NextResponse.json({ assets });
}
