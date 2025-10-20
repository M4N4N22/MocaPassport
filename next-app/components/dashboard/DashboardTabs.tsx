"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Star, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAirKit } from "@/hooks/useAirKit";
import { useState } from "react";
import { AirLoginResult } from "@mocanetwork/airkit";

export type DashboardTabsProps = {
    user: AirLoginResult | null;
  connectedAccounts: string[];
  handleConnect: (platform: string) => void;
  achievements: string[];
  reputation: {
    Sportsmanship: number;
    Teamplay: number;
    Consistency: number;
  };
};

type PlatformStatus = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

export default function DashboardTabs({
  connectedAccounts,
  handleConnect,
  achievements,
  reputation,
  user,
}: DashboardTabsProps) {
  const { airService } = useAirKit();

  const [platformStatus, setPlatformStatus] = useState<
    Record<string, PlatformStatus>
  >({});

  const [extraFields, setExtraFields] = useState<
    Record<string, { id: string; name: string; value: string }[]>
  >({});

  const platforms = ["Steam", "Xbox", "PlayStation"];

  platforms.forEach((p) => {
    if (!platformStatus[p]) {
      setPlatformStatus((prev) => ({
        ...prev,
        [p]: { loading: false, success: false, error: null },
      }));
    }
    if (!extraFields[p]) {
      setExtraFields((prev) => ({ ...prev, [p]: [] }));
    }
  });

  const addExtraField = (platform: string) => {
    const newField = { id: Date.now().toString(), name: "", value: "" };
    setExtraFields((prev) => ({
      ...prev,
      [platform]: [...(prev[platform] || []), newField],
    }));
  };

  const updateExtraField = (
    platform: string,
    id: string,
    field: Partial<{ name: string; value: string }>
  ) => {
    setExtraFields((prev) => ({
      ...prev,
      [platform]: prev[platform].map((f) =>
        f.id === id ? { ...f, ...field } : f
      ),
    }));
  };

  const removeExtraField = (platform: string, id: string) => {
    setExtraFields((prev) => ({
      ...prev,
      [platform]: prev[platform].filter((f) => f.id !== id),
    }));
  };

  const handleConnectAndIssue = async (platform: string) => {
    if (connectedAccounts.includes(platform) || !user?.id || !airService) {
      console.warn("[handleConnectAndIssue] Skipping connect → conditions not met", {
        alreadyConnected: connectedAccounts.includes(platform),
        hasUser: !!user?.id,
        hasAirService: !!airService,
      });
      return;
    }
  
    console.log(`[handleConnectAndIssue] Starting credential issuance for ${platform}`);
  
    setPlatformStatus((prev) => ({
      ...prev,
      [platform]: { loading: true, success: false, error: null },
    }));
  
    try {
      console.log("[handleConnectAndIssue] Requesting JWT from /api/generate-jwt...");
      const res = await fetch("/api/generate-jwt");
      const data = await res.json();
      console.log("[handleConnectAndIssue] /api/generate-jwt response:", data);
  
      const { success, jwt } = data;
      if (!success || !jwt) throw new Error("Failed to generate JWT");
  
      console.log("[handleConnectAndIssue] Building credentialSubject...");
      const extraFieldData = Object.fromEntries(
        (extraFields[platform] || [])
          .filter((f) => f.name.trim())
          .map((f) => [f.name, f.value])
      );
  
      const credentialSubject = {
        platform,
        userId: user.id,
        connectedAt: new Date().toISOString().split("T")[0],
        ...extraFieldData,
      };
  
      console.log("[handleConnectAndIssue] Credential details prepared:", {
        credentialId: process.env.NEXT_PUBLIC_CREDENTIAL_ID,
        issuerDid: process.env.NEXT_PUBLIC_ISSUER_DID,
        authToken: jwt.substring(0, 15) + "...", // log only partial token
        credentialSubject,
      });
  
      console.log("[handleConnectAndIssue] Calling airService.issueCredential...");
      const issueRes = await airService.issueCredential({
        authToken: jwt,
        credentialId: process.env.NEXT_PUBLIC_CREDENTIAL_ID!,
        credentialSubject,
        issuerDid: process.env.NEXT_PUBLIC_ISSUER_DID!,
      });
  
      console.log("[handleConnectAndIssue] airService.issueCredential response:", issueRes);
  
      setPlatformStatus((prev) => ({
        ...prev,
        [platform]: { loading: false, success: true, error: null },
      }));
  
      console.log(`[handleConnectAndIssue] Successfully connected and issued credential for ${platform}`);
      handleConnect(platform);
    } catch (err) {
      console.error("[handleConnectAndIssue] Error occurred:", err);
  
      setPlatformStatus((prev) => ({
        ...prev,
        [platform]: {
          loading: false,
          success: false,
          error: err instanceof Error ? err.message : "Unknown error",
        },
      }));
    }
  };
  

  return (
    <Tabs defaultValue="accounts" className="mt-10">
      <TabsList>
        <TabsTrigger value="accounts">Gaming Accounts</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
        <TabsTrigger value="reputation">Reputation</TabsTrigger>
      </TabsList>

      {/* Accounts Tab */}
      <TabsContent value="accounts" className="mt-6 grid gap-6 md:grid-cols-3">
        {platforms.map((p) => (
          <Card key={p}>
            <CardHeader>
              <CardTitle>{p}</CardTitle>
              <CardDescription>
                {connectedAccounts.includes(p)
                  ? `Connected to your ${p} profile`
                  : `Connect your ${p} profile`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {connectedAccounts.includes(p) ? (
                <Button disabled className="w-full">
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Connected
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleConnectAndIssue(p)}
                    disabled={
                      platformStatus[p]?.loading || platformStatus[p]?.success
                    }
                  >
                    {platformStatus[p]?.loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : platformStatus[p]?.success ? (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    ) : (
                      <Link2 className="mr-2 h-4 w-4" />
                    )}
                    {platformStatus[p]?.success ? "Connected" : `Link ${p}`}
                  </Button>
                  {platformStatus[p]?.error && (
                    <p className="text-xs text-red-600 mt-1">
                      {platformStatus[p]?.error}
                    </p>
                  )}

                  {/* Extra Fields */}
                  <div className="mt-2 space-y-1">
                    {(extraFields[p] || []).map((f) => (
                      <div key={f.id} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Field name"
                          value={f.name}
                          onChange={(e) =>
                            updateExtraField(p, f.id, { name: e.target.value })
                          }
                          className="w-1/2 px-2 py-1 border rounded-md focus:ring-2 focus:ring-brand-500"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={f.value}
                          onChange={(e) =>
                            updateExtraField(p, f.id, { value: e.target.value })
                          }
                          className="w-1/2 px-2 py-1 border rounded-md focus:ring-2 focus:ring-brand-500"
                        />
                        <button
                          onClick={() => removeExtraField(p, f.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      {/* Achievements Tab */}
      <TabsContent value="achievements" className="mt-6">
        <div className="grid gap-4">
          {achievements.map((ach, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                {ach}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Reputation Tab */}
      <TabsContent
        value="reputation"
        className="mt-6 grid gap-4 md:grid-cols-3"
      >
        {Object.entries(reputation).map(([key, value]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{key}</CardTitle>
              <CardDescription>{value}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
}
