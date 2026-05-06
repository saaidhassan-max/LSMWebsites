/** Tailwind color config — maps token names to CSS variables.
 *  Import this in any tailwind.config.ts:
 *    import { colors } from '@lsm/tokens'
 */
const colors = {
  primary: {
    DEFAULT: 'var(--color-primary)',
    hover:   'var(--color-primary-hover)',
    focused: 'var(--color-primary-focused)',
  },
  'primary-text': 'var(--color-primary-text)',
  'on-primary': 'var(--color-on-primary)',

  secondary: {
    DEFAULT: 'var(--color-secondary)',
    hover:   'var(--color-secondary-hover)',
    focused: 'var(--color-secondary-focused)',
  },

  tertiary: {
    DEFAULT: 'var(--color-tertiary)',
    hover:   'var(--color-tertiary-hover)',
    focused: 'var(--color-tertiary-focused)',
  },

  surface: {
    DEFAULT:           'var(--color-surface)',
    inverse:           'var(--color-surface-inverse)',
    'inverse-new':     'var(--color-surface-inverse-new)',
    'container-lowest':'var(--color-surface-container-lowest)',
    'container-low':   'var(--color-surface-container-low)',
    container:         'var(--color-surface-container)',
    'container-high':  'var(--color-surface-container-high)',
    'container-highest':'var(--color-surface-container-highest)',
  },

  'on-surface': {
    light: 'var(--color-on-surface-light)',
    dark:  'var(--color-on-surface-dark)',
  },

  outline: {
    DEFAULT: 'var(--color-outline)',
    variant: 'var(--color-outline-variant)',
  },

  error: 'var(--color-error)',

  disabled: {
    content:   'var(--color-disabled-content)',
    container: 'var(--color-disabled-container)',
  },
};

module.exports = { colors };
