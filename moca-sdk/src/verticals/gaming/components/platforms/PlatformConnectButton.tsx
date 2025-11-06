"use client";

import { cn } from "../../../../lib/utils";

type PlatformConnectButtonProps = {
  platformName: string;
  icon?: React.ReactNode; // e.g. <SteamIcon />
  connected?: boolean;
  className?: string;
  onClick?: () => void;
};

export function PlatformConnectButton({
  platformName,
  icon,
  connected = false,
  className,
  onClick,
}: PlatformConnectButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full px-3 py-2 rounded-lg border transition-all text-sm",
        "border-[var(--moca-border)] bg-[var(--moca-surface)] text-[var(--moca-text)]",
        "hover:bg-[var(--moca-surface-muted)]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className="w-5 h-5 flex items-center justify-center text-[var(--moca-text)]">
            {icon}
          </span>
        )}
        <span className="font-medium">{platformName}</span>
      </div>

      <span
        className={cn(
          "text-xs px-2 py-1 rounded-md border",
          connected
            ? "border-[var(--moca-border)] text-[var(--moca-muted)]"
            : "border-transparent bg-[var(--moca-accent-bg)] text-[var(--moca-accent-fg)] hover:bg-[var(--moca-accent-hover)]"
        )}
      >
        {connected ? "Connected" : "Connect"}
      </span>
    </button>
  );
}
