"use client";

import { motion } from "framer-motion";
import { LogIn, CheckCircle2 } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { ReactNode, cloneElement, isValidElement, useState } from "react";

type Appearance = "default" | "accent" | "ghost" | "outline";

type MocaLoginButtonProps = {
  connected?: boolean;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
  children?: ReactNode;
  appearance?: Appearance;
  connectLabel?: string;
  connectedLabel?: string;
};

export default function MocaLoginButton({
  connected: controlledConnected,
  onClick,
  className,
  asChild,
  children,
  appearance = "default",
  connectLabel = "Connect Moca ID",
  connectedLabel = "Connected as",
}: MocaLoginButtonProps) {
  const [internalConnected, setInternalConnected] = useState(false);
  const isControlled = controlledConnected !== undefined;
  const connected = isControlled ? controlledConnected : internalConnected;

  const handleClick = () => {
    if (!isControlled) setInternalConnected(!connected);
    onClick?.();
  };

  const appearanceClasses = {
    default:
      "bg-[var(--moca-bg)] text-[var(--moca-text-contrast)] hover:opacity-90",
    accent: "bg-[var(--moca-accent)] text-[var(--moca-text)] hover:opacity-90",
    ghost:
      "bg-transparent border-none text-[var(--moca-text-contrast)] hover:opacity-70",
    outline:
      "border border-[var(--moca-text-contrast)] text-[var(--moca-text-contrast)] hover:bg-[var(--moca-bg-light)]",
  };

  const baseClasses = cn(
    "px-4 py-2 rounded-2xl font-semibold tracking-wide transition-all duration-300 flex items-center gap-2",
    appearanceClasses[appearance],
    className
  );

  const content = (
    <>
      {connected ? (
        <CheckCircle2 className="h-5 w-5" />
      ) : (
        <LogIn className="h-5 w-5" />
      )}
      {connected ? connectedLabel : connectLabel}
    </>
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-center"
    >
      {asChild && isValidElement(children) ? (
        cloneElement(children as React.ReactElement<any>, {
          onClick: handleClick,
          className: cn(
            (children as React.ReactElement<any>).props.className,
            baseClasses
          ),
          children: content,
        })
      ) : (
        <button onClick={handleClick} className={baseClasses}>
          {content}
        </button>
      )}
    </motion.div>
  );
}
