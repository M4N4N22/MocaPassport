"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, ShieldCheck } from "lucide-react";

type DashboardTopCardsProps = {
  reputation: {
    Sportsmanship: number;
    Teamplay: number;
    Consistency: number;
  };
  achievements: string[];
  proofs: number;
};

export default function DashboardTopCards({
  reputation,
  achievements,
  proofs,
}: DashboardTopCardsProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Reputation</CardTitle>
          <CardDescription>Cross-game trust score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-semibold">
              {(
                (reputation.Sportsmanship +
                  reputation.Teamplay +
                  reputation.Consistency) /
                3
              ).toFixed(0)}
            </span>
            <Badge className="bg-red-600 text-white">Growing</Badge>
          </div>
          <Progress
            value={
              (reputation.Sportsmanship +
                reputation.Teamplay +
                reputation.Consistency) /
              3
            }
            className="mt-3"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Lifetime highlights</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {achievements.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Connect accounts to unlock achievements
            </p>
          ) : (
            achievements.map((a, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-red-600" /> <span>{a}</span>
              </div>
            ))
          )}
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
            <div className="font-medium">
              {proofs} verifiable {proofs === 1 ? "claim" : "claims"}
            </div>
            <div className="text-sm text-foreground/70">
              Generated via ZK proofs
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
