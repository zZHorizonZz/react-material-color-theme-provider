"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { argbFromHex, type DynamicScheme } from "@material/material-color-utilities";
import { type MaterialTheme, type MaterialThemeContextType, type MaterialThemeProviderProps, Variant } from "./types";
import { createMaterialTheme, getThemeTokens } from "./theme-utils";

/**
 * Context for Material Theme providing access to theme data and controls.
 * @property {MaterialTheme | null} materialTheme - Current Material theme configuration
 * @property {Function} setSourceColor - Function to update the theme's source color
 * @property {DynamicScheme | null} currentScheme - Current color scheme based on light/dark mode
 */
const MaterialThemeContext = createContext<MaterialThemeContextType | undefined>(undefined);

/**
 * Provider component for Material Design 3 theming system.
 * Manages theme generation and CSS variable injection based on a source color.
 *
 * @component
 * @param {MaterialThemeProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped
 * @param {boolean} [props.isDark=false] - Whether to use dark mode
 * @param {Variant} [props.variant=Variant.FIDELITY] - Theme variant to use
 * @param {string} [props.defaultSourceColor="#6D509F"] - Initial source color in hex format
 * @param {Array<CustomColor>} [props.customColors=[]] - Array of custom color definitions
 *
 * @example
 * ```tsx
 * <MaterialThemeProvider defaultSourceColor="#6D509F" isDark={false}>
 *   <App />
 * </MaterialThemeProvider>
 * ```
 */
export function MaterialThemeProvider({
  children,
  isDark = false,
  variant = Variant.FIDELITY,
  defaultSourceColor = "#6D509F",
  customColors = [],
}: MaterialThemeProviderProps) {
  // State for managing theme and source color
  const [currentScheme, setCurrentScheme] = useState<DynamicScheme | null>(null);
  const [materialTheme, setMaterialTheme] = useState<MaterialTheme | null>(null);
  const [sourceColor, setSourceColor] = useState(defaultSourceColor);

  // Theme generation effect
  useEffect(() => {
    try {
      const argbColor = argbFromHex(sourceColor);
      /*const customColorsArgb = customColors.map((color) => ({
        ...color,
        value: argbFromHex(color.value),
      }));*/

      const theme = createMaterialTheme(argbColor, variant, 0.0);
      setMaterialTheme(theme);
    } catch (error) {
      console.error("Error generating material theme:", error);
    }
  }, [sourceColor, variant]);

  // Effect for setting the current color scheme based on theme and dark mode
  useEffect(() => {
    if (!materialTheme) return;

    // Update scheme
    const scheme = isDark ? materialTheme.schemes.dark : materialTheme.schemes.light;
    setCurrentScheme(scheme);

    // Apply tokens
    const tokens = getThemeTokens(materialTheme, isDark);
    tokens.forEach((value, key) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [materialTheme, isDark]);

  return (
    <MaterialThemeContext.Provider
      value={{
        materialTheme,
        setSourceColor,
        currentScheme,
      }}
    >
      {children}
    </MaterialThemeContext.Provider>
  );
}

/**
 * Hook for accessing Material theme context values and controls.
 * Must be used within a MaterialThemeProvider component.
 *
 * @returns {MaterialThemeContextType} Theme context value
 * @throws {Error} When used outside of MaterialThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { materialTheme, setSourceColor } = useMaterialTheme();
 *   // Use theme values and controls
 * }
 * ```
 */
export function useMaterialTheme() {
  const context = useContext(MaterialThemeContext);
  if (context === undefined) {
    throw new Error("useMaterialTheme must be used within a MaterialThemeProvider");
  }
  return context;
}
