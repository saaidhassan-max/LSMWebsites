import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button/button';
import { Label } from '../components/label/label';
import { ctaColors } from '../lib/generic/cta-color';

const meta: Meta = {
    title: 'Foundations/CTA Colors',
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj;

const Row = ({ surface }: { surface: 'light' | 'dark' }): React.ReactElement => (
    <div className={surface === 'dark' ? 'bg-surface p-6' : 'bg-white p-6'}>
        <p
            className={
                'mb-4 text-sm font-bold ' +
                (surface === 'dark' ? 'text-on-surface-light' : 'text-on-surface-dark')
            }
        >
            {surface === 'dark' ? 'Dark surface' : 'Light surface'} — hover and press each button
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {ctaColors.map((color) => (
                <div key={color} className="flex flex-col gap-2">
                    <Label variant="mobile" ctaColor={color} className="w-full h-6 rounded-lg">
                        {color.toUpperCase()}
                    </Label>
                    <Button ctaColor={color} size="small" className="w-full min-w-0!">
                        Click To Claim
                    </Button>
                </div>
            ))}
        </div>
    </div>
);

export const StateLayers: Story = {
    render: (): React.ReactElement => (
        <div className="flex flex-col">
            <Row surface="dark" />
            <Row surface="light" />
        </div>
    )
};
