import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    staticDirs: ['../public'],
    viteFinal: async (cfg: InlineConfig): Promise<InlineConfig> => ({
        ...cfg,
        esbuild: {
            ...cfg.esbuild,
            jsx: 'automatic',
        },
    }),
};

export default config;
