'use client';

import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Mail, Settings, ShieldCheck } from 'lucide-react';

interface SecondaryNavItem {
    href: string;
    icon: React.ReactNode;
    label: string;
    editable: boolean;
}

const GLOBAL_ITEM: SecondaryNavItem = {
    href: '/settings',
    icon: <Settings size={15} />,
    label: 'Global settings',
    editable: true
};

const PAGE_ITEMS: SecondaryNavItem[] = [
    { href: '/settings/about', icon: <FileText size={15} />, label: 'About us', editable: true },
    { href: '/settings/contact', icon: <Mail size={15} />, label: 'Contact us', editable: false },
    {
        href: '/settings/privacy',
        icon: <ShieldCheck size={15} />,
        label: 'Privacy Policy',
        editable: true
    },
    {
        href: '/settings/terms',
        icon: <FileText size={15} />,
        label: 'Terms and conditions',
        editable: true
    },
    { href: '/settings/disclaimer', icon: <FileText size={15} />, label: 'Disclaimer', editable: true }
];

function navClass(active: boolean): string {
    return (
        'flex items-center gap-2.5 text-[13px] px-2 py-1.5 rounded-lg ' +
        (active
            ? 'bg-m3-gold/20 text-m3-on-surface font-medium'
            : 'text-m3-on-surface-variant hover:bg-m3-surface-high')
    );
}

function Item({ item, active }: { item: SecondaryNavItem; active: boolean }): React.ReactElement {
    const content = (
        <>
            <span className="text-current shrink-0">{item.icon}</span>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {!item.editable && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-m3-surface-highest text-m3-on-surface-variant">
                    Locked
                </span>
            )}
        </>
    );

    if (!item.editable) {
        return (
            <div className={navClass(false) + ' opacity-60 cursor-default'} title="Not editable">
                {content}
            </div>
        );
    }

    return (
        <Link href={item.href} className={navClass(active)}>
            {content}
        </Link>
    );
}

export function SettingsSecondaryNav(): React.ReactElement {
    const pathname = usePathname();

    return (
        <aside className="w-[200px] shrink-0 border-r border-m3-outline-variant bg-m3-surface-low p-3 flex flex-col gap-0.5">
            <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant px-1.5 pb-1.5">
                Global Settings
            </div>
            <Item item={GLOBAL_ITEM} active={pathname === '/settings'} />
            <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant px-1.5 pt-4 pb-1.5">
                Pages
            </div>
            {PAGE_ITEMS.map((item) => (
                <Item key={item.label} item={item} active={pathname === item.href} />
            ))}
        </aside>
    );
}
