"use client";

import { Button } from "@/components/ui/button";
import { Shield, Layers, Server, Lock, Code, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ArchitecturePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black text-white py-20">
        <div className="relative z-10 mx-auto max-w-5xl text-center px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Identity Infrastructure, Secure by Design
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-300">
            Moca Passport delivers privacy-first identity and compliance across
            industries, with an architecture built for scale.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild className="bg-red-600 text-white hover:bg-red-500">
              <Link href="/demo/gaming">View Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-zinc-700 text-white"
            >
              <Link href="/docs">Read Docs</Link>
            </Button>
          </div>
        </div>
        {/* Glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.2),transparent)]" />
      </section>

      {/* Core Architecture Layers */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold text-center">
            Core Architecture Layers
          </h2>
          <p className="mt-2 text-center text-foreground/70">
            A modular, layered system designed for interoperability and
            compliance.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Identity Layer",
                desc: "Unified IDs, credential binding, interoperability",
                icon: Layers,
              },
              {
                title: "Security Layer",
                desc: "ZKPs, encryption, MFA flows",
                icon: Shield,
              },
              {
                title: "Data Layer",
                desc: "Secure storage, audit logs, compliance-ready",
                icon: Server,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border bg-card/50 backdrop-blur p-6 shadow hover:shadow-lg transition"
              >
                <c.icon className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-lg font-medium">{c.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Stack Diagram (simplified for now) */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-5xl text-center px-6">
          <h2 className="text-2xl font-semibold">How It All Fits Together</h2>
          <p className="mt-2 text-foreground/70">
            A layered architecture that keeps your identities secure and your
            integrations simple.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {[
              {
                layer: "Apps & Platforms",
                desc: "Your frontends and services connect here",
              },
              {
                layer: "Moca Passport API",
                desc: "Unified access to identity workflows",
              },
              {
                layer: "Security & Compliance",
                desc: "Encryption, ZKPs, consent management",
              },
              {
                layer: "Data & Storage",
                desc: "Tamper-proof logs, encrypted storage",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="rounded-lg border bg-background p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium">{row.layer}</span>
                <span className="text-sm text-foreground/70">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold text-center">
            Security & Compliance
          </h2>
          <p className="mt-2 text-center text-foreground/70">
            Enterprise-grade protections, regulatory compliance, and best
            practices built in.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "GDPR Ready",
              "HIPAA Compliant",
              "SOC2 Foundations",
              "Zero-Knowledge Proofs",
              "End-to-End Encryption",
              "Audit Logging",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-3 rounded-lg border p-4 bg-muted/30"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Experience */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-semibold">For Developers</h2>
            <p className="mt-2 text-foreground/70">
              Simple APIs, SDKs, and clear integration guides so you can start
              building in minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/docs/quickstart">Quickstart Guide</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-foreground/20"
              >
                <Link href="/docs/api">API Reference</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card/50 backdrop-blur p-4 font-mono text-sm text-foreground/80">
            <pre>{`// Example: Verify a credential
const { verified } = await moca.verify({
  credential: "user-passport",
  fields: ["age", "country"]
});

if (verified) {
  console.log("Access granted ✅");
}`}</pre>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-background text-center">
        <h2 className="text-3xl font-semibold">
          Ready to build with Moca Passport?
        </h2>
        <p className="mt-2 text-foreground/70">
          Explore our docs or see a live demo today.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/demo/gaming">Try Demo</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
