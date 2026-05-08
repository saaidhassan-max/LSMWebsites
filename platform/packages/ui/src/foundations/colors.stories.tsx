import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface SwatchProps {
    name: string;
    cssVar: string;
    tailwindClass: string;
}

interface GroupProps {
    title: string;
    swatches: SwatchProps[];
}

const GROUPS: GroupProps[] = [
    {
        title: 'Primary',
        swatches: [
            { name: 'primary', cssVar: '--color-primary', tailwindClass: 'bg-primary' },
            { name: 'primary-hover', cssVar: '--color-primary-hover', tailwindClass: 'bg-primary-hover' },
            { name: 'primary-focused', cssVar: '--color-primary-focused', tailwindClass: 'bg-primary-focused' },
            { name: 'primary-text', cssVar: '--color-primary-text', tailwindClass: 'text-primary-text' },
            { name: 'on-primary', cssVar: '--color-on-primary', tailwindClass: 'text-on-primary' },
        ],
    },
    {
        title: 'Secondary',
        swatches: [
            { name: 'secondary', cssVar: '--color-secondary', tailwindClass: 'bg-secondary' },
            { name: 'secondary-hover', cssVar: '--color-secondary-hover', tailwindClass: 'bg-secondary-hover' },
            { name: 'secondary-focused', cssVar: '--color-secondary-focused', tailwindClass: 'bg-secondary-focused' },
        ],
    },
    {
        title: 'Tertiary',
        swatches: [
            { name: 'tertiary', cssVar: '--color-tertiary', tailwindClass: 'bg-tertiary' },
            { name: 'tertiary-hover', cssVar: '--color-tertiary-hover', tailwindClass: 'bg-tertiary-hover' },
            { name: 'tertiary-focused', cssVar: '--color-tertiary-focused', tailwindClass: 'bg-tertiary-focused' },
        ],
    },
    {
        title: 'Surface',
        swatches: [
            { name: 'surface', cssVar: '--color-surface', tailwindClass: 'bg-surface' },
            { name: 'surface-inverse', cssVar: '--color-surface-inverse', tailwindClass: 'bg-surface-inverse' },
            { name: 'surface-inverse-new', cssVar: '--color-surface-inverse-new', tailwindClass: 'bg-surface-inverse-new' },
            { name: 'surface-container-lowest', cssVar: '--color-surface-container-lowest', tailwindClass: 'bg-surface-container-lowest' },
            { name: 'surface-container-low', cssVar: '--color-surface-container-low', tailwindClass: 'bg-surface-container-low' },
            { name: 'surface-container', cssVar: '--color-surface-container', tailwindClass: 'bg-surface-container' },
            { name: 'surface-container-high', cssVar: '--color-surface-container-high', tailwindClass: 'bg-surface-container-high' },
            { name: 'surface-container-highest', cssVar: '--color-surface-container-highest', tailwindClass: 'bg-surface-container-highest' },
        ],
    },
    {
        title: 'On Surface',
        swatches: [
            { name: 'on-surface-light', cssVar: '--color-on-surface-light', tailwindClass: 'text-on-surface-light' },
            { name: 'on-surface-dark', cssVar: '--color-on-surface-dark', tailwindClass: 'text-on-surface-dark' },
        ],
    },
    {
        title: 'Outline',
        swatches: [
            { name: 'outline', cssVar: '--color-outline', tailwindClass: 'border-outline' },
            { name: 'outline-variant', cssVar: '--color-outline-variant', tailwindClass: 'border-outline-variant' },
        ],
    },
    {
        title: 'State',
        swatches: [
            { name: 'error', cssVar: '--color-error', tailwindClass: 'bg-error' },
            { name: 'disabled-content', cssVar: '--color-disabled-content', tailwindClass: 'text-disabled-content' },
            { name: 'disabled-container', cssVar: '--color-disabled-container', tailwindClass: 'bg-disabled-container' },
        ],
    },
];

function Swatch({ name, cssVar, tailwindClass }: SwatchProps): React.ReactElement {
    return (
        <div className="flex items-center gap-3">
            <div
                className="w-14 h-14 rounded-lg flex-shrink-0 border border-black/10"
                style={{ backgroundColor: `var(${cssVar})` }}
            />
            <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-bold text-on-surface-dark leading-tight">{name}</span>
                <code className="text-xs text-outline font-mono leading-tight truncate">{cssVar}</code>
                <code className="text-xs text-outline font-mono leading-tight truncate">{tailwindClass}</code>
            </div>
        </div>
    );
}

function Group({ title, swatches }: GroupProps): React.ReactElement {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-on-surface-dark border-b border-outline-variant pb-2">
                {title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {swatches.map((s) => (
                    <Swatch key={s.cssVar} {...s} />
                ))}
            </div>
        </div>
    );
}

const meta: Meta = {
    title: 'Foundations/Colors',
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj;

export const AllColors: Story = {
    render: () => (
        <div className="bg-surface-container-low min-h-screen p-8 flex flex-col gap-10">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-on-surface-dark">Color Tokens</h1>
                <p className="text-sm text-outline">
                    Switch theme using the paintbrush icon in the toolbar. All tokens update live.
                </p>
            </div>
            {GROUPS.map((g) => (
                <Group key={g.title} {...g} />
            ))}
        </div>
    ),
};
