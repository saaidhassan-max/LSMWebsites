import type React from 'react';
import { CmsSidebar } from '@/components/cms-sidebar';
import { SiteSettingsEditor } from '@/components/site-settings-editor';
import { ThemeToggle } from '@/components/theme-toggle';
import { getSiteSettings } from '@/lib/site-settings-store';
import { listSitePages } from '@/lib/site-pages-store';

export const dynamic = 'force-dynamic';

export default async function SettingsScreen(): Promise<React.ReactElement> {
    const [settings, pages] = await Promise.all([getSiteSettings(), listSitePages()]);

    return (
        <div className="min-h-screen flex">
            <CmsSidebar active="settings" />
            <main className="flex-1 min-w-0">
                <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant">
                    <span className="text-[15px] font-medium">Site settings</span>
                    <ThemeToggle />
                </header>
                <SiteSettingsEditor settings={settings} pages={pages} />
            </main>
        </div>
    );
}
