import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GoodChoiceLogoSection } from './good-choice-logo-section';

const meta: Meta<typeof GoodChoiceLogoSection> = {
    title: 'Components/GoodChoiceLogoSection',
    component: GoodChoiceLogoSection,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-full">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof GoodChoiceLogoSection>;

export const Default: Story = {
    args: {
        logoHref: '/'
    }
};

export const Mobile: Story = {
    args: {
        logoHref: '/'
    },
    parameters: { viewport: { defaultViewport: 'mobile1' } }
};
