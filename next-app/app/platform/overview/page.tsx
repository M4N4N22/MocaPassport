import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Users, Layers, Gamepad2, Stethoscope, Plane, ShoppingBag, Landmark } from "lucide-react";

export default function PlatformOverviewPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      {/* Hero / Narrative */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Universal Identity Infrastructure
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Moca Passport powers secure, privacy-preserving, and scalable identity
          for any industry. Accelerate onboarding, simplify compliance, and give
          your users a seamless cross-platform experience.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/demo/gaming">View Demo</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/infrastructure/architecture">See Architecture</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/docs">API Docs</Link>
          </Button>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold">Built for Trust at Scale</h2>
        <p className="mt-2 text-foreground/70 max-w-2xl">
          The foundations of the Moca platform: security, compliance, and
          developer experience.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Privacy First",
              desc: "Zero-knowledge workflows and fine-grained data controls keep user info secure.",
              icon: <Shield className="h-6 w-6 text-red-600" />,
            },
            {
              title: "Enterprise Security",
              desc: "Compliance-ready by design for healthcare, finance, and regulated industries.",
              icon: <Users className="h-6 w-6 text-red-600" />,
            },
            {
              title: "Scalable by Default",
              desc: "One platform serving multiple verticals with global reach and uptime.",
              icon: <Layers className="h-6 w-6 text-red-600" />,
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3">{c.icon}</div>
              <h3 className="text-base font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions by Industry */}
      <section className="mb-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Solutions by Industry</h2>
            <p className="text-foreground/70">
              Pre-built configurations tailored for your use case.
            </p>
          </div>
          <Link href="/verticals" className="text-sm underline">
            View all industries
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Gaming",
              desc: "Frictionless login, achievement verification, and cross-platform identity.",
              icon: <Gamepad2 className="h-6 w-6 text-red-600" />,
            },
            {
              name: "Healthcare",
              desc: "HIPAA-ready workflows, document verification, and compliance reporting.",
              icon: <Stethoscope className="h-6 w-6 text-red-600" />,
            },
            {
              name: "Travel",
              desc: "Cross-border KYC, global identity verification, and fraud prevention.",
              icon: <Plane className="h-6 w-6 text-red-600" />,
            },
            {
              name: "Retail",
              desc: "Whitelabel login, customer endorsements, and loyalty integrations.",
              icon: <ShoppingBag className="h-6 w-6 text-red-600" />,
            },
            {
              name: "Finance",
              desc: "Regulatory compliance, document checks, and enterprise security.",
              icon: <Landmark className="h-6 w-6 text-red-600" />,
            },
          ].map((v) => (
            <div
              key={v.name}
              className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3">{v.icon}</div>
              <h3 className="text-base font-medium">{v.name}</h3>
              <p className="mt-2 text-sm text-foreground/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Section */}
      <section>
        <h2 className="text-2xl font-semibold">For Developers</h2>
        <p className="mt-2 text-foreground/70 max-w-2xl">
          Simple APIs, SDKs, and clear integration guides so you can start
          building in minutes.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/docs/quickstart">Quickstart Guide</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/docs/api">API Reference</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/infrastructure/integration">Integration Guide</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
