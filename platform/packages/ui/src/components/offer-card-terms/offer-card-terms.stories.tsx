import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OfferCardTerms } from './offer-card-terms';

const meta: Meta<typeof OfferCardTerms> = {
    title: 'Components/OfferCardTerms',
    component: OfferCardTerms,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded'
    }
};

export default meta;
type Story = StoryObj<typeof OfferCardTerms>;

export const Default: Story = {
    args: {
        text: '18+. Play Safe. Online only. For new UK registered players. Runs this month. Register with code V26 and opt in via the promo page to receive a £20 bonus for use on the promotion game. Bonus valid for 72h and subject to x10 wagering. Ts&Cs apply. GambleAware.org'
    },
    decorators: [
        (Story): React.ReactElement => (
            <div className="max-w-[368px] bg-white">
                <Story />
            </div>
        )
    ]
};
