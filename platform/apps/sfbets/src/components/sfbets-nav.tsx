'use client';

import type React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { NavDrawer } from '@lsm/ui/components/nav-drawer/nav-drawer';
import type { NavItem } from '@lsm/ui/components/nav-drawer/nav-drawer.types';

const BASE_ITEMS: NavItem[] = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '🎰', label: 'Free Casino Bonuses', href: '/' },
    { emoji: '💰', label: 'Deposit Offer', href: '/' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
    { emoji: '👋', label: 'About Us', href: '/about' }
];

export function SfbetsNav(): React.ReactElement {
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
                logoSrc="/sfbets/logo-mobile.svg"
                logoDesktopSrc="/sfbets/logo-desktop.svg"
                logoAlt="Super Free Bets"
                logoHref="/"
                backgroundSrc="/sfbets/LogoSection/Lego_Deco2.png"
                onMenuClick={() => setDrawerOpen(true)}
            />
            <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} />
        </>
    );
}
