import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SfbFooter } from './sfb-footer';

const meta: Meta<typeof SfbFooter> = {
    title: 'Components/SfbFooter',
    component: SfbFooter,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'dark' },
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof SfbFooter>;

export const Default: Story = {};

export const WithLinks: Story = {
    args: {
        navLinks: [
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms and Conditions', href: '/terms' },
            { label: 'About Us', href: '/about' },
            { label: 'Disclaimer', href: '/disclaimer' },
            { label: 'Contact Us', href: '/contact' }
        ]
    }
};
