import type { Meta, StoryObj } from '@storybook/react';
import { OperatorBanner } from './operator-banner';

const meta: Meta<typeof OperatorBanner> = {
    title: 'Components/OperatorBanner',
    component: OperatorBanner,
    parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof OperatorBanner>;

export const Default: Story = {
    args: {
        mobileSrc: '/sfb/brands/placeholder.png',
        desktopSrc: '/sfb/brands/placeholder.png',
        alt: 'Operator promotion',
        href: 'https://example.com',
    },
};
