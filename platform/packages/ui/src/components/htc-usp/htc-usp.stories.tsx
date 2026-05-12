import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HtcUsp } from './htc-usp';

const meta: Meta<typeof HtcUsp> = {
    title: 'Components/HtcUsp',
    component: HtcUsp,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof HtcUsp>;

const DEFAULT_ARGS = {
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
    headline: '200 FREE SPINS',
    badges: ['No Wagering', 'No Deposit']
};

export const Mobile: Story = {
    parameters: { viewport: { defaultViewport: 'mobile1' } },
    args: DEFAULT_ARGS
};

export const Desktop: Story = {
    args: DEFAULT_ARGS
};

export const SingleBadge: Story = {
    args: {
        ...DEFAULT_ARGS,
        badges: ['No Wagering']
    }
};

export const ManyBadges: Story = {
    args: {
        ...DEFAULT_ARGS,
        badges: ['No Wagering', 'No Deposit', 'Free Spins']
    }
};
