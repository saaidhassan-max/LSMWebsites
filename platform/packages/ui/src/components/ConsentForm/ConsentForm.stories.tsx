import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentForm } from './ConsentForm';
import type { ConsentFormData } from './ConsentForm';

const meta: Meta<typeof ConsentForm> = {
  title: 'Components/ConsentForm',
  component: ConsentForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 max-w-sm bg-surface" data-theme="ssm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ConsentForm>;

export const Default: Story = {};

export const WithChangeCallback: Story = {
  render: () => {
    const [data, setData] = useState<ConsentFormData | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <ConsentForm onChange={setData} />
        {data && (
          <div className="text-xs text-on-surface-dark bg-surface-container p-3 rounded-lg">
            <p className="font-medium mb-1">Form state:</p>
            <p>Valid: {data.isValid ? 'Yes' : 'No'}</p>
            <p>Interests: {Object.entries(data.interests).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'}</p>
            <p>Contact: {Object.entries(data.contactMethods).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'}</p>
          </div>
        )}
      </div>
    );
  },
};
