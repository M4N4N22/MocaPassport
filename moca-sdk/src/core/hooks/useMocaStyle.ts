"use client";

import { CSSProperties, useMemo } from "react";

/**
 * Returns consistent background/text/border colors based on MOCA theme variables.
 */
type MocaStyleOptions = {
  connected?: boolean;
  variant?: "default" | "outline";
  hover?: boolean;
};

export function useMocaStyle({
  connected = false,
  variant = "default",
  hover = false,
}: MocaStyleOptions = {}): CSSProperties {
  return useMemo(() => {
    const style: CSSProperties = {
      color: connected ? "var(--moca-accent-fg)" : "var(--moca-text)",
      background: connected
        ? hover
          ? "var(--moca-accent-hover)"
          : "var(--moca-accent)"
        : hover
        ? "var(--moca-surface)"
        : "var(--moca-surface-muted)",
      borderColor: "var(--moca-border)",
    };

    if (variant === "outline") {
      style.background = "transparent";
      style.border = "1px solid var(--moca-border)";
    }

    return style;
  }, [connected, variant, hover]);
}
