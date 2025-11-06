"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ProfileCardProps = {
  avatar?: string;
  username?: string;
  primaryGame?: string;
  rank?: string;
  platforms?: { name: string; connected: boolean }[];
};

export function ProfileCard({
  avatar = "/placeholder-avatar.png",
  username = "Player One",
  primaryGame = "Valorant",
  rank = "Gold III",
  platforms = [],
}: ProfileCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--moca-border)] bg-[var(--moca-surface)] p-6 transition-all",
        expanded ? "space-y-6" : "space-y-4"
      )}
    >
      {/* Minimal View */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={username}
          className="w-12 h-12 rounded-lg object-cover"
        />

        <div>
          <div className="font-medium text-white">{username}</div>
          <div className="text-xs text-[var(--moca-muted)]">
            {primaryGame} • {rank}
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-sm font-medium underline underline-offset-4"
      >
        {expanded ? "Hide Details" : "View Details"}
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="space-y-4 border-t border-[var(--moca-border)] pt-4">
          {/* Connected Platforms */}
          <div>
            <div className="text-xs text-[var(--moca-muted)] mb-1">
              Connected Platforms
            </div>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <span
                  key={p.name}
                  className={cn(
                    "px-2 py-1 rounded-md text-xs border",
                    p.connected
                      ? "border-[var(--moca-accent-bg)] bg-[var(--moca-accent-bg)] text-black"
                      : "border-[var(--moca-border)] text-[var(--moca-muted)]"
                  )}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>

          {/* Rank Display */}
          <div>
            <div className="text-xs text-[var(--moca-muted)] mb-1">
              Rank Progress
            </div>
            <div className="text-sm">{rank}</div>
            <div className="w-full h-2 bg-zinc-800 rounded-md overflow-hidden">
              <div
                className="h-full bg-[var(--moca-accent-bg)]"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
