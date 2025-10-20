"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Swords, Crown } from "lucide-react";

export default function GuildsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Guilds</h1>
          <p className="text-foreground/70">Join elite communities or create your own.</p>
        </div>
        <Button className="bg-red-600 text-white hover:bg-red-500">Create Guild</Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Crown className="h-5 w-5 text-red-600" /> Moca Elite</CardTitle>
            <CardDescription>Top-tier competitive team</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-foreground/70">Members: 128</div>
            <Button variant="outline">Request Invite</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-red-600" /> Social Raiders</CardTitle>
            <CardDescription>Casual raids and events</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-foreground/70">Members: 432</div>
            <Button variant="outline">Join</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Swords className="h-5 w-5 text-red-600" /> Night Blades</CardTitle>
            <CardDescription>Stealth ops and PvP</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-foreground/70">Members: 96</div>
            <Button variant="outline">Join</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Find a guild</h2>
        <div className="mt-3 flex gap-2">
          <Input placeholder="Search by name or tag" />
          <Button variant="outline">Search</Button>
        </div>
      </div>
    </main>
  );
}