"use client";

import { useState } from "react";
import Image from "next/image";
import { PlatformCard } from "@mocapassport/sdk";
import { CodeBlock } from "@/components/CodeBlock";
// import { platformCardCode } from "./platform-card-codestring";
// import { platformCardSchema } from "./platform-card-schema";

export default function PlatformCardPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "schema">(
    "preview"
  );

  const [steamConnected, setSteamConnected] = useState(false);
  const [epicConnected, setEpicConnected] = useState(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-12 w-fit max-w-5xl ">
      <h1 className="text-3xl font-semibold mb-4">PlatformCard</h1>

      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        <strong className="text-foreground">PlatformCard</strong> visually
        represents one gaming platform account (Steam, Epic, Riot, Xbox, etc.)
        and lets players initiate a connection. It is purely UI — no backend or
        SDK logic is included. Extend or replace actions using{" "}
        <code>onConnect</code>.
      </p>

      {/* Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {["preview", "code", "schema"].map((tab) => (
            <button
              key={tab}
              className={`text-lg ${
                activeTab === tab ? "font-medium" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "preview" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Steam - not connected */}
              <PlatformCard
                name="Steam"
                icon={
                  <div className="relative w-5 h-5">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
                      fill
                      alt="Steam"
                    />
                  </div>
                }
                connected={steamConnected}
                onConnect={() => setSteamConnected(!steamConnected)}
                className=""
              />

              {/* Epic Games - connected */}
              <PlatformCard
                name="Epic Games"
                icon={
                  <div className="relative w-5 h-5">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg"
                      fill
                      alt="Epic Games"
                    />
                  </div>
                }
                connected={epicConnected}
                onConnect={() => setEpicConnected(!epicConnected)}
                variant="outline"
                className=""
              />
            </div>
          )}

          {activeTab === "code" && (
            <CodeBlock
              code={`<PlatformCard name="Steam" onConnect={() => {}} />`}
            />
          )}

          {activeTab === "schema" && (
            <div className="flex flex-col gap-4 rounded-2xl">
              <p>
                <span className="text-muted-foreground">Component ID:</span>{" "}
                <span
                  className="font-mono cursor-pointer underline"
                  onClick={() => copyToClipboard("platform-card-v1")}
                >
                  platform-card-v1
                </span>
              </p>

              <CodeBlock
                code={`{
  name: string,
  icon?: ReactNode,
  connected?: boolean,
  variant?: "solid" | "outline",
  onConnect?: () => void
}`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Usage */}
      <h2 className="text-lg font-medium mb-4">Usage</h2>
      <div className="gap-2 flex flex-col">
        <CodeBlock code={`import { PlatformCard } from "@mocapassport/sdk";`} />
        <CodeBlock
          code={`<PlatformCard name="Steam" onConnect={() => {}} />`}
        />
      </div>
    </div>
  );
}
