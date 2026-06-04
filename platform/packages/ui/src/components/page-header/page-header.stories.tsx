import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './page-header';

const meta: Meta<typeof PageHeader> = {
    title: 'Components/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-full">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const WithBadgesAndSubtitle: Story = {
    args: {
        titlePrefix: 'GOOD.',
        titleSuffix: 'DEPOSITS 🏦',
        subtitle: "Ontario's most trusted online casino — 750+ games, fast payouts, and real-world rewards through Caesars Rewards.",
        badges: [
            { text: '🔒 Secure & Trusted' },
            { text: '🏅 Ontario Licensed' }
        ]
    }
};

export const SubtitleOnly: Story = {
    args: {
        titlePrefix: 'GOOD.',
        titleSuffix: 'CHOICE',
        subtitle: 'Find the best casino offers in Ontario.'
    }
};

export const TitleOnly: Story = {
    args: {
        titlePrefix: 'GOOD.',
        titleSuffix: 'SLOTS 🎰'
    }
};

export const Mobile: Story = {
    args: {
        titlePrefix: 'GOOD.',
        titleSuffix: 'DEPOSITS 🏦',
        subtitle: "Ontario's most trusted online casino.",
        badges: [
            { text: '🔒 Secure & Trusted' },
            { text: '🏅 Ontario Licensed' }
        ]
    },
    parameters: { viewport: { defaultViewport: 'mobile1' } }
};
