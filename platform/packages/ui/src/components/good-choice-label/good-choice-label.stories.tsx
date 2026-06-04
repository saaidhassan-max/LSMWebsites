import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GoodChoiceLabel } from './good-choice-label';

const meta: Meta<typeof GoodChoiceLabel> = {
    title: 'Components/GoodChoiceLabel',
    component: GoodChoiceLabel,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="max-w-sm">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof GoodChoiceLabel>;

export const Default: Story = {
    args: {}
};
