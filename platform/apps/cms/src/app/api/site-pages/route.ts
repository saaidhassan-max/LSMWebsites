import { NextResponse } from 'next/server';
import { createSitePage, listSitePages } from '@/lib/site-pages-store';

export async function GET(): Promise<NextResponse> {
    const pages = await listSitePages();
    return NextResponse.json({ pages });
}

export async function POST(): Promise<NextResponse> {
    const id = await createSitePage();
    return NextResponse.json({ id });
}
