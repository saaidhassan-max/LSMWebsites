import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeBanner } from './WelcomeBanner';

const meta: Meta<typeof WelcomeBanner> = {
  title: 'Components/WelcomeBanner',
  component: WelcomeBanner,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeBanner>;

export const Mobile: Story = {
  args: {
    text: '🎰 Velkommen til\nSuper Spillemaskiner!',
  },
};

export const Desktop: Story = {
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'desktop' } },
  args: {
    text: '🎰 Velkommen til Super Spillemaskiner!',
    features: [
      '✅ Danske licenserede casinoer',
      '✅ Klare betingelser',
      '✅ Sikker og Pålidelig',
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-[1280px]">
        <Story />
      </div>
    ),
  ],
};
