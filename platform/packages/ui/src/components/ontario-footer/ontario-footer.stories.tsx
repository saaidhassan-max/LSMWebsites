import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OntarioFooter } from './ontario-footer';

const meta: Meta<typeof OntarioFooter> = {
    title: 'Components/OntarioFooter',
    component: OntarioFooter,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-full" data-theme="ontario">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof OntarioFooter>;

export const Default: Story = {
    args: {}
};

export const Mobile: Story = {
    args: {},
    parameters: { viewport: { defaultViewport: 'mobile1' } }
};
