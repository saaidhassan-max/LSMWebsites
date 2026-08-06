'use client';

import type React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { NavDrawer } from '@lsm/ui/components/nav-drawer/nav-drawer';
import type { NavItem } from '@lsm/ui/components/nav-drawer/nav-drawer.types';

const BASE_ITEMS: NavItem[] = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '🎁', label: 'No Deposit Bingo', href: '/no-deposit-bingo' },
    { emoji: '🔥', label: 'Free Bingo Bonuses', href: '/' },
    { emoji: '✊', label: 'Exclusive Deals', href: '/' },
    { emoji: '💎', label: 'No Wagering Bingo', href: '/' },
    { emoji: '🛡️', label: 'Safer Gambling', href: '/safer-gambling' },
    { emoji: '👋', label: 'About Us', href: '/about' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
    { emoji: '🧩', label: 'Landing Page V4', href: '/signup-v4' },
    { emoji: '1️⃣', label: 'V4 · No Title', href: '/signup-v4a' },
    { emoji: '2️⃣', label: 'V4 · No Ghost Text', href: '/signup-v4b' },
    { emoji: '3️⃣', label: 'V4 · Example Ghost', href: '/signup-v4c' },
    { emoji: '🎬', label: 'V4 · Floating Label', href: '/signup-v4d' }
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
                backgroundSrc="/sfb/LogoSection/Lego_Deco2.png"
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
