import type React from 'react';
import { notFound } from 'next/navigation';
import { SitePageEditor } from '@/components/site-page-editor';
import { getSitePage } from '@/lib/site-pages-store';
import { getSiteSettings } from '@/lib/site-settings-store';

export const dynamic = 'force-dynamic';

export default async function EditSitePage({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const [page, settings] = await Promise.all([getSitePage(id), getSiteSettings()]);
    if (page === undefined) notFound();
    return <SitePageEditor page={page} settings={settings} />;
}
