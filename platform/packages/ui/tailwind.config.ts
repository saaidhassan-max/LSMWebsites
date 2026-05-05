import type { Config } from 'tailwindcss';
const { colors } = require('@lsm/tokens');

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

export default config;
