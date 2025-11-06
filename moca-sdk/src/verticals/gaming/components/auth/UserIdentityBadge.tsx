"use client";

import { cn } from "../../../../lib/utils";

type UserIdentityBadgeProps = {
  className?: string;
  avatar?: string;
  username?: string;
  verified?: boolean;
  showBadge?: boolean;
  onClick?: () => void;
};

export function UserIdentityBadge({
  className,
  avatar = "https://cdn.mocapassport.placeholder/avatar.png",
  username = "Anonymous",
  verified = false,
  showBadge = true,
  onClick,
}: UserIdentityBadgeProps) {
  const baseStyle: React.CSSProperties = {
    background: "var(--moca-surface)",
    borderColor: "var(--moca-border)",
    color: "var(--moca-text)",
    transition: "all 0.2s ease-in-out",
  };

  const hoverStyle: React.CSSProperties = {
    background: "var(--moca-surface-muted)",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg border text-left",
        className
      )}
      style={baseStyle}
      onMouseEnter={(e) =>
        Object.assign(e.currentTarget.style, hoverStyle)
      }
      onMouseLeave={(e) =>
        Object.assign(e.currentTarget.style, baseStyle)
      }
    >
      <img
        src={avatar}
        alt="user"
        className="w-8 h-8 rounded-md object-cover"
      />

      <div className="flex flex-col text-left leading-tight">
        <span className="text-sm font-medium">{username}</span>

        {showBadge && verified && (
          <span
            className="text-xs"
            style={{ color: "var(--moca-muted)" }}
          >
            Verified
          </span>
        )}
      </div>
    </button>
  );
}
