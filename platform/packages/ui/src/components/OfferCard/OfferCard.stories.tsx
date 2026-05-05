import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OfferCard } from './OfferCard';

const meta: Meta<typeof OfferCard> = {
  title: 'Components/OfferCard',
  component: OfferCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof OfferCard>;

const TERMS = '18+. New customers only. Opt in required. 7 day free spin expiry. All free spins will be loaded on the first eligible game loaded. Eligibility restrictions apply. Further T&Cs apply. GambleAware.org.';

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    label: 'HOT DEAL',
    offerMain: '$100 Casino Bonus',
    details: ['No Deposit', 'No Wagering'],
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    termsText: TERMS,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[368px]">
        <Story />
      </div>
    ),
  ],
};

export const MobileWithLogo: Story = {
  args: {
    ...Mobile.args,
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
  },
  decorators: Mobile.decorators,
};

export const Desktop: Story = {
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'HOT DEAL',
    offerMain: '$100 Casino Bonus',
    details: ['No Deposit', 'No Wagering'],
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    termsText: TERMS,
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
  },
  decorators: [
    (Story) => (
      <div className="w-[1280px] p-6">
        <Story />
      </div>
    ),
  ],
};

export const CustomLabel: Story = {
  args: {
    ...Desktop.args,
    label: 'EXCLUSIVE',
  },
  decorators: Desktop.decorators,
};
