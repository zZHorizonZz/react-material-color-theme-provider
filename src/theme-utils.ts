import {
  customColor,
  type CustomColor,
  Hct,
  hexFromArgb,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from "@material/material-color-utilities";
import { type MaterialTheme, Variant } from "./types";

/**
 * Creates a Material Design 3 theme based on a source color and variant.
 *
 * @param {number} source - Source color in ARGB format
 * @param {Variant} variant - Theme variant to generate
 * @param {number} contrastLevel - Contrast adjustment level (-1.0 to 1.0)
 * @param {CustomColor[]} customColors - Array of custom color definitions
 * @returns {MaterialTheme} Generated Material theme configuration
 *
 * @example
 * ```ts
 * const theme = createMaterialTheme(
 *   argbFromHex("#6D509F"),
 *   Variant.TONAL_SPOT,
 *   0.0,
 *   [{ name: "brand", value: argbFromHex("#FF0000"), blend: true }]
 * );
 * ```
 */
export const createMaterialTheme = (
  source: number,
  variant: Variant = Variant.TONAL_SPOT,
  contrastLevel = 0.0,
  customColors: CustomColor[] = [],
): MaterialTheme => {
  // Initialize with default tonal spot schemes
  let lightScheme = new SchemeTonalSpot(Hct.fromInt(source), false, contrastLevel);
  let darkScheme = new SchemeTonalSpot(Hct.fromInt(source), true, contrastLevel);

  // Generate appropriate scheme based on variant
  switch (variant) {
    case Variant.MONOCHROME:
      lightScheme = new SchemeMonochrome(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeMonochrome(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.NEUTRAL:
      lightScheme = new SchemeNeutral(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeNeutral(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.TONAL_SPOT:
      lightScheme = new SchemeTonalSpot(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeTonalSpot(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.VIBRANT:
      lightScheme = new SchemeVibrant(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeVibrant(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.EXPRESSIVE:
      lightScheme = new SchemeExpressive(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeExpressive(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.FIDELITY:
      lightScheme = new SchemeFidelity(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeFidelity(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.CONTENT:
      lightScheme = new SchemeContent(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeContent(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.RAINBOW:
      lightScheme = new SchemeRainbow(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeRainbow(Hct.fromInt(source), true, contrastLevel);
      break;
    case Variant.FRUIT_SALAD:
      lightScheme = new SchemeFruitSalad(Hct.fromInt(source), false, contrastLevel);
      darkScheme = new SchemeFruitSalad(Hct.fromInt(source), true, contrastLevel);
      break;
  }

  return {
    source,
    variant,
    schemes: {
      light: lightScheme,
      dark: darkScheme,
    },
    customColors: customColors.map((c) => customColor(source, c)),
  };
};

/**
 * Generates a map of CSS custom properties based on the Material theme.
 * Includes all color tokens defined in Material Design 3.
 *
 * @param {MaterialTheme} theme - Material theme configuration
 * @param {boolean} isDark - Whether to use dark mode values
 * @returns {Map<string, string>} Map of CSS variable names to color values
 */
export const getThemeTokens = (theme: MaterialTheme, isDark: boolean): Map<string, string> => {
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

  // Extract color palettes from scheme
  const primary = scheme.primaryPalette;
  const secondary = scheme.secondaryPalette;
  const tertiary = scheme.tertiaryPalette;
  const neutral = scheme.neutralPalette;
  const neutralVariant = scheme.neutralVariantPalette;
  const error = scheme.errorPalette;

  // Source: https://github.com/QuncCccccc/flutter/blob/0366d4514ba53b1dda6f3eb187af9c8e79d16650/dev/tools/gen_defaults/data/color_light.json
  const lightColors = new Map<string, string>([
    ["--md-sys-color-background", hexFromArgb(neutral.tone(98))],
    ["--md-sys-color-error", hexFromArgb(error.tone(40))],
    ["--md-sys-color-error-container", hexFromArgb(error.tone(90))],
    ["--md-sys-color-inverse-on-surface", hexFromArgb(neutral.tone(95))],
    ["--md-sys-color-inverse-primary", hexFromArgb(primary.tone(80))],
    ["--md-sys-color-inverse-surface", hexFromArgb(neutral.tone(20))],
    ["--md-sys-color-on-background", hexFromArgb(neutral.tone(10))],
    ["--md-sys-color-on-error", hexFromArgb(error.tone(100))],
    ["--md-sys-color-on-error-container", hexFromArgb(error.tone(10))],
    ["--md-sys-color-on-primary", hexFromArgb(primary.tone(100))],
    ["--md-sys-color-on-primary-container", hexFromArgb(primary.tone(10))],
    ["--md-sys-color-on-primary-fixed", hexFromArgb(primary.tone(10))],
    ["--md-sys-color-on-primary-fixed-variant", hexFromArgb(primary.tone(30))],
    ["--md-sys-color-on-secondary", hexFromArgb(secondary.tone(100))],
    ["--md-sys-color-on-secondary-container", hexFromArgb(secondary.tone(10))],
    ["--md-sys-color-on-secondary-fixed", hexFromArgb(secondary.tone(10))],
    ["--md-sys-color-on-secondary-fixed-variant", hexFromArgb(secondary.tone(30))],
    ["--md-sys-color-on-surface", hexFromArgb(neutral.tone(10))],
    ["--md-sys-color-on-surface-variant", hexFromArgb(neutralVariant.tone(30))],
    ["--md-sys-color-on-tertiary", hexFromArgb(tertiary.tone(100))],
    ["--md-sys-color-on-tertiary-container", hexFromArgb(tertiary.tone(10))],
    ["--md-sys-color-on-tertiary-fixed", hexFromArgb(tertiary.tone(10))],
    ["--md-sys-color-on-tertiary-fixed-variant", hexFromArgb(tertiary.tone(30))],
    ["--md-sys-color-outline", hexFromArgb(neutralVariant.tone(50))],
    ["--md-sys-color-outline-variant", hexFromArgb(neutralVariant.tone(80))],
    ["--md-sys-color-primary", hexFromArgb(primary.tone(40))],
    ["--md-sys-color-primary-container", hexFromArgb(primary.tone(90))],
    ["--md-sys-color-primary-fixed", hexFromArgb(primary.tone(90))],
    ["--md-sys-color-primary-fixed-dim", hexFromArgb(primary.tone(80))],
    ["--md-sys-color-scrim", hexFromArgb(neutral.tone(0))],
    ["--md-sys-color-secondary", hexFromArgb(secondary.tone(40))],
    ["--md-sys-color-secondary-container", hexFromArgb(secondary.tone(90))],
    ["--md-sys-color-secondary-fixed", hexFromArgb(secondary.tone(90))],
    ["--md-sys-color-secondary-fixed-dim", hexFromArgb(secondary.tone(80))],
    ["--md-sys-color-shadow", hexFromArgb(neutral.tone(0))],
    ["--md-sys-color-surface", hexFromArgb(neutral.tone(98))],
    ["--md-sys-color-surface-bright", hexFromArgb(neutral.tone(98))],
    ["--md-sys-color-surface-container", hexFromArgb(neutral.tone(94))],
    ["--md-sys-color-surface-container-high", hexFromArgb(neutral.tone(92))],
    ["--md-sys-color-surface-container-highest", hexFromArgb(neutral.tone(90))],
    ["--md-sys-color-surface-container-low", hexFromArgb(neutral.tone(96))],
    ["--md-sys-color-surface-container-lowest", hexFromArgb(neutral.tone(100))],
    ["--md-sys-color-surface-dim", hexFromArgb(neutral.tone(87))],
    ["--md-sys-color-surface-tint", hexFromArgb(primary.tone(40))], // Using primary tone
    ["--md-sys-color-surface-variant", hexFromArgb(neutralVariant.tone(90))],
    ["--md-sys-color-tertiary", hexFromArgb(tertiary.tone(40))],
    ["--md-sys-color-tertiary-container", hexFromArgb(tertiary.tone(90))],
    ["--md-sys-color-tertiary-fixed", hexFromArgb(tertiary.tone(90))],
    ["--md-sys-color-tertiary-fixed-dim", hexFromArgb(tertiary.tone(80))],
  ]);

  // Source: https://github.com/QuncCccccc/flutter/blob/0366d4514ba53b1dda6f3eb187af9c8e79d16650/dev/tools/gen_defaults/data/color_dark.json
  const darkColors = new Map<string, string>([
    ["--md-sys-color-background", hexFromArgb(neutral.tone(6))],
    ["--md-sys-color-error", hexFromArgb(error.tone(80))],
    ["--md-sys-color-error-container", hexFromArgb(error.tone(30))],
    ["--md-sys-color-inverse-on-surface", hexFromArgb(neutral.tone(20))],
    ["--md-sys-color-inverse-primary", hexFromArgb(primary.tone(40))],
    ["--md-sys-color-inverse-surface", hexFromArgb(neutral.tone(90))],
    ["--md-sys-color-on-background", hexFromArgb(neutral.tone(90))],
    ["--md-sys-color-on-error", hexFromArgb(error.tone(20))],
    ["--md-sys-color-on-error-container", hexFromArgb(error.tone(90))],
    ["--md-sys-color-on-primary", hexFromArgb(primary.tone(20))],
    ["--md-sys-color-on-primary-container", hexFromArgb(primary.tone(90))],
    ["--md-sys-color-on-primary-fixed", hexFromArgb(primary.tone(10))],
    ["--md-sys-color-on-primary-fixed-variant", hexFromArgb(primary.tone(30))],
    ["--md-sys-color-on-secondary", hexFromArgb(secondary.tone(20))],
    ["--md-sys-color-on-secondary-container", hexFromArgb(secondary.tone(90))],
    ["--md-sys-color-on-secondary-fixed", hexFromArgb(secondary.tone(10))],
    ["--md-sys-color-on-secondary-fixed-variant", hexFromArgb(secondary.tone(30))],
    ["--md-sys-color-on-surface", hexFromArgb(neutral.tone(90))],
    ["--md-sys-color-on-surface-variant", hexFromArgb(neutralVariant.tone(80))],
    ["--md-sys-color-on-tertiary", hexFromArgb(tertiary.tone(20))],
    ["--md-sys-color-on-tertiary-container", hexFromArgb(tertiary.tone(90))],
    ["--md-sys-color-on-tertiary-fixed", hexFromArgb(tertiary.tone(10))],
    ["--md-sys-color-on-tertiary-fixed-variant", hexFromArgb(tertiary.tone(30))],
    ["--md-sys-color-outline", hexFromArgb(neutralVariant.tone(60))],
    ["--md-sys-color-outline-variant", hexFromArgb(neutralVariant.tone(30))],
    ["--md-sys-color-primary", hexFromArgb(primary.tone(80))],
    ["--md-sys-color-primary-container", hexFromArgb(primary.tone(30))],
    ["--md-sys-color-primary-fixed", hexFromArgb(primary.tone(90))],
    ["--md-sys-color-primary-fixed-dim", hexFromArgb(primary.tone(80))],
    ["--md-sys-color-scrim", hexFromArgb(neutral.tone(0))],
    ["--md-sys-color-secondary", hexFromArgb(secondary.tone(80))],
    ["--md-sys-color-secondary-container", hexFromArgb(secondary.tone(30))],
    ["--md-sys-color-secondary-fixed", hexFromArgb(secondary.tone(90))],
    ["--md-sys-color-secondary-fixed-dim", hexFromArgb(secondary.tone(80))],
    ["--md-sys-color-shadow", hexFromArgb(neutral.tone(0))],
    ["--md-sys-color-surface", hexFromArgb(neutral.tone(6))],
    ["--md-sys-color-surface-bright", hexFromArgb(neutral.tone(24))],
    ["--md-sys-color-surface-container", hexFromArgb(neutral.tone(12))],
    ["--md-sys-color-surface-container-high", hexFromArgb(neutral.tone(17))],
    ["--md-sys-color-surface-container-highest", hexFromArgb(neutral.tone(22))],
    ["--md-sys-color-surface-container-low", hexFromArgb(neutral.tone(10))],
    ["--md-sys-color-surface-container-lowest", hexFromArgb(neutral.tone(4))],
    ["--md-sys-color-surface-dim", hexFromArgb(neutral.tone(6))],
    ["--md-sys-color-surface-tint", hexFromArgb(primary.tone(80))], // Using primary tone
    ["--md-sys-color-surface-variant", hexFromArgb(neutralVariant.tone(30))],
    ["--md-sys-color-tertiary", hexFromArgb(tertiary.tone(80))],
    ["--md-sys-color-tertiary-container", hexFromArgb(tertiary.tone(30))],
    ["--md-sys-color-tertiary-fixed", hexFromArgb(tertiary.tone(90))],
    ["--md-sys-color-tertiary-fixed-dim", hexFromArgb(tertiary.tone(80))],
  ]);

  if (!isDark) {
    return lightColors;
  }
  return new Map([...lightColors.entries(), ...darkColors.entries()]);
};
