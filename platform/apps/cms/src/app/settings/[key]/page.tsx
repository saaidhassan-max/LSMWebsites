import type React from 'react';
import { notFound } from 'next/navigation';
import { ContentPageEditor } from '@/components/content-page-editor';
import { ThemeToggle } from '@/components/theme-toggle';
import { getContentPage } from '@/lib/content-pages-store';
import { CONTENT_PAGE_KEYS } from '@/lib/content-pages.types';
import type { ContentPageKey } from '@/lib/content-pages.types';

export const dynamic = 'force-dynamic';

const TITLES: Record<string, string> = {
    about: 'About us',
    privacy: 'Privacy Policy',
    terms: 'Terms and conditions',
    disclaimer: 'Disclaimer',
    contact: 'Contact us'
};

function isEditableKey(key: string): key is ContentPageKey {
    return (CONTENT_PAGE_KEYS as string[]).includes(key);
}

export default async function ContentPageScreen({
    params
}: {
    params: Promise<{ key: string }>;
}): Promise<React.ReactElement> {
    const { key } = await params;

    if (key !== 'contact' && !isEditableKey(key)) notFound();

    return (
        <>
            <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant shrink-0">
                <span className="text-[15px] font-medium">{TITLES[key]}</span>
                <ThemeToggle />
            </header>
            {key === 'contact' ? (
                <div className="p-6 max-w-[640px]">
                    <div className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-5 text-[13px] leading-6 text-m3-on-surface-variant">
                        <p className="text-m3-on-surface font-medium mb-1">
                            The Contact us page is not editable here.
                        </p>
                        <p>
                            It contains a working contact form and is managed in the site code. The
                            other pages in this list can be edited and published from the CMS.
                        </p>
                    </div>
                </div>
            ) : (
                <ContentPageEditor page={await getContentPage(key as ContentPageKey)} />
            )}
        </>
    );
}
