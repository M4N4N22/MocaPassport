"use client";

import { cn } from "../../../../lib/utils";

type LogoutButtonProps = {
  className?: string;
  label?: string;
  onClick?: () => void; 
};

export function LogoutButton({
  className,
  label = "Logout",
  onClick,
}: LogoutButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg border transition-all text-sm font-medium",
        "bg-[var(--moca-surface)] border-[var(--moca-border)] text-[var(--moca-text)]",
        "hover:bg-[var(--moca-surface-muted)]",
        className
      )}
    >
      {label}
    </button>
  );
}
