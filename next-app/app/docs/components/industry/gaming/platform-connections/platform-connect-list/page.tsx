"use client";

import { useState } from "react";
import Image from "next/image";
import { PlatformConnectList } from "@mocapassport/sdk";
import { CodeBlock } from "@/components/CodeBlock";

export default function PlatformConnectListPage() {
  const [steamConnected, setSteamConnected] = useState(false);
  const [epicConnected, setEpicConnected] = useState(true);

  const platforms = [
    {
      name: "Steam",
      connected: steamConnected,
      onConnect: () => setSteamConnected(!steamConnected),
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
      name: "Epic Games",
      connected: epicConnected,
      variant: "outline",
      onConnect: () => setEpicConnected(!epicConnected),
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
      name: "Riot Games",
      connected: false,
      onConnect: () => alert("Trigger Riot Connect Flow"),
      icon: (
        <div className="relative w-5 h-5">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Riot_Games_logo.svg"
            fill
            alt="Riot"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-12 w-fit max-w-5xl">
      <h1 className="text-3xl font-semibold mb-4">PlatformConnectList</h1>

      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        <strong className="text-foreground">PlatformConnectList</strong> renders
        multiple platform accounts in a responsive grid layout using{" "}
        <code>PlatformCard</code>. It is UI-only and assumes you trigger your
        own login or connect flows.
      </p>

      <PlatformConnectList platforms={platforms} />

      <h2 className="text-lg font-medium">Usage</h2>
      <CodeBlock
        code={`import { PlatformConnectList } from "@mocapassport/sdk";`}
      />
      <CodeBlock
        code={`<PlatformConnectList platforms={[{ name: "Steam", onConnect: () => {} }]} />`}
      />
    </div>
  );
}
