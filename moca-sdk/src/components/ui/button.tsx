import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      // Primary CTA → accent color
      default:
        "bg-[var(--moca-accent)] text-[var(--moca-accent-fg)] hover:bg-[var(--moca-accent-hover)]",

      // Secondary button → surface-muted contrast
      secondary:
        "bg-[var(--moca-surface-muted)] text-[var(--moca-text)] hover:bg-[var(--moca-surface)]",

      // Outline → transparent with border themed
      outline:
        "border border-[var(--moca-border)] bg-[var(--moca-surface)] text-[var(--moca-text)] hover:bg-[var(--moca-surface-muted)]",

      // Ghost → invisible background
      ghost:
        "bg-transparent text-[var(--moca-text)] hover:bg-[var(--moca-surface-muted)]",
    };

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-10 px-8",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
