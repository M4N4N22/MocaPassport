"use client";

import { useState } from "react";
import Image from "next/image";
import { PlatformConnectionStatus } from "@mocapassport/sdk";
import { CodeBlock } from "@/components/CodeBlock";

export default function PlatformConnectionStatusPage() {
  const [steamConnected, setSteamConnected] = useState(true);
  const [epicConnected, setEpicConnected] = useState(false);

  const platforms = [
    {
      id: "steam",
      name: "Steam",
      connected: steamConnected,
      icon: (
        <div className="relative w-5 h-5">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
            fill
            alt="Steam"
          />
        </div>
      ),
    },
    {
      id: "epic",
      name: "Epic Games",
      connected: epicConnected,
      icon: (
        <div className="relative w-5 h-5">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg"
            fill
            alt="Epic Games"
          />
        </div>
      ),
    },
    {
      id: "riot",
      name: "Riot Games",
      connected: false,
      icon: (
        <div className="relative w-5 h-5">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Riot_Games_logo.svg"
            fill
            alt="Riot Games"
          />
        </div>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState<"preview" | "code" | "schema">(
    "preview"
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-12 w-fit max-w-5xl">
      <h1 className="text-3xl font-semibold mb-4">PlatformConnectionStatus</h1>

      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        The <strong className="text-foreground">PlatformConnectionStatus</strong>{" "}
        component provides a lightweight way to show how many gaming accounts
        the user has connected. It is UI-only and supports a{" "}
        <code>children</code> render prop for full customization.
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
            <div className="space-y-4">
              {/* Default UI */}
              <PlatformConnectionStatus platforms={platforms} />

              {/* Custom UI via render-prop */}
              <PlatformConnectionStatus platforms={platforms}>
                {({ connectedCount, total }) => (
                  <div className="text-sm text-green-400">
                    {connectedCount} / {total} linked
                  </div>
                )}
              </PlatformConnectionStatus>
            </div>
          )}

          {activeTab === "code" && (
            <CodeBlock
              code={`<PlatformConnectionStatus platforms={[{ id: "steam", name: "Steam", connected: true }]} />`}
            />
          )}

          {activeTab === "schema" && (
            <div className="flex flex-col gap-4 rounded-2xl">
              <p>
                <span className="text-muted-foreground">Component ID:</span>{" "}
                <span
                  className="font-mono cursor-pointer underline"
                  onClick={() =>
                    copyToClipboard("platform-connection-status-v1")
                  }
                >
                  platform-connection-status-v1
                </span>
              </p>

              <CodeBlock
                code={`{
  platforms: {
    id: string,
    name: string,
    connected: boolean,
    icon?: ReactNode
  }[],
  children?: ({ connectedCount, total, platforms }) => ReactNode
}`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Usage */}
      <h2 className="text-lg font-medium mb-4">Usage</h2>
      <div className="gap-2 flex flex-col">
        <CodeBlock
          code={`import { PlatformConnectionStatus } from "@mocapassport/sdk";`}
        />
        <CodeBlock
          code={`<PlatformConnectionStatus platforms={[{ id: "steam", name: "Steam", connected: true }]} />`}
        />
      </div>
    </div>
  );
}
