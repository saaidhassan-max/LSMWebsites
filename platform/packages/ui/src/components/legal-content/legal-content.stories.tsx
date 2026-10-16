import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LegalContent } from './legal-content';

const meta: Meta<typeof LegalContent> = {
    title: 'Components/LegalContent',
    component: LegalContent,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded'
    },
    decorators: [
        (Story): React.ReactElement => (
            <div className="bg-surface p-4">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof LegalContent>;

export const Default: Story = {
    args: {
        blocks: [
            { kind: 'heading', level: 3, segments: [{ text: '1 Introduction' }] },
            {
                kind: 'paragraph',
                segments: [{ text: 'We are committed to protecting your personal data.' }]
            },
            {
                kind: 'list',
                ordered: false,
                items: [[{ text: 'The right to be informed' }], [{ text: 'The right of access' }]]
            },
            {
                kind: 'paragraph',
                segments: [
                    { text: 'Contact our DPO at ' },
                    { text: 'dpo@littlestarmedia.com', href: 'mailto:dpo@littlestarmedia.com' }
                ]
            }
        ]
    }
};
