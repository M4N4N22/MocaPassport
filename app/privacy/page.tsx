"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Privacy & ZK-Proofs</h1>
      <p className="text-foreground/70">Control what you share and prove without revealing data.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visibility</CardTitle>
            <CardDescription>Toggle profile fields</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Username","Connected Accounts","Achievements","Reputation Score"].map((k) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-sm">{k}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Zero-Knowledge Proofs</CardTitle>
            <CardDescription>Share claims privately</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-foreground/80">
              Generate verifiable proofs like “reputation ≥ 700” or “completed 50+ raids” without exposing raw data.
            </div>
            <Button className="bg-red-600 text-white hover:bg-red-500">
              <ShieldCheck className="mr-2 h-4 w-4" /> Generate Proof
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}