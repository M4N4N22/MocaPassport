"use client";

import { useState } from "react";
import { cn } from "../../../../lib/utils";

export type Game = {
  id: string;
  name: string;
  icon?: string;
};

type GameSelectorProps = {
  games: Game[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  layout?: "grid" | "dropdown";
  className?: string;
};

export function GameSelector({
  games,
  selectedId,
  onSelect,
  layout = "grid",
  className,
}: GameSelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = games.find((g) => g.id === selectedId);

  // GRID MODE ---------------------------------
  if (layout === "grid") {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-3", className)}>
        {games.map((game) => {
          const isSelected = selectedId === game.id;

          return (
            <button
              key={game.id}
              onClick={() => onSelect?.(game.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-150",
                "hover:shadow-sm"
              )}
              style={{
                background: "var(--moca-surface)",
                color: "var(--moca-text)",
                borderColor: isSelected
                  ? "var(--moca-accent)"
                  : "var(--moca-border)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--moca-surface-muted)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--moca-surface)")
              }
            >
              {game.icon && (
                <img
                  src={game.icon}
                  alt={game.name}
                  className="w-5 h-5 rounded-sm object-contain"
                />
              )}
              <span className="font-medium">{game.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // DROPDOWN MODE ------------------------------
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 rounded-lg  transition-all duration-150"
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
          {selected?.icon && <img src={selected.icon} width={18} height={18} />}
          <span>{selected?.name ?? "Select game"}</span>
        </div>
        <span style={{ color: "var(--moca-muted)" }}>▼</span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full rounded-lg  shadow-lg transition-all duration-150"
          style={{
            background: "var(--moca-surface)",
            borderColor: "var(--moca-border)",
          }}
        >
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => {
                onSelect?.(game.id);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left transition-all duration-100 rounded-md"
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
              {game.icon && <img src={game.icon} width={18} height={18} />}
              <span>{game.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
