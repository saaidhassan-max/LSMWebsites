import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SignupForm } from './SignupForm';

const meta: Meta<typeof SignupForm> = {
  title: 'Components/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {
  args: {
    brandName: 'Good.Choice.',
    privacyPolicyUrl: '#',
    termsUrl: '#',
  },
};

export const WithSubmitHandler: Story = {
  args: {
    brandName: 'Good.Choice.',
    onSubmit: (data) => alert(JSON.stringify(data, null, 2)),
  },
};

export const CustomBrand: Story = {
  args: {
    brandName: 'SuperSpillemaskiner',
    privacyPolicyUrl: '#',
    termsUrl: '#',
  },
};
