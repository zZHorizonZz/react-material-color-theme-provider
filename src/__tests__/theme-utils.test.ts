import { createMaterialTheme, getThemeTokens } from "../theme-utils";
import { Variant } from "../types";
import { argbFromHex } from "@material/material-color-utilities";

describe("createMaterialTheme", () => {
  it("creates a theme with default variant", () => {
    const sourceColor = argbFromHex("#006494");
    const theme = createMaterialTheme(sourceColor);

    expect(theme.source).toBe(sourceColor);
    expect(theme.variant).toBe(Variant.TONAL_SPOT);
    expect(theme.schemes.light).toBeDefined();
    expect(theme.schemes.dark).toBeDefined();
    expect(theme.customColors).toEqual([]);
  });

  it("creates a theme with custom variant", () => {
    const sourceColor = argbFromHex("#006494");
    const theme = createMaterialTheme(sourceColor, Variant.VIBRANT);

    expect(theme.variant).toBe(Variant.VIBRANT);
  });

  it("creates a theme with custom colors", () => {
    const sourceColor = argbFromHex("#006494");
    const customColors = [{ name: "custom-1", value: argbFromHex("#ff0000"), blend: true }];
    const theme = createMaterialTheme(sourceColor, Variant.TONAL_SPOT, 0, customColors);

    expect(theme.customColors).toHaveLength(1);
    expect(theme.customColors[0].color.name).toBe("custom-1");
  });
});

describe("getThemeTokens", () => {
  it("generates light theme tokens", () => {
    const sourceColor = argbFromHex("#006494");
    const theme = createMaterialTheme(sourceColor);
    const tokens = getThemeTokens(theme, false);

    expect(tokens.get("--md-sys-color-primary")).toBeDefined();
    expect(tokens.get("--md-sys-color-on-primary")).toBeDefined();
    expect(tokens.get("--md-sys-color-background")).toBeDefined();
  });

  it("generates dark theme tokens", () => {
    const sourceColor = argbFromHex("#006494");
    const theme = createMaterialTheme(sourceColor);
    const tokens = getThemeTokens(theme, true);

    expect(tokens.get("--md-sys-color-primary")).toBeDefined();
    expect(tokens.get("--md-sys-color-on-primary")).toBeDefined();
    expect(tokens.get("--md-sys-color-background")).toBeDefined();
  });
});
