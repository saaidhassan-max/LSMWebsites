import type { Preview } from '@storybook/react';
import React from 'react';
import '@lsm/tokens/styles';
import '../src/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Site theme',
      defaultValue: 'ssm',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['ssm', 'ontario', 'slots', 'bingo', 'bets', 'sports'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals['theme'] || 'ssm';
      return (
        <div data-theme={theme} className="min-h-screen p-4">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
