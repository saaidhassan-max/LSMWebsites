import type { Meta, StoryObj } from '@storybook/react';
import { OperatorReview } from './operator-review';

const meta: Meta<typeof OperatorReview> = {
    title: 'Components/OperatorReview',
    component: OperatorReview,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof OperatorReview>;

export const Default: Story = {
    args: {
        operatorName: 'Caesars Palace Online Casino',
        trustBadges: ['🔒 Secure & Trusted', '🏅 Ontario Licensed'],
        features: [
            'Fast Payouts',
            'Video slots, live dealer games & tournaments',
            'Tiered reward program with real-world perks',
            'Exclusive Table Games',
        ],
        ctaText: 'VISIT CASINO ➜',
        ctaHref: '#',
    },
};
