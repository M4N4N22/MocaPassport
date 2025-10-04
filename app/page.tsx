"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformFeatures from "@/components/landing/PlatformFeatures";
import DeveloperSection from "@/components/landing/DeveloperSection";
import Image from "next/image";
import {
  ShieldCheck,
  Link2,
  EyeOff,
  Palette,
  Building2,
  Globe2,
} from "lucide-react";

export default function Home() {
  const coreCapabilities = [
    {
      title: "Privacy-Preserving Credentials",
      desc: "Verify user identity and credentials without exposing sensitive data.",
      icon: <EyeOff className="h-5 w-5 text-red-600" />,
    },
    {
      title: "Cross-Platform Verification",
      desc: "Connect users across apps, games, and platforms seamlessly.",
      icon: <Link2 className="h-5 w-5 text-red-600" />,
    },
    {
      title: "Zero-Knowledge Proofs",
      desc: "Prove facts about a user without sharing the underlying data.",
      icon: <ShieldCheck className="h-5 w-5 text-red-600" />,
    },
    {
      title: "Whitelabel Customization",
      desc: "Tailor branding, UI, and flows for your product or platform.",
      icon: <Palette className="h-5 w-5 text-red-600" />,
    },
    {
      title: "Enterprise Security",
      desc: "Built for compliance and security in regulated industries.",
      icon: <Building2 className="h-5 w-5 text-red-600" />,
    },
    {
      title: "Multi-Industry Scalability",
      desc: "Supports gaming, finance, healthcare, retail, travel, and more.",
      icon: <Globe2 className="h-5 w-5 text-red-600" />,
    },
  ];

  const solutions = [
    {
      href: "/solutions/gaming",
      label: "Gaming",
      desc: "Enable seamless management of player achievements, tournaments, guilds, and in-game credentials across platforms.",
    },
    {
      href: "/solutions/finance",
      label: "Finance",
      desc: "Simplify KYC, AML, and regulatory compliance while securely verifying financial identities for users and institutions.",
    },
    {
      href: "/solutions/retail",
      label: "Retail",
      desc: "Enhance loyalty programs, verify product authenticity, and streamline customer transactions in-store and online.",
    },
    {
      href: "/solutions/healthcare",
      label: "Healthcare",
      desc: "Securely manage medical credentials, patient consent, and staff identity while complying with privacy regulations.",
    },
    {
      href: "/solutions/travel",
      label: "Travel",
      desc: "Verify passports, loyalty accounts, and traveler identity efficiently, reducing friction for bookings and check-ins.",
    },
    {
      href: "/solutions/education",
      label: "Education",
      desc: "Issue, verify, and manage certificates, credentials, and course completions with secure, privacy-preserving infrastructure.",
    },
    {
      href: "/solutions/enterprise",
      label: "Enterprise",
      desc: "Manage employee access, enforce compliance, and streamline identity verification across complex organizations.",
    },
    {
      href: "/solutions/creator",
      label: "Creator Economy",
      desc: "Support subscriptions, royalties, and identity verification for creators and their communities, ensuring secure and transparent interactions.",
    },
  ];

  return (
    <main className="relative bg-background text-foreground ">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden ">
        <div
          className="absolute inset-0 -z-10 opacity-10"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1527443224154-c4f2a9cf5ee3?q=80&w=1920&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-16">
          <div className="mx-auto w-1/2 lg:mx-0 lg:flex-auto">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/50 px-3 py-1 text-sm font-medium text-foreground/70 ring-1 ring-foreground/20">
              Powered by Moca Network
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build Trust Across Platforms with Universal Identity
              Infrastructure
            </h1>
            <p className="mt-6 text-lg text-foreground/70 sm:text-xl">
              Secure, privacy-first identity verification and credential
              management for apps, games, enterprises, and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-red-600 text-white hover:bg-red-500"
              >
                <Link href="/contact">Request Access</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-foreground/20"
              >
                <Link href="/dashboard">Explore Demo</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-1/2 mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-large hover-lift">
              <Image
                width={1920}
                height={1080}
                src="/hero-platform.jpg"
                alt="Universal Identity Infrastructure Platform Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 " />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 right-0 left-0">
              <div className="flex flex-col sm:flex-row gap-4 bg-gradient-to-b from-background/80 via-background to-background  rounded-xl p-6 shadow-medium">
                <div className="text-center w-full">
                  <div className="text-2xl font-bold text-foreground">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Uptime SLA
                  </div>
                </div>
                <div className="hidden sm:block h-10 w-px bg-border" />
                <div className="text-center w-full">
                  <div className="text-2xl font-bold text-foreground">
                    &lt;100ms
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Response Time
                  </div>
                </div>
                <div className="hidden sm:block h-10 w-px bg-border" />
                <div className="text-center w-full">
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">
                    Integrations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <PlatformFeatures />
      <DeveloperSection />

      {/* Industries Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 ">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold">Industries Powered</h2>
          <p className="mt-2 text-foreground/70 max-w-xl mx-auto">
            Our infrastructure supports multiple industries with privacy,
            security, and scalability at the core.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {solutions.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-lg border  p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-medium">{i.label}</h3>
              <p className="mt-2 text-foreground/70">{i.desc}</p>

              {i.label === "Gaming" ? (
                <span className="mt-4 inline-block text-sm text-red-600 font-semibold">
                  Explore →
                </span>
              ) : (
                <span className="mt-4 inline-block text-sm text-primary bg-primary/10 px-3 py-1 rounded-full font-medium">
                  Coming soon
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold">Ready to Get Started?</h2>
        <p className="mt-4 text-foreground/70 max-w-md mx-auto">
          Secure your infrastructure access and start building privacy-first,
          scalable identity solutions today.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/contact">Request Access</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/demo/gaming">Explore Demo</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
