"use client";

import { cn } from "../../../../lib/utils";
import { CheckCircle2, Link2 } from "lucide-react";

export type PlatformCardProps = {
  name: string;
  icon?: React.ReactNode;
  connected?: boolean;
  onConnect?: () => void;
  className?: string;
  variant?: "default" | "outline";
};

export function PlatformCard({
  name,
  icon,
  connected = false,
  onConnect,
  className,
  variant = "default",
}: PlatformCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:shadow-md",
        className
      )}
      style={{
        background: connected ? "var(--moca-surface)" : "var(--moca-surface)",
        color: connected ? "var(--moca-accent-fg)" : "var(--moca-text)",
       
        
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold"
          style={{
            background: "var(--moca-accent)",
            color: "var(--moca-accent-fg)",
          }}
        >
          {icon ?? name.charAt(0)}
        </div>

        <div className="flex flex-col">
          <span style={{ color: "var(--moca-text)" }} className="font-semibold">
            {name}
          </span>
          <span className="text-xs" style={{ color: "var(--moca-muted)" }}>
            {connected ? "Connected" : "Not connected"}
          </span>
        </div>
      </div>

      {/* Right action button */}
      <button
        onClick={onConnect}
        className={cn(
          "rounded-lg font-medium ml-4 px-4 py-2 flex items-center gap-2 transition-all duration-200",
          variant === "outline" && "border bg-transparent"
        )}
        style={{
          background: connected
            ? "var(--moca-accent)"
            : "var(--moca-surface-muted)",
          color: connected ? "var(--moca-accent-fg)" : "var(--moca-text)",
          borderColor: "var(--moca-border)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.8"; // reduce opacity to 90%
        
          if (connected)
            e.currentTarget.style.background = "var(--moca-accent-hover)";
          else
            e.currentTarget.style.background = "var(--moca-surface-muted)";
        }}
        
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1"; // reset opacity
        
          if (connected)
            e.currentTarget.style.background = "var(--moca-accent)";
          else
            e.currentTarget.style.background = "var(--moca-surface-muted)";
        }}
        
      >
        {connected ? (
          <>
            <CheckCircle2 className="w-4 h-4" /> Connected
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" /> Connect
          </>
        )}
      </button>
    </div>
  );
}
