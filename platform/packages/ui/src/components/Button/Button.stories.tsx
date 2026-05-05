import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'text'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'PLAY NOW',
    trailingIcon: <ArrowIcon />,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'PLAY NOW',
    trailingIcon: <ArrowIcon />,
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'PLAY NOW',
    trailingIcon: <ArrowIcon />,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'PLAY NOW',
    trailingIcon: <ArrowIcon />,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'PLAY NOW',
    trailingIcon: <ArrowIcon />,
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" trailingIcon={<ArrowIcon />}>PLAY NOW</Button>
        <Button variant="secondary" trailingIcon={<ArrowIcon />}>PLAY NOW</Button>
        <Button variant="tertiary" trailingIcon={<ArrowIcon />}>PLAY NOW</Button>
        <Button variant="text" trailingIcon={<ArrowIcon />}>PLAY NOW</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" trailingIcon={<ArrowIcon />} disabled>PLAY NOW</Button>
        <Button variant="secondary" trailingIcon={<ArrowIcon />} disabled>PLAY NOW</Button>
        <Button variant="tertiary" trailingIcon={<ArrowIcon />} disabled>PLAY NOW</Button>
        <Button variant="text" trailingIcon={<ArrowIcon />} disabled>PLAY NOW</Button>
      </div>
    </div>
  ),
};
