"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Platform = "web" | "ios" | "android";
type Step = { title: string; code: string; desc: string };

export default function QuickstartPage() {
  const [platform, setPlatform] = useState<Platform>("web");

  const steps: Record<Platform, Step[]> = {
    web: [
      {
        title: "Install SDK",
        code: `npm install @mocapassport/sdk`,
        desc: "Add the official Moca Passport SDK to your web project.",
      },
      {
        title: "Initialize",
        code: `import { MocaPassport } from '@mocapassport/sdk';

const passport = new MocaPassport({ apiKey: 'YOUR_KEY' });`,
        desc: "Initialize the SDK with your API key and configuration.",
      },
      {
        title: "Verify User",
        code: `const result = await passport.identity.verify({ id: 'user123', document: 'passport.png' });
console.log(result.status);`,
        desc: "Use the SDK to perform identity verification in your app.",
      },
    ],
    ios: [
      {
        title: "Add SDK",
        code: `pod 'MocaPassport', '~> 1.0.0'`,
        desc: "Add the official Moca Passport SDK to your Xcode project via CocoaPods.",
      },
      {
        title: "Initialize",
        code: `import MocaPassport

let passport = MocaPassport(apiKey: "YOUR_KEY")`,
        desc: "Initialize the SDK with your API key.",
      },
      {
        title: "Verify User",
        code: `passport.identity.verify(userId: "12345") { result in
  print(result.status)
}`,
        desc: "Perform identity verification with the SDK.",
      },
    ],
    android: [
      {
        title: "Add SDK",
        code: `implementation 'com.moca:passport:1.0.0'`,
        desc: "Add the official Moca Passport SDK to your Android project via Gradle.",
      },
      {
        title: "Initialize",
        code: `MocaPassport passport = new MocaPassport("YOUR_KEY");`,
        desc: "Initialize the SDK with your API key.",
      },
      {
        title: "Verify User",
        code: `passport.identity.verify("12345", result -> {
    Log.d("MocaPassport", result.getStatus());
});`,
        desc: "Verify users within your Android app.",
      },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">Quickstart Guide</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Integrate Moca Passport into your Web, iOS, or Android app in minutes.
        </p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/docs/api">API Reference</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/docs/sdk">Download SDKs</Link>
          </Button>
        </div>
      </section>

      <Tabs defaultValue="web" className="mb-8" onValueChange={(v) => setPlatform(v as Platform)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="ios">iOS</TabsTrigger>
          <TabsTrigger value="android">Android</TabsTrigger>
        </TabsList>

        {(["web","ios","android"] as Platform[]).map((p) => (
          <TabsContent key={p} value={p}>
            <div className="space-y-6">
              {steps[p].map((step) => (
                <div key={step.title} className="rounded-lg border p-5">
                  <h3 className="text-base font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{step.desc}</p>
                  <pre className="mt-2 rounded bg-gray-100 p-3 text-sm overflow-x-auto">
                    <code>{step.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <section className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <p className="text-foreground/70 mb-6">
          Explore the API reference and integration guides for advanced functionality.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <Link href="/docs/api">API Reference</Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <Link href="/platform/integration">Integration Guide</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
