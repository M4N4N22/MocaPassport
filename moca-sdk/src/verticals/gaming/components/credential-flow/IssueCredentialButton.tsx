"use client";

import { cn } from "../../../../lib/utils";

type IssueCredentialButtonProps = {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export function IssueCredentialButton({
  label = "Issue Credential",
  loading = false,
  disabled = false,
  className,
  onClick,
}: IssueCredentialButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all w-full flex items-center justify-center gap-2",
        "bg-[var(--moca-accent)] text-[var(--moca-accent-fg)] hover:bg-[var(--moca-accent-hover)]",
        disabled || loading
          ? "opacity-60 cursor-not-allowed"
          : "cursor-pointer",
        className
      )}
    >
      {loading && (
        <span className="animate-spin h-3 w-3 border-[var(--moca-accent-fg)] border-t-transparent border-2 rounded-full"></span>
      )}
      {label}
    </button>
  );
}
