import type React from 'react';
import { notFound } from 'next/navigation';
import { SitePageEditor } from '@/components/site-page-editor';
import { listOffers, listOperators } from '@/lib/cms-content-store';
import { getSitePage } from '@/lib/site-pages-store';
import { getSiteSettings } from '@/lib/site-settings-store';

export const dynamic = 'force-dynamic';

export default async function EditSitePage({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const [page, settings, offers, operators] = await Promise.all([
        getSitePage(id),
        getSiteSettings(),
        listOffers(),
        listOperators()
    ]);
    if (page === undefined) notFound();
    return <SitePageEditor page={page} settings={settings} offers={offers} operators={operators} />;
}
