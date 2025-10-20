'use client';
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'yellow' | 'green' | 'red' | 'default';
  children: React.ReactNode;
}

export function Badge({ color = 'default', className, children, ...props }: BadgeProps) {
  const colorClasses = {
    yellow: 'bg-[#FAFF2A]/10 text-[#FAFF2A] border border-[#FAFF2A]/30',
    green: 'bg-green-500/10 text-green-400 border border-green-500/30',
    red: 'bg-red-500/10 text-red-400 border border-red-500/30',
    default: 'bg-zinc-800/50 text-zinc-200 border border-zinc-700/50',
  };

  return (
    <span
      className={cn(
        'text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm select-none',
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
