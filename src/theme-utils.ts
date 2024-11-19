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

  return new Map<string, string>([
    ["--md-sys-color-background", hexFromArgb(scheme.background)],
    ["--md-sys-color-error", hexFromArgb(scheme.error)],
    ["--md-sys-color-error-container", hexFromArgb(scheme.errorContainer)],
    ["--md-sys-color-inverse-on-surface", hexFromArgb(scheme.inverseOnSurface)],
    ["--md-sys-color-inverse-primary", hexFromArgb(scheme.inversePrimary)],
    ["--md-sys-color-inverse-surface", hexFromArgb(scheme.inverseSurface)],
    ["--md-sys-color-on-background", hexFromArgb(scheme.onBackground)],
    ["--md-sys-color-on-error", hexFromArgb(scheme.onError)],
    ["--md-sys-color-on-error-container", hexFromArgb(scheme.onErrorContainer)],
    ["--md-sys-color-on-primary", hexFromArgb(scheme.onPrimary)],
    ["--md-sys-color-on-primary-container", hexFromArgb(scheme.onPrimaryContainer)],
    ["--md-sys-color-on-primary-fixed", hexFromArgb(scheme.onPrimaryFixed)],
    ["--md-sys-color-on-primary-fixed-variant", hexFromArgb(scheme.onPrimaryFixedVariant)],
    ["--md-sys-color-on-secondary", hexFromArgb(scheme.onSecondary)],
    ["--md-sys-color-on-secondary-container", hexFromArgb(scheme.onSecondaryContainer)],
    ["--md-sys-color-on-secondary-fixed", hexFromArgb(scheme.onSecondaryFixed)],
    ["--md-sys-color-on-secondary-fixed-variant", hexFromArgb(scheme.onSecondaryFixedVariant)],
    ["--md-sys-color-on-surface", hexFromArgb(scheme.onSurface)],
    ["--md-sys-color-on-surface-variant", hexFromArgb(scheme.onSurfaceVariant)],
    ["--md-sys-color-on-tertiary", hexFromArgb(scheme.onTertiary)],
    ["--md-sys-color-on-tertiary-container", hexFromArgb(scheme.onTertiaryContainer)],
    ["--md-sys-color-on-tertiary-fixed", hexFromArgb(scheme.onTertiaryFixed)],
    ["--md-sys-color-on-tertiary-fixed-variant", hexFromArgb(scheme.onTertiaryFixedVariant)],
    ["--md-sys-color-outline", hexFromArgb(scheme.outline)],
    ["--md-sys-color-outline-variant", hexFromArgb(scheme.outlineVariant)],
    ["--md-sys-color-primary", hexFromArgb(scheme.primary)],
    ["--md-sys-color-primary-container", hexFromArgb(scheme.primaryContainer)],
    ["--md-sys-color-primary-fixed", hexFromArgb(scheme.primaryFixed)],
    ["--md-sys-color-primary-fixed-dim", hexFromArgb(scheme.primaryFixedDim)],
    ["--md-sys-color-scrim", hexFromArgb(scheme.scrim)],
    ["--md-sys-color-secondary", hexFromArgb(scheme.secondary)],
    ["--md-sys-color-secondary-container", hexFromArgb(scheme.secondaryContainer)],
    ["--md-sys-color-secondary-fixed", hexFromArgb(scheme.secondaryFixed)],
    ["--md-sys-color-secondary-fixed-dim", hexFromArgb(scheme.secondaryFixedDim)],
    ["--md-sys-color-shadow", hexFromArgb(scheme.shadow)],
    ["--md-sys-color-surface", hexFromArgb(scheme.surface)],
    ["--md-sys-color-surface-bright", hexFromArgb(scheme.surfaceBright)],
    ["--md-sys-color-surface-container", hexFromArgb(scheme.surfaceContainer)],
    ["--md-sys-color-surface-container-high", hexFromArgb(scheme.surfaceContainerHigh)],
    ["--md-sys-color-surface-container-highest", hexFromArgb(scheme.surfaceContainerHighest)],
    ["--md-sys-color-surface-container-low", hexFromArgb(scheme.surfaceContainerLow)],
    ["--md-sys-color-surface-container-lowest", hexFromArgb(scheme.surfaceContainerLowest)],
    ["--md-sys-color-surface-dim", hexFromArgb(scheme.surfaceDim)],
    ["--md-sys-color-surface-tint", hexFromArgb(scheme.surfaceTint)], // Using primary tone
    ["--md-sys-color-surface-variant", hexFromArgb(scheme.surfaceVariant)],
    ["--md-sys-color-tertiary", hexFromArgb(scheme.tertiary)],
    ["--md-sys-color-tertiary-container", hexFromArgb(scheme.tertiaryContainer)],
    ["--md-sys-color-tertiary-fixed", hexFromArgb(scheme.tertiaryFixed)],
    ["--md-sys-color-tertiary-fixed-dim", hexFromArgb(scheme.tertiaryFixedDim)],
  ]);
};
