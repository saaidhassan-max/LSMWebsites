'use client';

import type React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { NavDrawer } from '@lsm/ui/components/nav-drawer/nav-drawer';
import type { NavItem } from '@lsm/ui/components/nav-drawer/nav-drawer.types';

const BASE_ITEMS: NavItem[] = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '🎁', label: 'No Deposit Bingo', href: '/' },
    { emoji: '🔥', label: 'Free Bingo Bonuses', href: '/' },
    { emoji: '✊', label: 'Exclusive Deals', href: '/' },
    { emoji: '💎', label: 'No Wagering Bingo', href: '/' },
    { emoji: '👋', label: 'About Us', href: '/about' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
    { emoji: '📋', label: 'Sign Up', href: '/signup' }
];

export function SfbNav(): React.ReactElement {
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
                logoSrc="/sfb/logo-mobile.svg"
                logoDesktopSrc="/sfb/logo-desktop.svg"
                logoAlt="Super Free Bingo"
                logoHref="/"
                onMenuClick={() => setDrawerOpen(true)}
            />
            <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} />
        </>
    );
}
