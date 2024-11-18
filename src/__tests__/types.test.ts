import { Variant } from "../types";

describe("Variant enum", () => {
  it("contains all expected variants", () => {
    const expectedVariants = [
      "MONOCHROME",
      "NEUTRAL",
      "TONAL_SPOT",
      "VIBRANT",
      "EXPRESSIVE",
      "FIDELITY",
      "CONTENT",
      "RAINBOW",
      "FRUIT_SALAD",
    ];

    // Get only the string keys from the enum
    const enumKeys = Object.keys(Variant).filter((key) => Number.isNaN(Number(key)));

    expect(enumKeys).toEqual(expect.arrayContaining(expectedVariants));
    expect(enumKeys.length).toBe(expectedVariants.length);
  });

  // Additional test to verify enum values
  it("has correct numeric values", () => {
    expect(Variant.MONOCHROME).toBe(0);
    expect(Variant.NEUTRAL).toBe(1);
    expect(Variant.TONAL_SPOT).toBe(2);
    expect(Variant.VIBRANT).toBe(3);
    expect(Variant.EXPRESSIVE).toBe(4);
    expect(Variant.FIDELITY).toBe(5);
    expect(Variant.CONTENT).toBe(6);
    expect(Variant.RAINBOW).toBe(7);
    expect(Variant.FRUIT_SALAD).toBe(8);
  });
});
