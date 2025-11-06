"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../../lib/utils";
import { ChevronDown } from "lucide-react";

export type Platform = {
  id: string;
  name: string;
  icon?: string; // URL or local asset
};

type PlatformSelectorProps = {
  platforms: Platform[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
};

export function PlatformSelector({
  platforms,
  selectedId,
  onSelect,
  className,
}: PlatformSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedPlatform = platforms.find((p) => p.id === selectedId);

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-between px-4 py-2 rounded-lg border w-full transition-all",
          "bg-[var(--moca-bg)] border-border text-[var(--moca-text-on-bg)]"
        )}
      >
        <div className="flex items-center gap-2">
          {selectedPlatform?.icon && (
            <img
              src={selectedPlatform.icon}
              width={20}
              height={20}
              alt={selectedPlatform.name}
              className="rounded-sm object-contain"
            />
          )}
          <span className="font-medium">
            {selectedPlatform?.name ?? "Select platform"}
          </span>
        </div>

        <ChevronDown
          className={cn("w-4 h-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute z-20 mt-2 w-full rounded-lg border bg-[var(--moca-bg)] border-border shadow-lg"
        >
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => {
                onSelect?.(platform.id);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-[var(--moca-accent-bg)] transition-colors"
              )}
            >
              {platform.icon && (
                <img
                  src={platform.icon}
                  width={18}
                  height={18}
                  alt={platform.name}
                  className="rounded-sm object-contain"
                />
              )}
              <span>{platform.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
