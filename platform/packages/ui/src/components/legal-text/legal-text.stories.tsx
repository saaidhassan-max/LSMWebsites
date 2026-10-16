import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LegalText } from './legal-text';

const meta: Meta<typeof LegalText> = {
    title: 'Components/LegalText',
    component: LegalText,
    tags: ['autodocs'],
    decorators: [
        (Story): React.ReactElement => (
            <div className="bg-surface p-4 text-on-surface-light">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof LegalText>;

export const Default: Story = {
    args: {
        segments: [
            { text: 'For further information you can also visit GambleAware ' },
            { text: 'here', href: 'https://www.gambleaware.org/' },
            { text: '.' }
        ]
    }
};
