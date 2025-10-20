"use client"

import * as React from "react"
import Link from "next/link"
import { ShieldCheck, Users } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

const solutions = [
  { href: "/solutions/gaming", label: "Gaming", desc: "Achievements, tournaments, guilds" },
  { href: "/solutions/finance", label: "Finance", desc: "KYC, AML, compliance" },
  { href: "/solutions/retail", label: "Retail", desc: "Loyalty, authenticity, purchases" },
  { href: "/solutions/healthcare", label: "Healthcare", desc: "Medical credentials, consent" },
  { href: "/solutions/travel", label: "Travel", desc: "Bookings, loyalty, verification" },
  { href: "/solutions/education", label: "Education", desc: "Certificates, credentials, courses" },
  { href: "/solutions/enterprise", label: "Enterprise", desc: "Access control, compliance" },
  { href: "/solutions/creator", label: "Creator Economy", desc: "Subscriptions, royalties, identity" },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
            M
          </span>
          <span className="tracking-tight">Moca Passport</span>
        </Link>

        {/* Nav Menu */}
        <NavigationMenu>
  <NavigationMenuList className="hidden md:flex items-center gap-6">
    {/* Platform Dropdown */}
    <NavigationMenuItem>
      <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
        Platform
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-[400px] p-4 grid gap-3">
          <ListItem href="/platform/overview" title="Overview">
            Universal identity infrastructure at a glance
          </ListItem>
          <ListItem href="/platform/architecture" title="Architecture">
            Technical foundation and security model
          </ListItem>
          <ListItem href="/platform/integration" title="Integration">
            How to integrate with your apps
          </ListItem>
          <ListItem href="/docs" title="API & Docs">
            Developer APIs, SDKs, and guides
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* Solutions Dropdown */}
    <NavigationMenuItem>
      <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
        Solutions
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[500px] grid-cols-2 gap-4 p-4">
          {solutions.map((s) => (
            <ListItem key={s.href} href={s.href} title={s.label}>
              {s.desc}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* Developers (direct) */}
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/docs">Developers</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    {/* Showcase / Resources */}
    <NavigationMenuItem>
      <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
        Resources
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-[350px] p-4 grid gap-3">
          <ListItem href="/showcase" title="Showcase">
            Real-world demos and case studies
          </ListItem>
          <ListItem href="/partners" title="Partners">
            Ecosystem and integrations
          </ListItem>
          <ListItem href="/blog" title="Blog">
            Product updates and insights
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* Contact */}
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/contact">Contact</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>


        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/dashboard" className="text-sm font-medium flex items-center gap-1">
           
              Explore Demo
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function ListItem({ title, children, href }: { title: string; children: React.ReactNode; href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex flex-col rounded-md px-3 py-2 hover:bg-accent transition-colors"
        >
          <span className="font-medium text-foreground">{title}</span>
          <span className="text-xs text-foreground/50">{children}</span>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
