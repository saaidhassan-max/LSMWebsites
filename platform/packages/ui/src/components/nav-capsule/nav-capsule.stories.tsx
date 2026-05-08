import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavCapsule } from './nav-capsule';

const meta: Meta<typeof NavCapsule> = {
    title: 'Components/NavCapsule',
    component: NavCapsule,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="p-6 bg-surface flex flex-col gap-3">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof NavCapsule>;

export const Default: Story = {
    args: {
        emoji: '🎁',
        label: 'Free Casino Offers',
        href: '/casino-offers',
        isActive: false
    }
};

export const Active: Story = {
    args: {
        emoji: '🎁',
        label: 'Free Casino Offers',
        href: '/casino-offers',
        isActive: true
    }
};

export const AllStates: Story = {
    render: () => (
        <div className="flex flex-col gap-3 bg-surface p-6">
            <NavCapsule emoji="🎁" label="Free Casino Offers" href="/casino-offers" />
            <NavCapsule emoji="🎰" label="Slot Games" href="/slots" isActive />
            <NavCapsule emoji="⭐" label="Top Rated Casinos" href="/top-rated" />
            <NavCapsule emoji="🏆" label="Casino Reviews" href="/reviews" />
        </div>
    )
};
