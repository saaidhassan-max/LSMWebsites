import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button/button';
import { Label } from '../components/label/label';
import { ctaColors, ctaTextClass } from '../lib/generic/cta-color';

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

const Steps = (): React.ReactElement => (
    <div className="bg-surface p-6">
        <p className="mb-4 text-sm font-bold text-on-surface-light">
            Rest / hover 8% / pressed 12% — the same mix, shown without needing to interact
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {ctaColors.map((color) => (
                <div key={color} className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase text-on-surface-light">
                        {color}
                    </span>
                    <div className="flex overflow-hidden rounded-lg">
                        {[
                            { label: 'Rest', mix: '100%' },
                            { label: 'Hover', mix: '92%' },
                            { label: 'Press', mix: '88%' }
                        ].map((step) => (
                            <div
                                key={step.label}
                                className="flex h-12 flex-1 items-center justify-center text-[11px] font-bold"
                                style={{
                                    backgroundColor: `color-mix(in srgb, var(--color-cta-${color}) ${step.mix}, ${ctaTextClass(color) === 'text-on-surface-dark' ? 'var(--color-on-surface-light)' : 'var(--color-on-surface-dark)'})`,
                                    color:
                                        ctaTextClass(color) === 'text-on-surface-dark'
                                            ? 'var(--color-on-surface-dark)'
                                            : 'var(--color-on-surface-light)'
                                }}
                            >
                                {step.label}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const Steps_: Story = {
    name: 'State steps',
    render: (): React.ReactElement => <Steps />
};

export const StateLayers: Story = {
    render: (): React.ReactElement => (
        <div className="flex flex-col">
            <Row surface="dark" />
            <Row surface="light" />
        </div>
    )
};
