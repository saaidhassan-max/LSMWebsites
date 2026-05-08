import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavDrawer } from './nav-drawer';

const SSM_ITEMS = [
    { emoji: '🏠', label: 'Hjem', href: '/', isActive: true },
    { emoji: '🎁', label: 'Tilbud Uden Indbetaling', href: '/' },
    { emoji: '🔥', label: 'Tilbud Med Indbetaling', href: '/' },
    { emoji: '✊', label: 'Eksklusiv Aftale', href: '/' },
    { emoji: '💎', label: 'Uden Satsningskrav', href: '/' },
    { emoji: '👋', label: 'Om Os', href: '/om-os' },
    { emoji: '✉️', label: 'Kontakt Os', href: '/kontakt' }
];

const meta: Meta<typeof NavDrawer> = {
    title: 'Components/NavDrawer',
    component: NavDrawer,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof NavDrawer>;

export const OpenMobile: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <div className="relative w-[390px] h-[812px] overflow-hidden bg-surface-container-low">
                <button
                    className="m-4 px-4 py-2 bg-tertiary text-on-surface-dark rounded-full text-sm font-medium"
                    onClick={() => setOpen(true)}
                >
                    Open drawer
                </button>
                <NavDrawer isOpen={open} onClose={() => setOpen(false)} items={SSM_ITEMS} />
            </div>
        );
    }
};

export const OpenDesktop: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <div className="relative w-[1280px] h-[812px] overflow-hidden bg-surface-container-low">
                <button
                    className="m-4 px-4 py-2 bg-tertiary text-on-surface-dark rounded-full text-sm font-medium"
                    onClick={() => setOpen(true)}
                >
                    Open drawer
                </button>
                <NavDrawer isOpen={open} onClose={() => setOpen(false)} items={SSM_ITEMS} />
            </div>
        );
    }
};

export const Closed: Story = {
    args: {
        isOpen: false,
        onClose: () => {},
        items: SSM_ITEMS
    }
};
