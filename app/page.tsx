"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, Trophy, Link2 } from "lucide-react";

export default function Home() {
  return (
    <main className="relative">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:flex lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <Badge className="bg-red-600 text-white hover:bg-red-500">New</Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              Moca Passport
            </h1>
            <p className="mt-4 max-w-xl text-base/7 text-foreground/80 sm:text-lg/8">
              The Universal Gamer Credential. Own your gaming identity, connect accounts,
              showcase achievements, build reputation, join guilds, and control privacy with ZK.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="bg-red-600 text-white hover:bg-red-500">
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="border-foreground/20">
                <Link href="/dashboard">Launch App</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">Connect Accounts</CardTitle>
              <Link2 className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent className="text-sm text-foreground/80">
              Link Steam, Xbox, PlayStation, Epic, and more to unify your gamer graph.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">Achievements</CardTitle>
              <Trophy className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent className="text-sm text-foreground/80">
              Showcase cross-platform achievements and lifetime milestones.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">Guilds</CardTitle>
              <Users className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent className="text-sm text-foreground/80">
              Join or create communities. Earn reputation via raids, leagues, and events.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">Privacy & ZK</CardTitle>
              <ShieldCheck className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent className="text-sm text-foreground/80">
              Control visibility per-attribute. Prove skill with zero-knowledge proofs.
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}