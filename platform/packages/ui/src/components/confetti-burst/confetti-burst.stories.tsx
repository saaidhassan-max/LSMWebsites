import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfettiBurst } from './confetti-burst';

const meta: Meta<typeof ConfettiBurst> = {
    title: 'Components/ConfettiBurst',
    component: ConfettiBurst,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'dark' },
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof ConfettiBurst>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div className="relative h-[600px] w-full bg-surface">
                <Story />
            </div>
        )
    ]
};

export const Dense: Story = {
    args: {
        pieceCount: 96
    },
    decorators: [
        (Story) => (
            <div className="relative h-[600px] w-full bg-surface">
                <Story />
            </div>
        )
    ]
};
