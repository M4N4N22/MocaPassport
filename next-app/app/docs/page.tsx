"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Layers } from "lucide-react";

export default function DocsPage() {
  const docSections = [
    {
      title: "Quickstart",
      desc: "Step-by-step guide to get started with Moca Passport in minutes.",
      icon: <BookOpen className="h-6 w-6 text-red-600" />,
      href: "/docs/quickstart",
    },
    {
      title: "API Reference",
      desc: "Comprehensive API documentation with endpoints, request/response examples, and error codes.",
      icon: <Code className="h-6 w-6 text-red-600" />,
      href: "/docs/api",
    },
    {
      title: "SDKs & Libraries",
      desc: "Download and integrate pre-built SDKs for Web, iOS, Android, and server-side apps.",
      icon: <Layers className="h-6 w-6 text-red-600" />,
      href: "/docs/sdk",
    },
    {
      title: "Integration Guides",
      desc: "Detailed walkthroughs on embedding Moca Passport into your application.",
      icon: <BookOpen className="h-6 w-6 text-red-600" />,
      href: "/platform/integration",
    },
    {
      title: "Architecture",
      desc: "Learn how Moca Passport is built: security model, data flow, and multi-tenant considerations.",
      icon: <Layers className="h-6 w-6 text-red-600" />,
      href: "/platform/architecture",
    },
    {
      title: "Prebuilt Components",
      desc: "Use drop-in UI components like Login, Connect Widget, and Gaming Passport instantly.",
      icon: <Layers className="h-6 w-6 text-red-600" />,
      href: "/docs/components",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">Documentation</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Everything you need to integrate, build, and scale with Moca Passport.
        </p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/docs/quickstart">Get Started</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {docSections.map((doc) => (
          <Link
            key={doc.title}
            href={doc.href}
            className="flex flex-col gap-6 rounded-3xl bg-card p-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              {doc.icon}
              <h3 className="text-base font-medium">{doc.title}</h3>
            </div>
            <p className="text-sm text-foreground/70">{doc.desc}</p>
          </Link>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Ready to Build?</h2>
        <p className="text-foreground/70 mb-6">
          Explore the docs, pick your tools, and integrate Moca Passport in
          minutes.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/docs/quickstart">Start Now</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/docs/api">Explore API</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
