import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopTCs } from './top-tcs';

const meta: Meta<typeof TopTCs> = {
    title: 'Components/TopTCs',
    component: TopTCs,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'dark' },
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof TopTCs>;

export const Default: Story = {
    args: {
        text: 'Særlige vilkår er gældende – herunder identificering med MitID. Klikke på "Læs mere" for detaljer.'
    }
};
