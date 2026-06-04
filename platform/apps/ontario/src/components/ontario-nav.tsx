'use client';

import type React from 'react';
import { useState } from 'react';
import { GoodChoiceLogoSection } from '@lsm/ui/components/good-choice-logo-section/good-choice-logo-section';
import { NavDrawer } from '@lsm/ui/components/nav-drawer/nav-drawer';

const NAV_ITEMS = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '📞', label: 'Contact Us', href: '/contact' },
    { emoji: 'ℹ️', label: 'About Us', href: '/about' },
    { emoji: '🛡️', label: 'Safer Gambling', href: '/safer-gambling' }
];

export function OntarioNav(): React.ReactElement {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <GoodChoiceLogoSection
                logoHref="/"
                onMenuClick={() => setDrawerOpen(true)}
            />
            <NavDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                items={NAV_ITEMS.map((item) => ({
                    ...item,
                    isActive: false
                }))}
            />
        </>
    );
}
