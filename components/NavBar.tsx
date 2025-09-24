"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Gamepad2, ShieldCheck, Users } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/guilds", label: "Guilds" },
    { href: "/privacy", label: "Privacy" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
            <Gamepad2 className="h-4 w-4" />
          </span>
          <span className="tracking-tight">Moca Passport</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground/80",
                pathname === n.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/auth" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Sign in
            </Link>
          </Button>
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Launch App
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}