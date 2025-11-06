"use client";

import { cn } from "../../../../lib/utils";

export type PlatformStatus = {
  id: string;
  name: string;
  connected: boolean;
  icon?: string | React.ReactNode;
};

type PlatformConnectionStatusProps = {
  platforms: PlatformStatus[];
  /**
   * Optional render prop to override default UI
   * (connectedCount, total, platforms)
   */
  children?: (info: {
    connectedCount: number;
    total: number;
    platforms: PlatformStatus[];
  }) => React.ReactNode;
  className?: string;
};

export function PlatformConnectionStatus({
  platforms,
  children,
  className,
}: PlatformConnectionStatusProps) {
  const total = platforms.length;
  const connectedCount = platforms.filter((p) => p.connected).length;

  // If consumer provides custom UI → return it
  if (children) {
    return (
      <>
        {children({
          connectedCount,
          total,
          platforms,
        })}
      </>
    );
  }

  // Default UI
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-[var(--moca-text-on-bg)]",
        className
      )}
    >
      <span className="font-medium">
        {connectedCount} / {total} connected
      </span>

      {/* Optional connected icons preview */}
      <div className="flex -space-x-2">
        {platforms
          .filter((p) => p.connected && p.icon)
          .map((p) => (
            <div
              key={p.id}
              className="w-5 h-5 rounded-full overflow-hidden border border-[var(--moca-border)] bg-[var(--moca-bg)]"
            >
              {p.icon}
            </div>
          ))}
      </div>
    </div>
  );
}
