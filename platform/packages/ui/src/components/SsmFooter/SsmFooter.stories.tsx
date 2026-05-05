import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SsmFooter } from './SsmFooter';

const meta: Meta<typeof SsmFooter> = {
  title: 'Components/SsmFooter',
  component: SsmFooter,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SsmFooter>;

export const Default: Story = {};

export const WithLinks: Story = {
  args: {
    navLinks: [
      { label: 'Privatlivspolitik', href: '#' },
      { label: 'Regler og vilkår', href: '#' },
      { label: 'Om Os', href: '#' },
      { label: 'Kontakt Os', href: '#' },
    ],
  },
};
