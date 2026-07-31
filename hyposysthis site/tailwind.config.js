/** @type {import('tailwindcss').Config} */
/*
 * Material 3 color roles — usage rules
 * Source: https://m3.material.io/styles/color/roles
 * Pairing rule: always place on<Role> content on top of <Role>.
 *   e.g. onPrimary on primary, onSurface on surface/containers, onPrimaryContainer on primaryContainer.
 *
 *   primary: Main brand color. High-emphasis fills: primary buttons, active states, key components, prominent icons.
 *   onPrimary: Text/icons placed ON primary. Always meets contrast against primary.
 *   primaryContainer: A tonal, less-emphasis standout fill. More emphasis than surface, less than primary (tonal buttons, highlighted cards).
 *   onPrimaryContainer: Text/icons ON primaryContainer.
 *   secondary: Less prominent accent. Filter chips, secondary actions, supporting UI.
 *   onSecondary: Text/icons ON secondary.
 *   secondaryContainer: Tonal fill for secondary-emphasis elements.
 *   onSecondaryContainer: Text/icons ON secondaryContainer.
 *   tertiary: Contrasting accent to balance primary/secondary. Expressive highlights.
 *   onTertiary: Text/icons ON tertiary.
 *   tertiaryContainer: Tonal fill for tertiary-emphasis elements.
 *   onTertiaryContainer: Text/icons ON tertiaryContainer.
 *   error: Error states: invalid input, destructive actions, error icons.
 *   onError: Text/icons ON error.
 *   errorContainer: Tonal fill for lower-emphasis error surfaces (error banners).
 *   onErrorContainer: Text/icons ON errorContainer.
 *   surface: The default background for screens and components.
 *   onSurface: Primary text and icons on any surface. Highest-emphasis body text.
 *   onSurfaceVariant: Lower-emphasis text/icons on surface (secondary text, inactive icons).
 *   surfaceContainerLowest: Lowest emphasis container. Recedes furthest.
 *   surfaceContainerLow: Low-emphasis container.
 *   surfaceContainer: Default container tint for cards, sheets, menus.
 *   surfaceContainerHigh: Higher-emphasis container. Comes forward.
 *   surfaceContainerHighest: Highest-emphasis container. Most prominent surface layer.
 *   surfaceDim: Dimmest surface, used in light theme for a dimmed backdrop.
 *   surfaceBright: Brightest surface, used in dark theme for a lifted backdrop.
 *   outline: Important boundaries: text field borders, dividers needing emphasis.
 *   outlineVariant: Decorative/low-emphasis boundaries: subtle dividers, card borders.
 *   inverseSurface: Surface that contrasts the current theme — snackbars, tooltips.
 *   inverseOnSurface: Text/icons ON inverseSurface.
 *   inversePrimary: Primary action color placed on inverseSurface (e.g. snackbar action).
 *   scrim: Semi-transparent overlay behind modals/sheets. Use with opacity.
 *   primaryFixed: Theme-invariant tonal fill — same value in light & dark. For elements that must not change with theme.
 *   primaryFixedDim: A dimmer variant of primaryFixed.
 *   onPrimaryFixed: High-emphasis text/icons on primaryFixed / primaryFixedDim.
 *   onPrimaryFixedVariant: Lower-emphasis text/icons on primaryFixed / primaryFixedDim.
 *
 * Tool-specific extension tokens:
 *   primaryText / secondaryText / tertiaryText: EXTENSION. The accent color adjusted to pass WCAG AA as FOREGROUND text/icon on a light/neutral surface. Use for text buttons, outlined-button labels, links, icons — NOT as a fill. Filled buttons keep the true brand color.
 *   inverseOnSurfaceVariant: EXTENSION. Lower-emphasis text on inverseSurface (mirrors onSurfaceVariant in the inverse zone).
 *   inverseSurfaceContainer / inverseOnSurfaceContainer: EXTENSION. An elevated container (and its text) inside the inverse zone — for persistent dark panels, not just brief snackbars.
 *   boldSurfaceContainer[Secondary|Tertiary]: EXTENSION. A muted elevated surface for use ON a *Fixed (T-90) bold background (the "bold zone") — build an elevated card on top of a vibrant brand-colored section.
 *   gradient* / onGradient*: EXTENSION. Token-derived gradients (tonal, hueShift, bold, vibrant, subtle) each with a matching on-color that passes contrast at the gradient worst point.
 *
 */
// M3 Vibrant Color System — generated
// Add [data-theme="dark"] class to <html> for dark mode
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Light theme (default)
        'primary': '#7BFF00',
        'on-primary': '#111111',
        'primary-container': '#9ffa72',
        'on-primary-container': '#111111',
        'primary-text': '#008b00',
        'secondary': '#000000',
        'on-secondary': '#ffffff',
        'secondary-container': '#dedede',
        'on-secondary-container': '#111111',
        'error': '#9d0000',
        'on-error': '#ffffff',
        'error-container': '#ff9991',
        'on-error-container': '#111111',
        'surface': '#ffffff',
        'surface-dim': '#ebebeb',
        'surface-bright': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f5f5',
        'surface-container': '#eeeeee',
        'surface-container-high': '#e8e8e8',
        'surface-container-highest': '#e1e1e1',
        'on-surface': '#020402',
        'on-surface-variant': '#283125',
        'outline': '#5d6759',
        'outline-variant': '#d5d5d5',
        'inverse-surface': '#141712',
        'inverse-on-surface': '#ebf0e9',
        'inverse-on-surface-variant': '#b7c2b2',
        'inverse-surface-container': '#2b2f29',
        'inverse-on-surface-container': '#dae0d8',
        'inverse-primary': '#18e700',
        'scrim': '#000000',
        // Fixed tokens
        'primary-fixed': '#0cff00',
        'primary-fixed-dim': '#18e700',
        'on-primary-fixed': '#111111',
        'on-primary-fixed-variant': '#111111',
        'secondary-fixed': '#dedede',
        'secondary-fixed-dim': '#bebebe',
        'on-secondary-fixed': '#111111',
        'on-secondary-fixed-variant': '#111111',
        'bold-surface-container': '#99ff54',
        'bold-surface-container-secondary': '#eeeeee',
      },
      backgroundImage: {
        'gradient-tonal': 'linear-gradient(135deg, #0cff00, #7bff02)',
        'gradient-hue-shift': 'linear-gradient(135deg, #7bff02, #000000)',
        'gradient-bold': 'linear-gradient(135deg, #0cff00, #dedede)',
        'gradient-vibrant': 'linear-gradient(135deg, #0cff00, #78deff)',
        'gradient-subtle': 'linear-gradient(135deg, #18e700, #0cff00)',
      },
    },
  },
};