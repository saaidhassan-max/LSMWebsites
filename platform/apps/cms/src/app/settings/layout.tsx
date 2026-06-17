import type React from 'react';
import { CmsSidebar } from '@/components/cms-sidebar';
import { SettingsSecondaryNav } from '@/components/settings-secondary-nav';

export default function SettingsLayout({
    children
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <div className="h-full flex">
            <CmsSidebar active="settings" />
            <SettingsSecondaryNav />
            <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">{children}</main>
        </div>
    );
}
