# Material Theme Provider

A React implementation of Material Design 3 (Material You) theming system. This provider enables dynamic color scheme
generation and theme management based on a source color, supporting both light and dark modes. This implementation
is using the [Material Color Utilities](https://www.npmjs.com/package/@material/material-color-utilities) package.

## Features

- Dynamic theme generation from a source color
- Support for light and dark modes
- Multiple theme variants (Monochrome, Neutral, Tonal Spot, etc.)
- Custom color definitions
- CSS variable-based theme injection
- Type-safe implementation

## Installation

```bash
npm install react-material-color-theme-provider
```

## Basic Usage

```tsx
import {MaterialThemeProvider} from 'react-material-theme';

function App() {
    return (
        <MaterialThemeProvider defaultSourceColor="#6D509F" isDark={false}>
            <YourApp/>
        </MaterialThemeProvider>
    );
}
```

## API Reference

### MaterialThemeProvider

#### Props

| Prop               | Type          | Default   | Description                        |
|--------------------|---------------|-----------|------------------------------------|
| children           | ReactNode     | Required  | Child components to be wrapped     |
| defaultSourceColor | string        | "#6D509F" | Initial source color in hex format |
| isDark             | boolean       | false     | Whether to use dark mode           |
| customColors       | CustomColor[] | []        | Array of custom color definitions  |

#### CustomColor Definition

```typescript
interface CustomColor {
    name: string;    // Identifier for the custom color
    value: string;   // Hex color value
    blend: boolean;  // Whether to blend with the source color
}
```

### Theme Variants

The system supports multiple theme variants through the `Variant` enum:

- `MONOCHROME`: A Dynamic Color theme that is
  grayscale. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_monochrome.ts)
- `NEUTRAL`: A Dynamic Color theme that is near
  grayscale. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_neutral.ts)
- `TONAL_SPOT`: A Dynamic Color theme with low to medium colorfulness and a Tertiary TonalPalette with a hue related to
  the source
  color. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_tonal_spot.ts)
- `VIBRANT`: A Dynamic Color theme that maxes out colorfulness at each position in the Primary Tonal
  Palette. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_vibrant.ts)
- `EXPRESSIVE`: A Dynamic Color theme that is intentionally detached from the source
  color. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_expressive.ts)
- `FIDELITY`:  A scheme that places the source color in
  `Scheme.primaryContainer`. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_fidelity.ts)
- `CONTENT`: A scheme that places the source color in
  `Scheme.primaryContainer`. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_content.ts)
- `RAINBOW`: A playful theme - the source color's hue does not appear in the
  theme. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_rainbow.ts)
- `FRUIT_SALAD`: A playful theme - the source color's hue does not appear in the
  theme. [Source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_fruit_salad.ts)

## CSS Variables

The theme provider generates and injects CSS variables following the Material Design 3 token system. Here are the key
variable categories:

### Primary Colors

- `--md-sys-color-primary`
- `--md-sys-color-on-primary`
- `--md-sys-color-primary-container`
- `--md-sys-color-on-primary-container`

### Secondary Colors

- `--md-sys-color-secondary`
- `--md-sys-color-on-secondary`
- `--md-sys-color-secondary-container`
- `--md-sys-color-on-secondary-container`

### Tertiary Colors

- `--md-sys-color-tertiary`
- `--md-sys-color-on-tertiary`
- `--md-sys-color-tertiary-container`
- `--md-sys-color-on-tertiary-container`

### Surface Colors

- `--md-sys-color-surface`
- `--md-sys-color-on-surface`
- `--md-sys-color-surface-variant`
- `--md-sys-color-on-surface-variant`

### Additional Variables

- Error colors
- Background colors
- Outline colors
- Surface container variants
- Fixed variant colors

## Hook Usage

```tsx
import {useMaterialTheme} from './material-theme-provider';

function MyComponent() {
    const {materialTheme, setSourceColor, currentScheme} = useMaterialTheme();

    // Change theme color dynamically
    const handleColorChange = (newColor: string) => {
        setSourceColor(newColor);
    };

    return (
        // Your component implementation
    );
}
```