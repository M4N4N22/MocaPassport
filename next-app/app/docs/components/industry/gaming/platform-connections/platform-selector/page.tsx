"use client";

import { useState } from "react";
import { PlatformSelector } from "@mocapassport/sdk";
import { CodeBlock } from "@/components/CodeBlock";

const demoPlatforms = [
  {
    id: "steam",
    name: "Steam",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
  },
  {
    id: "epic",
    name: "Epic Games",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg",
  },
  {
    id: "riot",
    name: "Riot Games",
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Riot_Games_logo.svg",
  },
];

export default function PlatformSelectorPage() {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="space-y-12 w-fit max-w-5xl">
      <h1 className="text-3xl font-semibold mb-4">PlatformSelector</h1>

      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        <strong className="text-foreground">PlatformSelector</strong> is a
        compact dropdown component for selecting a platform from a predefined
        list. It accepts an array of platform objects and returns the selected
        one via <code>onSelect</code>.
      </p>

      <PlatformSelector
        platforms={demoPlatforms}
        selectedId={selected}
        onSelect={setSelected}
        className="max-w-sm"
      />

      <h2 className="text-lg font-medium">Usage</h2>

      <CodeBlock
        code={`import { PlatformSelector } from "@mocapassport/sdk";`}
      />

      <CodeBlock
        code={`const platforms = [
  { id: "steam", name: "Steam", icon: "/steam.svg" },
  { id: "epic", name: "Epic Games", icon: "/epic.svg" }
];

<PlatformSelector
  platforms={platforms}
  selectedId={selected}
  onSelect={setSelected}
/>`}
      />
    </div>
  );
}
