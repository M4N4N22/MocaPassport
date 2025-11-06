"use client";

import { useState } from "react";
import { GameSelector } from "@mocapassport/sdk";
import { CodeBlock } from "@/components/CodeBlock";

const demoGames = [
  {
    id: "valorant",
    name: "Valorant",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/07/Valorant_logo.svg",
  },
  {
    id: "cs2",
    name: "CS2",
    icon: "https://seeklogo.com/images/C/counter-strike-2-logo-05F907B7D4-seeklogo.com.png",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/Fortnite_F_lettermark_logo.png",
  },
];

export default function GameSelectorPage() {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="space-y-12 w-fit max-w-5xl">
      <h1 className="text-3xl font-semibold mb-4">GameSelector</h1>

      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        The <strong>GameSelector</strong> component lets players choose which game
        they are setting up a profile for. It supports a grid or dropdown layout.
      </p>

      {/* Preview */}
      <GameSelector
        games={demoGames}
        selectedId={selected}
        onSelect={setSelected}
        layout="dropdown"
        className="max-w-sm"
      />

      <h2 className="text-lg font-medium">Usage</h2>
      <CodeBlock code={`import { GameSelector } from "@mocapassport/sdk";`} />
      <CodeBlock
        code={`<GameSelector games={[{ id: "valorant", name: "Valorant" }]} onSelect={(id) => {}} />`}
      />
    </div>
  );
}
