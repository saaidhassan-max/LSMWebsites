import type React from 'react';
import { notFound } from 'next/navigation';
import { getLandingPage } from '@/lib/landing-store';
import { getSiteSettings } from '@/lib/site-settings-store';
import { LandingEditor } from '@/components/landing-editor';

export const dynamic = 'force-dynamic';

export default async function EditLandingPage({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const [page, settings] = await Promise.all([getLandingPage(id), getSiteSettings()]);
    if (page === undefined) notFound();
    return <LandingEditor page={page} settings={settings} />;
}
