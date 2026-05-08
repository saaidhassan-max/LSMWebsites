import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Mail, User, Lock } from 'lucide-react';
import { TextField } from './text-field';

const meta: Meta<typeof TextField> = {
    title: 'Components/TextField',
    component: TextField,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="p-6 max-w-sm">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Enabled: Story = {
    args: {
        label: 'Email',
        icon: Mail,
        placeholder: 'Enter your email'
    }
};

export const Hover: Story = {
    args: {
        label: 'Email',
        icon: Mail,
        placeholder: 'Enter your email'
    }
};

export const WithValue: Story = {
    render: () => {
        const [value, setValue] = useState('hello@example.com');
        return (
            <TextField
                label="Email"
                icon={Mail}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClear={() => setValue('')}
            />
        );
    }
};

export const Error: Story = {
    args: {
        label: 'Email',
        icon: Mail,
        value: 'youremail!gmail.com',
        error: 'Please enter a valid email address'
    }
};

export const WithUsernameIcon: Story = {
    args: {
        label: 'Username',
        icon: User,
        placeholder: 'Enter your username'
    }
};

export const WithPasswordIcon: Story = {
    args: {
        label: 'Password',
        icon: Lock,
        placeholder: 'Enter your password',
        type: 'password'
    }
};

export const AllStates: Story = {
    render: () => {
        const [value, setValue] = useState('typing@example.com');
        return (
            <div className="flex flex-col gap-6">
                <TextField label="Email" icon={Mail} placeholder="Enabled" />
                <TextField
                    label="Email"
                    icon={Mail}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClear={() => setValue('')}
                />
                <TextField
                    label="Email"
                    icon={Mail}
                    value="youremail!gmail.com"
                    error="Please enter a valid email address"
                />
                <TextField label="Username" icon={User} placeholder="With different icon" />
            </div>
        );
    }
};
