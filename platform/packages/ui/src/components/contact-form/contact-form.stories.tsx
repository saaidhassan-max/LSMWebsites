import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './contact-form';

const meta: Meta<typeof ContactForm> = {
    title: 'Components/ContactForm',
    component: ContactForm,
    tags: ['autodocs'],
    decorators: [
        (Story): React.ReactElement => (
            <div className="max-w-[624px] bg-surface p-4">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {};
