"use client";

import { ReactNode, useEffect } from "react";
import "./theme.css";

export type MocaThemeProviderProps = {
  children: ReactNode;
  theme?: "dark" | "light" | "system";
  colors?: Partial<{
    accent: string;
    accentFg: string;
    accentHover: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    muted: string;
    text: string;
  }>;
};

export function MocaThemeProvider({
  children,
  theme = "system",
  colors,
}: MocaThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    // Apply theme mode
    const apply = (mode: "light" | "dark") => {
      root.setAttribute("data-theme", mode);
    };

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      apply(isDark ? "dark" : "light");
    } else {
      apply(theme);
    }

    // Robust color application
    if (colors) {
      const map: Record<string, string> = {
        accent: "accent",
        accentFg: "accent-fg",
        accentHover: "accent-hover",
        surface: "surface",
        surfaceMuted: "surface-muted",
        border: "border",
        muted: "muted",
        text: "text",
      };

      Object.entries(colors).forEach(([key, value]) => {
        const mapped = map[key] || key; // fallback if user passes dashed form
        root.style.setProperty(`--moca-${mapped}`, value);
      });
    }
  }, [theme, colors]);

  return <>{children}</>;
}
