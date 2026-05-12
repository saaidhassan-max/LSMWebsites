import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HowToClaimSteps } from './how-to-claim-steps';

const meta: Meta<typeof HowToClaimSteps> = {
    title: 'Components/HowToClaimSteps',
    component: HowToClaimSteps,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof HowToClaimSteps>;

export const Default: Story = {
    args: {
        steps: [
            '1. Click here to go to Caesars Palace Online Casino!',
            '2. Select your state & sign up with code: SFBETSLAUNCH',
            '3. Get $10 bonus - no deposit needed',
            '4. Plus, get a 100% bonus match up to $1000!'
        ],
        termsText:
            '888casino T&C Apply, click for more details\n\n18+. UK new customers only; re-registrations excluded. Claim Free Spins [FS] (£0.10 each) within 48h; valid 3 days on selected games (excl. JP). FS wins converted to Bonus and must be wagered 10x within 90 days to withdraw. Max withdrawal £100. One per person. T&Cs apply. GambleAware.org. #ad',
        imageSrc: '/ssm/howtoclaim/landingpageimage.png',
        imageAlt: 'Big Bass Splash casino offer',
        ctaText: 'VISIT CASINO →',
        ctaHref: '#'
    }
};
