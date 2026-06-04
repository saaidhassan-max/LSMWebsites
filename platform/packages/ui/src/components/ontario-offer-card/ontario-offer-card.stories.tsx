import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OntarioOfferCard } from './ontario-offer-card';

const meta: Meta<typeof OntarioOfferCard> = {
    title: 'Components/OntarioOfferCard',
    component: OntarioOfferCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="p-6 max-w-[1280px]">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof OntarioOfferCard>;

const defaultUsps = [
    'Fast Payouts',
    'Video slots, live dealer games & tournaments',
    'Tiered reward program with real-world perks',
    'Exclusive Table Games'
];

const disclaimer =
    '19+ only. Please play responsibly. Gambling problem? Call 1-866-531-2600 or visit Connex Ontario. T&Cs apply.';

export const PrimaryMobile: Story = {
    args: {
        variant: 'primary',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: defaultUsps,
        ctaHref: '#',
        learnMoreHref: '#',
        disclaimerText: disclaimer
    },
    parameters: { viewport: { defaultViewport: 'mobile1' } }
};

export const SecondaryMobile: Story = {
    args: {
        variant: 'secondary',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: defaultUsps,
        ctaHref: '#',
        learnMoreHref: '#',
        disclaimerText: disclaimer
    },
    parameters: { viewport: { defaultViewport: 'mobile1' } }
};

export const PrimaryDesktop: Story = {
    args: {
        variant: 'primary',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: defaultUsps,
        ctaHref: '#',
        learnMoreHref: '#',
        disclaimerText: disclaimer
    }
};

export const SecondaryDesktop: Story = {
    args: {
        variant: 'secondary',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: defaultUsps,
        ctaHref: '#',
        learnMoreHref: '#',
        disclaimerText: disclaimer
    }
};
