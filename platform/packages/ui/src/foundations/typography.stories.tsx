import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface TypeSampleProps {
    label: string;
    size: string;
    weight: string;
    className: string;
    usedIn: string;
}

const SCALE: TypeSampleProps[] = [
    {
        label: 'Display',
        size: '57px',
        weight: 'Heavy 900',
        className: "font-['Futura_PT'] font-[900] text-[57px] leading-[57px] tracking-[-0.019em]",
        usedIn: 'WelcomeBanner desktop title',
    },
    {
        label: 'Headline L',
        size: '45px',
        weight: 'Bold 700',
        className: "font-['Futura_PT'] font-bold text-[45px] leading-[52px]",
        usedIn: 'About Us desktop title, How To Claim desktop headline',
    },
    {
        label: 'Headline M',
        size: '36px',
        weight: 'Bold 700',
        className: "font-['Futura_PT'] font-bold text-[36px] leading-tight",
        usedIn: 'How To Claim mobile headline',
    },
    {
        label: 'Headline S',
        size: '32px',
        weight: 'Bold 700',
        className: 'font-bold text-[32px] leading-tight',
        usedIn: 'About Us mobile title',
    },
    {
        label: 'Title L',
        size: '24px',
        weight: 'Heavy 900',
        className: "font-['Futura_PT'] font-[900] text-[24px] leading-7 tracking-[-0.019em]",
        usedIn: 'WelcomeBanner features desktop, USP desktop',
    },
    {
        label: 'Title M',
        size: '22px',
        weight: 'Medium 500',
        className: 'font-medium text-[22px] leading-7',
        usedIn: 'NavCapsule desktop',
    },
    {
        label: 'Body L',
        size: '16px',
        weight: 'Regular 400',
        className: 'text-base leading-6',
        usedIn: 'Body text, How To Claim steps desktop',
    },
    {
        label: 'Body M',
        size: '14px',
        weight: 'Regular 400',
        className: 'text-sm leading-5',
        usedIn: 'NavCapsule mobile, OfferCard steps, USP mobile',
    },
    {
        label: 'Caption L',
        size: '12px',
        weight: 'Regular 400',
        className: 'text-xs leading-4',
        usedIn: 'TopTCs desktop, legal text desktop',
    },
    {
        label: 'Caption S',
        size: '11px',
        weight: 'Regular 400',
        className: 'text-[11px] leading-[13px]',
        usedIn: 'TopTCs mobile, legal text mobile',
    },
];

const WEIGHTS = [
    { label: 'Heavy', className: "font-['Futura_PT'] font-[900]", value: '900' },
    { label: 'Bold', className: 'font-bold', value: '700' },
    { label: 'Medium', className: 'font-medium', value: '500' },
    { label: 'Regular', className: 'font-normal', value: '400' },
];

function TypeSample({ label, size, weight, className, usedIn }: TypeSampleProps): React.ReactElement {
    return (
        <div className="flex flex-col gap-1 py-4 border-b border-outline-variant last:border-0">
            <p className={`${className} text-on-surface-dark`}>
                The quick brown fox jumps
            </p>
            <div className="flex gap-6 mt-1">
                <span className="text-xs text-outline font-mono">{label}</span>
                <span className="text-xs text-outline font-mono">{size}</span>
                <span className="text-xs text-outline font-mono">{weight}</span>
                <span className="text-xs text-outline italic">{usedIn}</span>
            </div>
        </div>
    );
}

const meta: Meta = {
    title: 'Foundations/Typography',
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj;

export const TypeScale: Story = {
    render: () => (
        <div className="bg-surface-container-low min-h-screen p-8 flex flex-col gap-10">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-on-surface-dark">Typography</h1>
                <p className="text-sm text-outline">
                    Display styles use Futura PT. All other styles use the system font stack.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold text-on-surface-dark border-b border-outline-variant pb-2">
                    Type Scale
                </h2>
                {SCALE.map((s) => (
                    <TypeSample key={s.label} {...s} />
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-base font-bold text-on-surface-dark border-b border-outline-variant pb-2">
                    Font Weights
                </h2>
                <div className="flex flex-col gap-3">
                    {WEIGHTS.map((w) => (
                        <div key={w.value} className="flex items-baseline gap-6">
                            <p className={`${w.className} text-[24px] text-on-surface-dark w-64`}>
                                Aa Bb Cc 123
                            </p>
                            <code className="text-xs text-outline font-mono">{w.label} — {w.value}</code>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
};
