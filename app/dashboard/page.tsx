"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Link2, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Your Passport
            </h1>
            <p className="text-foreground/70">Handle: @gamer123 • Since 2024</p>
          </div>
        </div>

        <Button asChild variant="ghost" className="hidden md:inline-flex">
          <Link
            href="/auth"
            className="text-sm font-medium flex items-center gap-1"
          >
            Sign in with AIR
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Reputation</CardTitle>
            <CardDescription>Cross-game trust score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-semibold">742</span>
              <Badge className="bg-red-600 text-white">Top 12%</Badge>
            </div>
            <Progress value={74} className="mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Lifetime highlights</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-red-600" />
            <div>
              <div className="font-medium">Legendary Raid Leader</div>
              <div className="text-sm text-foreground/70">
                Unlocked 2 days ago
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Privacy and proofs</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-red-600" />
            <div>
              <div className="font-medium">ZK Proofs Active</div>
              <div className="text-sm text-foreground/70">
                3 verifiable claims
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="mt-10">
        <TabsList>
          <TabsTrigger value="accounts">Gaming Accounts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="reputation">Reputation</TabsTrigger>
        </TabsList>
        <TabsContent
          value="accounts"
          className="mt-6 grid gap-6 md:grid-cols-3"
        >
          {["Steam", "Xbox", "PlayStation"].map((p) => (
            <Card key={p}>
              <CardHeader>
                <CardTitle>{p}</CardTitle>
                <CardDescription>Connect your {p} profile</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Link2 className="mr-2 h-4 w-4" /> Link {p}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent
          value="achievements"
          className="mt-6 grid gap-6 md:grid-cols-3"
        >
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Elite Champion #{i}</CardTitle>
                <CardDescription>Seasonal event trophy</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Star className="h-6 w-6 text-red-600" />
                <div className="text-sm text-foreground/80">
                  Score: {900 - i * 12}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="reputation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reputation Breakdown</CardTitle>
              <CardDescription>
                Sportsmanship, Teamplay, Consistency
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {["Sportsmanship", "Teamplay", "Consistency"].map((k, idx) => (
                <div key={k}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{k}</span>
                    <span className="text-sm text-foreground/70">
                      {80 - idx * 6}
                    </span>
                  </div>
                  <Progress value={80 - idx * 6} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
