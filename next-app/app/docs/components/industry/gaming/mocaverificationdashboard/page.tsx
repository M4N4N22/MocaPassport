"use client";

import { useState } from "react";
import { MocaVerificationDashboard } from "@mocapassport/sdk";

// Mock
const mockCredentials = [
  {
    name: "Manan",
    age: 24,
    country: "USA",
    connected: ["Steam", "Epic"],
    game: "Valorant",
    rank: "Radiant",
    xp: "3.8 Years",
    verified: false,
  },
  {
    name: "Alex",
    age: 22,
    country: "UK",
    connected: ["Epic"],
    game: "CS2",
    rank: "Global Elite",
    xp: "2 Years",
    verified: false,
  },
];

export default function MocaVerificationDashboardPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const codeString = `<MocaVerificationDashboard records={mockCredentials} onVerify={() => {}} onRevoke={() => {}} />`;

  return (
    <div className="space-y-12 w-fit">
      <h1 className="text-3xl font-semibold mb-4">MocaVerificationDashboard</h1>

      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        The{" "}
        <strong className="text-foreground">MocaVerificationDashboard</strong>{" "}
        allows developers and partners to view, verify, and manage issued gaming
        credentials.
      </p>

      {/* Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            className={`text-lg ${
              activeTab === "preview" ? "font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={`text-lg ${
              activeTab === "code" ? "font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "preview" && (
            <MocaVerificationDashboard
              records={mockCredentials} // No need to map verifiedGames
              onVerify={() => {}}
              onRevoke={() => {}}
            />
          )}
          {activeTab === "code" && (
            <pre className="bg-black text-white p-4 rounded-lg">{codeString}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
