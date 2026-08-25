'use client';

import type React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { NavDrawer } from '@lsm/ui/components/nav-drawer/nav-drawer';
import type { NavItem } from '@lsm/ui/components/nav-drawer/nav-drawer.types';

const BASE_ITEMS: NavItem[] = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '🔥', label: 'Exclusive Offers', href: '/category/exclusive-offers' },
    { emoji: '🎁', label: 'No Deposit Offers', href: '/category/no-deposit-offers' },
    { emoji: '🚀', label: 'Deposit Offers', href: '/category/deposit-offers' },
    { emoji: '🖐️', label: 'For A Fiver', href: '/category/for-a-fiver' },
    { emoji: '✅', label: 'Keep What You Win', href: '/category/keep-what-you-win' },
    { emoji: '👋', label: 'About Us', href: '/about' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
    { emoji: '🦺', label: 'Safer Gambling', href: '/safer-gambling' },
    { emoji: '🎬', label: 'Landing Page', href: '/signup-v4d' }
];

interface SfbNavProps {
    items?: NavItem[];
    showMenu?: boolean;
}

export function SfbNav({
    items: passedItems = BASE_ITEMS,
    showMenu = true
}: SfbNavProps): React.ReactElement {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();

    const seenPaths = new Set<string>();
    const items = passedItems.map((item) => {
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
                backgroundSrc="/sfb/LogoSection/new_logodeco_bingo_mob.png"
                backgroundDesktopSrc="/sfb/LogoSection/new_logodeco_bingo_desktop.png"
                showMenu={showMenu}
                sticky
                onMenuClick={() => setDrawerOpen(true)}
            />
            {showMenu === true && (
                <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} />
            )}
        </>
    );
}
