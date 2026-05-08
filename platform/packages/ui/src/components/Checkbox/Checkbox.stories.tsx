import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="p-6 max-w-sm bg-surface" data-theme="ssm">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unselected: Story = {
    args: {
        checked: false,
        label: 'Casino (inc. Slots)',
        onChange: () => {}
    }
};

export const Selected: Story = {
    args: {
        checked: true,
        label: 'Casino (inc. Slots)',
        onChange: () => {}
    }
};

export const Indeterminate: Story = {
    args: {
        checked: false,
        indeterminate: true,
        label: 'Keep me informed',
        onChange: () => {}
    }
};

export const Error: Story = {
    args: {
        checked: false,
        error: true,
        label: 'Bingo',
        onChange: () => {}
    }
};

export const AllStates: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <div className="flex flex-col gap-2">
                <Checkbox checked={false} label="Unselected" onChange={() => {}} />
                <Checkbox checked={true} label="Selected" onChange={() => {}} />
                <Checkbox checked={false} indeterminate label="Indeterminate" onChange={() => {}} />
                <Checkbox checked={false} error label="Error state" onChange={() => {}} />
                <Checkbox checked={checked} label="Interactive" onChange={setChecked} />
            </div>
        );
    }
};
