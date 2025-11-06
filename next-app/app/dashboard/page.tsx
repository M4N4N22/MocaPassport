"use client";

import { useState } from "react";
import {
  MocaThemeProvider,
  MocaLoginButton,
  MocaConnectWidget,
  PlatformCard,
  GameSelector,
  RankSelector,
  CredentialPreview,
} from "@mocapassport/sdk";
import ThemeColorChooser, { ThemeColors } from "@/components/ThemeColorChooser"; // <-- import

const GAMES = [
  { id: "valorant", name: "Valorant" },
  { id: "cs2", name: "CS2" },
  { id: "fortnite", name: "Fortnite" },
  { id: "game", name: "game" },
  { id: "game1", name: "game2" },
  { id: "game3", name: "game4" },
];

const RANKS = {
  cs2: [
    { id: "silver", name: "Silver" },
    { id: "gold-nova", name: "Gold Nova" },
    { id: "master-guardian", name: "Master Guardian" },
    { id: "global-elite", name: "Global Elite" },
    { id: "global-demo", name: "DEMO" },
  ],
  valo: [
    { id: "iron", name: "Iron" },
    { id: "bronze", name: "Bronze" },
    { id: "silver", name: "Silver" },
    { id: "gold", name: "Gold" },
    { id: "platinum", name: "Platinum" },
    { id: "diamond", name: "Diamond" },
    { id: "immortal", name: "Immortal" },
    { id: "radiant", name: "Radiant" },
  ],
};

export default function DemoDashboard() {
  const [step, setStep] = useState(1);
  const [steamConnected, setSteamConnected] = useState(false);
  const [riotConnected, setRiotConnected] = useState(false);
  const [demo1, setdemo1] = useState(false);
  const [demo2, setdemo2] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | undefined>();
  const [selectedRank, setSelectedRank] = useState<string | undefined>();

  const userLoggedIn = true;

  // Theme color state (controlled by ThemeColorChooser)
  const [themeColors, setThemeColors] = useState<ThemeColors>({
    accent: "#e32affa7",
    accentFg: "#000000",
    accentHover: "#e32affa7",
    surface: "#111111",
    surfaceMuted: "#1a1a1a",
    border: "#333333",
    muted: "#a1a1a1",
    text: "#ffffff",
  });

  return (
    <MocaThemeProvider theme="dark" colors={themeColors}>
      <div className="h-screen flex flex-col md:flex-row px-6 py-10 justify-center items-center ">
        {/* ===== LEFT SIDE — THEME COLOR PICKER ===== */}
        <div className="  p-20">
          <ThemeColorChooser colors={themeColors} onChange={setThemeColors} />
        </div>

        {/* ===== RIGHT SIDE — MAIN DASHBOARD FLOW ===== */}
        <div className="w-1/2 flex flex-col items-center gap-8 border rounded-3xl p-20">
          {/* Steps */}
          <div className="w-full max-w-md">
            {/* STEP 1 — LOGIN */}
            {step === 1 && !userLoggedIn && (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">
                  Sign in to continue
                </h2>
                <MocaLoginButton
                  onLoginSuccess={() => {
                    setStep(2);
                  }}
                />
              </div>
            )}

            {/* STEP 2 — CONNECT ACCOUNTS */}
            {step === 1 && userLoggedIn && (
              <>
                <h2 className="text-xl font-semibold text-center mb-6">
                  Connect Your Gaming Accounts
                </h2>

                <div className="space-y-3">
                  <PlatformCard
                    name="Steam"
                    connected={steamConnected}
                    onConnect={() => setSteamConnected(!steamConnected)}
                  />
                  <PlatformCard
                    name="Riot Games"
                    connected={riotConnected}
                    onConnect={() => setRiotConnected(!riotConnected)}
                  />
                  <PlatformCard
                    name="Riot"
                    connected={demo1}
                    onConnect={() => setdemo1(!demo1)}
                  />
                  <PlatformCard
                    name="Epic Games"
                    connected={demo2}
                    onConnect={() => setdemo2(!demo2)}
                  />
                </div>

                {(steamConnected || riotConnected) && (
                  <button
                    className="mt-6 w-full py-3 bg-white text-black rounded-lg font-medium"
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </button>
                )}
              </>
            )}

            {/* STEP 3 — SELECT GAME */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-center mb-4">
                  Select Your Main Game
                </h2>
                <GameSelector
                  layout="dropdown"
                  games={GAMES}
                  selectedId={selectedGame}
                  onSelect={setSelectedGame}
                />
                {selectedGame && (
                  <button
                    className="mt-6 w-full py-3 bg-white text-black rounded-lg font-medium"
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </button>
                )}
              </>
            )}

            {/* STEP 4 — SELECT RANK */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-center mb-4">
                  Select Your Rank
                </h2>
                <RankSelector
                  layout="dropdown"
                  ranks={RANKS[selectedGame as keyof typeof RANKS] ?? []}
                  selectedId={selectedRank}
                  onSelect={setSelectedRank}
                />

                {selectedRank && (
                  <button
                    className="mt-6 w-full py-3 bg-white text-black rounded-lg font-medium"
                    onClick={() => setStep(4)}
                  >
                    Continue
                  </button>
                )}
              </>
            )}

            {/* STEP 5 — PREVIEW */}
            {step === 4 && (
              <>
                <CredentialPreview
                  title="Your MOCA Gaming Passport"
                  description="Review your gaming identity before issuing"
                  groups={[
                    {
                      label: "Game Profile",
                      data: { Game: selectedGame, Rank: selectedRank },
                    },
                    {
                      label: "Connected Platforms",
                      data: {
                        Steam: steamConnected ? "Connected" : "Not Connected",
                        Riot: riotConnected ? "Connected" : "Not Connected",
                      },
                    },
                  ]}
                />

                <div className="flex justify-between mt-6">
                  <button
                    className="py-2 px-4 border rounded-md"
                    onClick={() => setStep(3)}
                  >
                    Back
                  </button>
                  <button
                    className="py-2 px-4 bg-white text-black rounded-md font-medium"
                    onClick={() => alert("Issue credential API call here")}
                  >
                    Issue Credential
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MocaThemeProvider>
  );
}
