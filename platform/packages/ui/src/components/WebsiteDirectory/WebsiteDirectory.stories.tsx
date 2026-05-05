import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WebsiteDirectory } from './WebsiteDirectory';

const meta: Meta<typeof WebsiteDirectory> = {
  title: 'Components/WebsiteDirectory',
  component: WebsiteDirectory,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof WebsiteDirectory>;

const ssmSites = [
  { name: '888 Ladies' },
  { name: 'Buzz Bingo' },
  { name: 'Lucky Pants Bingo' },
  { name: 'Betfred' },
  { name: 'Fabulous Bingo' },
  { name: 'MrQ' },
  { name: 'Lottoland' },
  { name: 'Pink Casino' },
  { name: 'Dotty Bingo' },
  { name: 'William Hill' },
  { name: 'Ladbrokes' },
];

const withLinks = ssmSites.map((s) => ({ ...s, href: '#' }));

export const NoLinks: Story = {
  args: {
    title: 'SSM Casino Directory',
    sites: ssmSites,
  },
};

export const WithLinks: Story = {
  args: {
    title: 'SSM Casino Directory',
    sites: withLinks,
  },
};

export const FewSites: Story = {
  args: {
    title: 'Ontario Casino Directory',
    sites: [
      { name: 'Betway', href: '#' },
      { name: 'PokerStars', href: '#' },
      { name: 'bet365', href: '#' },
    ],
  },
};

export const ManySites: Story = {
  args: {
    title: 'Super Free Slots Directory',
    sites: Array.from({ length: 20 }, (_, i) => ({ name: `Casino Site ${i + 1}` })),
  },
};
