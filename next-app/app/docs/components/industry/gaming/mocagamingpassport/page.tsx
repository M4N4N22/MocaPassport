'use client';

import { useState } from 'react';
import { MocaGamingPassport } from '@mocapassport/sdk';
import { CodeBlock } from '@/components/CodeBlock';

export default function MocaGamingPassportPage() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const codeString = `"use client";

  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";
  import { Card } from "../../../components/ui/Card";
  import { getGameIcon } from "../../../utils/getGameIcon";
  
  export interface IssuedCredential {
    connected: string[];
    game: string;
    rank: string;
    name: string;
    age: string | number;
    country: string;
    xp?: string;
  }
  
  interface MocaGamingPassportProps {
    issuedCredential?: IssuedCredential;
  }
  
  export function MocaGamingPassport({
    issuedCredential,
  }: MocaGamingPassportProps) {
    const [credentials, setCredentials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const mapToPassportCreds = () => {
        if (!issuedCredential) return [];
  
        const mapped: any[] = [];
  
        // Game Rank credential
        mapped.push({
            id: \`\${issuedCredential.game}_rank\`,
            label: \`\${issuedCredential.game} Rank\`,
          value: issuedCredential.rank,
          game: issuedCredential.game,
          icon: getGameIcon(issuedCredential.game),
        });
  
        // Optional: Total XP
        mapped.push({
          id: "xp",
          label: "Total Gaming XP",
          value: issuedCredential.xp || "N/A",
          game: "Cross-Platform",
          icon: "https://cdn-icons-png.freepik.com/256/8078/8078524.png?semt=ais_white_label",
          issuedBy: "Moca Gaming Passport",
        });
  
        // Connected platforms
        issuedCredential.connected.forEach((platform) => {
          mapped.push({
            id: \`\${platform}_connected\`,
            label: \`\${platform} Connected\`,
            value: "Connected",
            game: platform,
            icon: getGameIcon(platform),
            issuedBy: "Moca Gaming Passport",
          });
        });
  
        return mapped;
      };
  
      setLoading(true);
      const creds = mapToPassportCreds();
      setCredentials(creds);
      setLoading(false);
    }, [issuedCredential]);
  
    return (
      <Card className="rounded-2xl shadow w-full max-w-4xl border text-card-foreground">
        {/* Header */}
        <div className="flex flex-col p-6  border-b gap-4">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-semibold">Your Gaming Passport</h2>
            <span className="bg-primary/10 text-primary py-2 px-4 rounded-full text-xs">
              Verified by Moca
            </span>
          </div>
  
          {/* User Info */}
          <div className="flex justify-between items-center">
            {issuedCredential && (
              <div className="flex sm:flex-row gap-4 ">
                <div className="">
                  <span className="text-xs text-muted-foreground">Name</span>
                  <p className="font-medium text-foreground">
                    {issuedCredential.name}
                  </p>
                </div>
                <div className="">
                  <span className="text-xs text-muted-foreground">Age</span>
                  <p className="font-medium text-foreground">
                    {issuedCredential.age}
                  </p>
                </div>
                <div className="">
                  <span className="text-xs text-muted-foreground">Country</span>
                  <p className="font-medium text-foreground">
                    {issuedCredential.country}
                  </p>
                </div>
              </div>
            )}
            {!loading && credentials.length > 0 && (
              <motion.div className="   flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-2 sm:gap-0">
                <div>
                  Passport Status:{" "}
                  <span className="font-medium text-foreground">Active</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        {/* Loading / Empty */}
        {loading ? (
          <div className="flex flex-col items-center py-10 opacity-70">
            <div className="animate-spin border-2 border-border border-t-foreground rounded-full w-10 h-10 mb-3" />
            <p className="text-sm text-muted-foreground">
              Fetching credentials...
            </p>
          </div>
        ) : credentials.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No verified credentials found.
            <p className="text-sm mt-1">Connect a game to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3 p-6">
            {credentials.map((cred) => (
              <motion.div
                key={cred.id}
                whileHover={{ scale: 1.03 }}
                className="flex justify-between p-4 rounded-xl border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={cred.icon}
                    alt={cred.game}
                    className="w-8 h-8 opacity-90"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">{cred.game}</p>
                    <h3 className="font-semibold text-foreground">
                      {cred.label}
                    </h3>
                  </div>
                </div>
  
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-base">{cred.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
  
      </Card>
    );
  }
  `;

  // Mock credential data for preview
  const mockCredential = {
    connected: ['Steam', 'Epic'],
    game: 'Valorant',
    rank: 'Radiant',
    name: 'Manan',
    age: 24,
    country: 'USA',
    xp: '3.8 Years',
  };

  return (
    <div className="space-y-12 ">
      {/* Page Header */}
      <h1 className="text-3xl font-semibold mb-4">MocaGamingPassport</h1>
      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        The <strong className="text-foreground">MocaGamingPassport</strong> component displays a
        user’s verified gaming credentials, such as ranks, XP, and connected platforms.
        It provides a visually rich overview of a player's gaming achievements.
      </p>

      {/* Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            className={`text-lg ${activeTab === 'preview' ? 'font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className={`text-lg ${activeTab === 'code' ? 'font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'preview' && <MocaGamingPassport issuedCredential={mockCredential} />}
          {activeTab === 'code' && <CodeBlock code={codeString} />}
        </div>
      </div>

      {/* Usage */}
      <h2 className="text-lg font-medium mb-4">Usage</h2>
      <div className="gap-2 flex flex-col">
        <CodeBlock code={`import { MocaGamingPassport } from "@mocapassport/sdk";`} />
        <CodeBlock code={`<MocaGamingPassport issuedCredential={mockCredential} />`} />
      </div>
    </div>
  );
}
