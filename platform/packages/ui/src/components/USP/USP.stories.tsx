import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { USP } from './USP';

const meta: Meta<typeof USP> = {
  title: 'Components/USP',
  component: USP,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof USP>;

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    text: 'OVER 5,000,000 SUBSCRIBERS',
  },
};

export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: 'desktop' } },
  args: {
    text: 'OVER 5,000,000 SUBSCRIBERS',
  },
  decorators: [
    (Story) => (
      <div className="w-[1280px]">
        <Story />
      </div>
    ),
  ],
};
