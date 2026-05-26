import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface SpacingRowProps {
    scale: string;
    px: number;
    usedIn: string;
}

const SCALE: SpacingRowProps[] = [
    { scale: '1',  px: 4,  usedIn: 'TopTCs py-1 (mobile)' },
    { scale: '2',  px: 8,  usedIn: 'TopTCs py-2 (desktop), NavDrawer gap-2, label px' },
    { scale: '3',  px: 12, usedIn: 'NavCapsule gap-3, Checkbox gap-3' },
    { scale: '4',  px: 16, usedIn: 'px-4 padding (mobile sections), py-4 nav rows, gap-4 offer cards' },
    { scale: '5',  px: 20, usedIn: 'Checkbox touch target offset' },
    { scale: '6',  px: 24, usedIn: 'px-6 pill padding, py-6 WelcomeBanner desktop, gap-6 components' },
    { scale: '8',  px: 32, usedIn: 'py-8 About Us mobile, gap-8 desktop layouts' },
    { scale: '10', px: 40, usedIn: 'LogoSection height (mobile), NavCapsule mobile height' },
    { scale: '11', px: 44, usedIn: 'Mobile nav row height, logo mobile size' },
    { scale: '12', px: 48, usedIn: 'py-12 About Us desktop, SsmFooter mobile row height' },
    { scale: '14', px: 56, usedIn: 'Color swatch size in foundations' },
    { scale: '16', px: 64, usedIn: 'px-16 desktop constrained sections, LogoSection desktop height (72px approx)' },
];

function SpacingRow({ scale, px, usedIn }: SpacingRowProps): React.ReactElement {
    return (
        <div className="flex items-center gap-4 py-3 border-b border-outline-variant last:border-0">
            <div
                className="bg-primary flex-shrink-0 h-5 rounded"
                style={{ width: `${px}px` }}
            />
            <div className="flex gap-6 min-w-0">
                <code className="text-sm font-mono text-on-surface-dark w-10 flex-shrink-0">{scale}</code>
                <code className="text-sm font-mono text-outline w-14 flex-shrink-0">{px}px</code>
                <span className="text-xs text-outline italic truncate">{usedIn}</span>
            </div>
        </div>
    );
}

const meta: Meta = {
    title: 'Foundations/Spacing',
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj;

export const SpacingScale: Story = {
    render: () => (
        <div className="bg-surface-container-low min-h-screen p-8 flex flex-col gap-10">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-on-surface-dark">Spacing</h1>
                <p className="text-sm text-outline">
                    Tailwind 4 built-in scale — 1 unit = 4px. No custom tokens needed. Use Tailwind utilities directly.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold text-on-surface-dark border-b border-outline-variant pb-2">
                    Values used in this project
                </h2>
                {SCALE.map((s) => (
                    <SpacingRow key={s.scale} {...s} />
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-base font-bold text-on-surface-dark border-b border-outline-variant pb-2">
                    How to use
                </h2>
                <div className="flex flex-col gap-3">
                    {[
                        { label: 'Padding', example: 'p-4, px-6, py-2' },
                        { label: 'Margin', example: 'mx-auto, mt-4, mb-2' },
                        { label: 'Gap', example: 'gap-2, gap-4, gap-6' },
                        { label: 'Width / Height', example: 'w-10, h-12, w-full' },
                    ].map((row) => (
                        <div key={row.label} className="flex items-baseline gap-6">
                            <span className="text-sm text-on-surface-dark w-24 flex-shrink-0">{row.label}</span>
                            <code className="text-xs text-outline font-mono">{row.example}</code>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
};
