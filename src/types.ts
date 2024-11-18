import type { ReactNode } from "react";
import type { CustomColorGroup, DynamicScheme } from "@material/material-color-utilities";

/**
 * Enumeration of available theme variants in Material Design 3.
 * Each variant provides a different approach to color scheme generation.
 *
 * @enum {number}
 */
export enum Variant {
  /** Grayscale color scheme. */
  MONOCHROME = 0,
  /** Color theme that is near grayscale. */
  NEUTRAL = 1,
  /** Color theme with low to medium colorfulness and a Tertiary TonalPalette with a hue related to the source color. */
  TONAL_SPOT = 2,
  /** Color theme that maxes out colorfulness at each position in the Primary Tonal Palette. */
  VIBRANT = 3,
  /** Color theme that is intentionally detached from the source color. */
  EXPRESSIVE = 4,
  /** A scheme that places the source color in Scheme. primaryContainer. */
  FIDELITY = 5,
  /** A scheme that places the source color in Scheme. primaryContainer. */
  CONTENT = 6,
  /** A playful theme - the source color's hue does not appear in the theme. */
  RAINBOW = 7,
  /** A playful theme - the source color's hue does not appear in the theme. */
  FRUIT_SALAD = 8,
}

/**
 * Interface describing the structure of a Material Design 3 theme.
 * Contains all necessary information to generate and apply a complete theme.
 *
 * @interface MaterialTheme
 * @property {number} source - Source color in ARGB format used as the base for theme generation
 * @property {Variant} variant - Theme variant used for color scheme generation
 * @property {Object} schemes - Light and dark color schemes
 * @property {DynamicScheme} schemes.light - Light mode color scheme
 * @property {DynamicScheme} schemes.dark - Dark mode color scheme
 * @property {CustomColorGroup[]} customColors - Array of custom color definitions with their variations
 */
export interface MaterialTheme {
  source: number;
  variant: Variant;
  schemes: {
    light: DynamicScheme;
    dark: DynamicScheme;
  };
  customColors: CustomColorGroup[];
}

/**
 * Interface for the Material Theme context value.
 * Provides access to theme data and controls for components.
 *
 * @interface MaterialThemeContextType
 * @property {MaterialTheme | null} materialTheme - Current Material theme configuration or null if not yet generated
 * @property {(color: string) => void} setSourceColor - Function to update the theme's source color
 * @property {DynamicScheme | null} currentScheme - Current color scheme based on light/dark mode preference
 */
export interface MaterialThemeContextType {
  materialTheme: MaterialTheme | null;
  setSourceColor: (color: string) => void;
  currentScheme: DynamicScheme | null;
}

/**
 * Props interface for the MaterialThemeProvider component.
 * Defines configuration options for theme generation and application.
 *
 * @interface MaterialThemeProviderProps
 * @property {ReactNode} children - Child components to be wrapped by the provider
 * @property {boolean} [isDark] - Whether to use dark mode color scheme
 * @property {Variant} [variant] - Theme variant to use for color scheme generation
 * @property {string} [defaultSourceColor] - Initial source color in hex format (e.g., "#6D509F")
 * @property {Array<{name: string, value: string, blend: boolean}>} [customColors] - Custom color definitions
 * @property {string} customColors[].name - Identifier for the custom color
 * @property {string} customColors[].value - Hex color value
 * @property {boolean} customColors[].blend - Whether to blend with the source color
 */
export interface MaterialThemeProviderProps {
  children: ReactNode;
  isDark?: boolean;
  variant?: Variant;
  defaultSourceColor?: string;
  customColors?: Array<{
    name: string;
    value: string;
    blend: boolean;
  }>;
}
