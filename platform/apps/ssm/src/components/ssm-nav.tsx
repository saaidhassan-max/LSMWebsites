'use client';

import type React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { NavDrawer } from '@lsm/ui/components/nav-drawer/nav-drawer';
import type { NavItem } from '@lsm/ui/components/nav-drawer/nav-drawer.types';

const BASE_ITEMS: NavItem[] = [
    { emoji: '🏠', label: 'Hjem', href: '/' },
    { emoji: '🎁', label: 'Tilbud Uden Indbetaling', href: '/' },
    { emoji: '🔥', label: 'Tilbud Med Indbetaling', href: '/' },
    { emoji: '✊', label: 'Eksklusiv Aftale', href: '/' },
    { emoji: '💎', label: 'Uden Satsningskrav', href: '/' },
    { emoji: '👋', label: 'Om Os', href: '/om-os' },
    { emoji: '✉️', label: 'Kontakt Os', href: '/kontakt' },
    { emoji: '📋', label: 'Landing Page', href: '/signup' }
];

export function SsmNav(): React.ReactElement {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();

    const seenPaths = new Set<string>();
    const items = BASE_ITEMS.map((item) => {
        const isFirst = !seenPaths.has(item.href);
        seenPaths.add(item.href);
        return { ...item, isActive: item.href === pathname && isFirst };
    });

    return (
        <>
            <LogoSection
                logoSrc="/ssm/LogoSection/SSMLogo.svg"
                backgroundSrc="/ssm/LogoSection/Lego_Deco.png"
                onMenuClick={() => setDrawerOpen(true)}
            />
            <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} />
        </>
    );
}
