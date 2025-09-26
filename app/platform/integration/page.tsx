"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code, Cpu, Layers } from "lucide-react";

export default function IntegrationPage() {
  const integrationOptions = [
    {
      title: "API First",
      desc: "REST APIs with full documentation, sandbox, and test environments for rapid integration.",
      icon: <Code className="h-6 w-6 text-red-600" />,
    },
    {
      title: "SDKs",
      desc: "Official Moca Passport SDKs for Web, iOS, and Android to speed up development.",
      icon: <Cpu className="h-6 w-6 text-red-600" />,
    },
    {
      title: "UI Components",
      desc: "Drop-in widgets like login, KYC, and credential sharing—fully customizable for any brand.",
      icon: <Layers className="h-6 w-6 text-red-600" />,
    },
  ];

  const quickstartSteps = [
    {
      step: "1",
      title: "Get API Keys",
      desc: "Sign up, create a project, and generate sandbox API credentials to start testing.",
    },
    {
      step: "2",
      title: "Install SDK",
      desc: "Run `npm install @mocapassport/sdk` (Web) or the platform-specific SDK to include Moca Passport in your project.",
    },
    {
      step: "3",
      title: "Initialize",
      desc: "Initialize the SDK with your API key and configure identity workflows.",
    },
    {
      step: "4",
      title: "Verify Identity",
      desc: "Use `passport.identity.verify()` via SDK or API endpoints for KYC, document verification, or credential checks.",
    },
    {
      step: "5",
      title: "Move to Production",
      desc: "Switch API keys to production and deploy with confidence.",
    },
  ];

  const codeExample = `import { MocaPassport } from "@mocapassport/sdk";

const passport = new MocaPassport({ apiKey: process.env.MOCAPASSPORT_API_KEY });

const user = await passport.identity.verify({
  id: "user123",
  document: "passport.png"
});

console.log(user.status); // "verified"
`;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Seamless Integration for Your Apps
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          SDKs, APIs, and drop-in components designed for fast onboarding and
          low development effort.
        </p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/docs/quickstart">Quickstart Guide</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/docs/api">API Reference</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/docs/sdk">Download SDKs</Link>
          </Button>
        </div>
      </section>

      {/* Integration Options */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Integration Options</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrationOptions.map((opt) => (
            <div
              key={opt.title}
              className="rounded-lg border p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                {opt.icon}
                <h3 className="text-base font-medium">{opt.title}</h3>
              </div>
              <p className="mt-2 text-sm text-foreground/70">{opt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quickstart Steps */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Quickstart Steps</h2>
        <div className="space-y-4">
          {quickstartSteps.map((s) => (
            <div key={s.step} className="flex gap-4 items-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-semibold">
                {s.step}
              </div>
              <div>
                <h3 className="font-medium">{s.title}</h3>
                <p className="text-sm text-foreground/70">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Code Example</h2>
        <pre className="rounded-lg border bg-background p-4 text-sm overflow-x-auto text-foreground">
          <code>{codeExample}</code>
        </pre>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Integrate?</h2>
        <p className="text-foreground/70 mb-6">
          Start building with Moca Passport today and bring secure identity to
          your app in minutes.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/docs/quickstart">Get Sandbox Keys</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/docs/api">View API Docs</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
