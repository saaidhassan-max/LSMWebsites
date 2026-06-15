import type React from 'react';
import { getPublishedBySlug } from '@/lib/landing-store';
import { getSiteSettings } from '@/lib/site-settings-store';
import { LandingPageView } from '@/components/landing-page-view';

export const dynamic = 'force-dynamic';

export default async function PreviewLandingPage({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const { slug } = await params;
    const [page, settings] = await Promise.all([getPublishedBySlug(slug), getSiteSettings()]);

    if (page === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center px-6">
                <div>
                    <p className="text-[18px] font-medium">This landing page is not published.</p>
                    <p className="text-[13px] text-m3-on-surface-variant mt-1">
                        Publish it from the CMS to see it live here.
                    </p>
                </div>
            </div>
        );
    }

    return <LandingPageView content={page.content} settings={settings} />;
}
