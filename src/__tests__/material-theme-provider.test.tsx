import { describe, expect, it, beforeEach, afterEach, jest } from "@jest/globals";
import React from "react";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { MaterialThemeProvider, useMaterialTheme } from "../material-theme-provider";

// Mock component to test the hook
const TestComponent = () => {
  const { materialTheme, setSourceColor } = useMaterialTheme();
  return (
    <div>
      <div data-testid="source-color">{materialTheme?.source.toString()}</div>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => setSourceColor("#ff0000")} data-testid="change-color">
        Change Color
      </button>
    </div>
  );
};

describe("MaterialThemeProvider", () => {
  beforeEach(() => {
    document.documentElement.style.cssText = "";
  });

  afterEach(() => {
    cleanup();
  });

  it("provides theme context to children", () => {
    render(
      <MaterialThemeProvider defaultSourceColor="#006494">
        <TestComponent />
      </MaterialThemeProvider>,
    );

    expect(screen.getByTestId("source-color")).toBeTruthy();
  });

  it("updates theme when source color changes", () => {
    render(
      <MaterialThemeProvider defaultSourceColor="#006494">
        <TestComponent />
      </MaterialThemeProvider>,
    );

    const initialColor = screen.getByTestId("source-color").textContent;

    act(() => {
      fireEvent.click(screen.getByTestId("change-color"));
    });

    const newColor = screen.getByTestId("source-color").textContent;
    expect(newColor).not.toBe(initialColor);
  });

  it("applies CSS custom properties", () => {
    render(
      <MaterialThemeProvider defaultSourceColor="#006494">
        <TestComponent />
      </MaterialThemeProvider>,
    );

    const styles = window.getComputedStyle(document.documentElement);
    expect(styles.getPropertyValue("--md-sys-color-primary")).toBeTruthy();
  });

  it("handles dark mode", () => {
    render(
      <MaterialThemeProvider defaultSourceColor="#006494" isDark={true}>
        <TestComponent />
      </MaterialThemeProvider>,
    );

    const styles = window.getComputedStyle(document.documentElement);
    expect(styles.getPropertyValue("--md-sys-color-background")).toBeTruthy();
  });

  it("throws error when hook is used outside provider", () => {
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useMaterialTheme must be used within a MaterialThemeProvider");

    console.error = consoleError;
  });
});

// Hook tests
describe("useMaterialTheme hook", () => {
  it("returns the correct context values", () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let hookResult: any;

    const TestHookComponent = () => {
      hookResult = useMaterialTheme();
      return null;
    };

    render(
      <MaterialThemeProvider defaultSourceColor="#006494">
        <TestHookComponent />
      </MaterialThemeProvider>,
    );

    expect(hookResult.materialTheme).toBeDefined();
    expect(hookResult.setSourceColor).toBeDefined();
    expect(hookResult.currentScheme).toBeDefined();
  });
});
