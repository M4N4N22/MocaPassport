"use client";

import { PlatformCard } from "./PlatformCard";

export type PlatformItem = {
  name: string;
  icon?: React.ReactNode;
  connected?: boolean;
  onConnect?: () => void;
  variant?: "default" | "outline";
};

type PlatformConnectListProps = {
  platforms: PlatformItem[];
  columns?: number | "auto"; // auto = responsive grid
  className?: string;
};

export function PlatformConnectList({
  platforms,
  columns = "auto",
  className,
}: PlatformConnectListProps) {
  return (
    <div
      className={
        columns === "auto"
          ? "grid grid-cols-2 md:grid-cols-3 gap-4"
          : `grid grid-cols-${columns} gap-4` + ` ${className ?? ""}`
      }
    >
      {platforms.map((platform, index) => (
        <PlatformCard
          key={index}
          name={platform.name}
          icon={platform.icon}
          connected={platform.connected}
          onConnect={platform.onConnect}
          variant={platform.variant}
        />
      ))}
    </div>
  );
}
