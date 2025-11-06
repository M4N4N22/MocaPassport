"use client";

import { useState } from "react";
import { cn } from "../../../../lib/utils";

export type Rank = {
  id: string;
  name: string;
  icon?: string; // URL or emoji
};

type RankSelectorProps = {
  ranks: Rank[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  layout?: "grid" | "dropdown";
  className?: string;
};

export function RankSelector({
  ranks,
  selectedId,
  onSelect,
  layout = "grid",
  className,
}: RankSelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = ranks.find((r) => r.id === selectedId);

  // GRID MODE -----------------------------------------------------
  if (layout === "grid") {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-3", className)}>
        {ranks.map((rank) => {
          const isSelected = selectedId === rank.id;
          return (
            <button
              key={rank.id}
              onClick={() => onSelect?.(rank.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150",
                "hover:shadow-sm"
              )}
              style={{
                background: "var(--moca-surface)",
                color: "var(--moca-text)",
                borderColor: isSelected
                  ? "var(--moca-accent)"
                  : "var(--moca-border)",
                boxShadow: isSelected
                  ? "0 0 0 2px var(--moca-accent)"
                  : "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "var(--moca-surface-muted)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--moca-surface)")
              }
            >
              {rank.icon && (
                <img
                  src={rank.icon}
                  alt={rank.name}
                  className="w-5 h-5 rounded-sm object-contain"
                />
              )}
              <span className="font-medium">{rank.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // DROPDOWN MODE -------------------------------------------------
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-4 py-2  rounded-lg transition-all duration-150"
        style={{
          background: "var(--moca-surface)",
          color: "var(--moca-text)",
          borderColor: "var(--moca-border)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--moca-surface-muted)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--moca-surface)")
        }
      >
        <div className="flex items-center gap-2">
          {selected?.icon && (
            <img src={selected.icon} className="w-5 h-5 object-contain" />
          )}
          <span>{selected?.name ?? "Select rank"}</span>
        </div>
        <span style={{ color: "var(--moca-muted)" }}>▼</span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full rounded-lg  shadow-lg transition-all duration-150 max-h-64 overflow-y-auto"
          style={{
            background: "var(--moca-surface)",
            borderColor: "var(--moca-border)",
          }}
        >
          {ranks.map((rank) => (
            <button
              key={rank.id}
              onClick={() => {
                onSelect?.(rank.id);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left rounded-md transition-all duration-100"
              style={{
                background: "var(--moca-surface)",
                color: "var(--moca-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--moca-accent)";
                e.currentTarget.style.color = "var(--moca-accent-fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--moca-surface)";
                e.currentTarget.style.color = "var(--moca-text)";
              }}
            >
              {rank.icon && (
                <img src={rank.icon} className="w-5 h-5 object-contain" />
              )}
              <span>{rank.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
