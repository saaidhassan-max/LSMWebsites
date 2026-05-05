import type { Config } from 'tailwindcss';
const { colors } = require('@lsm/tokens');

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

export default config;
