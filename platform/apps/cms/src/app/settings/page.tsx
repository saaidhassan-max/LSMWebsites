import type React from 'react';
import { SiteSettingsEditor } from '@/components/site-settings-editor';
import { ThemeToggle } from '@/components/theme-toggle';
import { getSiteSettings } from '@/lib/site-settings-store';
import { listSitePages } from '@/lib/site-pages-store';

export const dynamic = 'force-dynamic';

export default async function SettingsScreen(): Promise<React.ReactElement> {
    const [settings, pages] = await Promise.all([getSiteSettings(), listSitePages()]);

    return (
        <>
            <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant shrink-0">
                <span className="text-[15px] font-medium">Global settings</span>
                <ThemeToggle />
            </header>
            <SiteSettingsEditor settings={settings} pages={pages} />
        </>
    );
}
