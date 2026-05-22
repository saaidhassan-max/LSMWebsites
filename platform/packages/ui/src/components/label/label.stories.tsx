import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
    title: 'Components/Label',
    component: Label,
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
type Story = StoryObj<typeof Label>;

export const HotDealBlue: Story = {
    args: { children: 'HOT DEAL', color: 'blue' }
};

export const HotDealRed: Story = {
    args: { children: 'HOT DEAL', color: 'red' }
};

export const HotDealOrange: Story = {
    args: { children: 'HOT DEAL', color: 'orange' }
};

export const Exclusive: Story = {
    args: { children: 'EXCLUSIVE' }
};

export const NewOffer: Story = {
    args: { children: 'NEW OFFER' }
};
