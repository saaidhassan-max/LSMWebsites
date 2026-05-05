import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LogoSection } from './LogoSection';

const meta: Meta<typeof LogoSection> = {
  title: 'Components/LogoSection',
  component: LogoSection,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoSection>;

export const Default: Story = {};

export const WithMenuHandler: Story = {
  args: {
    onMenuClick: () => alert('Menu clicked'),
  },
};
