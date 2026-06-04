'use client';

import type React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { NavDrawer } from '@lsm/ui/components/nav-drawer/nav-drawer';
import type { NavItem } from '@lsm/ui/components/nav-drawer/nav-drawer.types';

const BASE_ITEMS: NavItem[] = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '🎰', label: 'No Deposit Slots', href: '/' },
    { emoji: '🔥', label: 'Free Spins Bonuses', href: '/' },
    { emoji: '✊', label: 'Exclusive Deals', href: '/' },
    { emoji: '💎', label: 'No Wagering Slots', href: '/' },
    { emoji: '🛡️', label: 'Safer Gambling', href: '/safer-gambling' },
    { emoji: '👋', label: 'About Us', href: '/about' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
    { emoji: '📋', label: 'Sign Up', href: '/signup' }
];

export function SfsgNav(): React.ReactElement {
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
                logoSrc="/sfsg/logo-mobile.svg"
                logoDesktopSrc="/sfsg/logo-desktop.svg"
                logoAlt="Super Free Slot Games"
                logoHref="/"
                backgroundSrc="/sfsg/LogoSection/Lego_Deco2.png"
                onMenuClick={() => setDrawerOpen(true)}
            />
            <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} />
        </>
    );
}
