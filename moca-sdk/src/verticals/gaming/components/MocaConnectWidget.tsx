"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/Card";
import { CheckCircle2, Trophy, Globe2, Plug } from "lucide-react";
import IssueCredentialButton from "./IssueCredentialButton";
import { MocaLoginButton } from "../../../ui/MocaLogin";
import { useMocaIdentity } from "../../../core/useMocaIdentity";

const PLATFORMS = [
  {
    id: "steam",
    name: "Steam",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    color: "#1b2838",
  },
  {
    id: "epic",
    name: "Epic Games",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg",
    color: "#444",
  },
] as const;

const GAME_RANKS = {
  valo: [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Immortal",
    "Radiant",
  ],
  cs2: [
    "Silver",
    "Gold Nova",
    "Master Guardian",
    "Legendary Eagle",
    "Supreme",
    "Global Elite",
  ],
} as const;

type GameKey = keyof typeof GAME_RANKS;

export interface MocaConnectWidgetForm {
  game: GameKey | "";
  rank: string;
  name: string;
  age: string | number;
  country: string;
}

export interface MocaConnectWidgetProps {
  defaultCountry?: string;
  connected?: string[];
  onConnect?: (platformId: string) => Promise<void> | void;
  onIssue?: (
    data: { connected: string[] } & MocaConnectWidgetForm
  ) => Promise<void> | void;
}

export function MocaConnectWidget({
  defaultCountry = "USA",
  onConnect,
  onIssue,
  connected: initialConnected = [],
}: MocaConnectWidgetProps) {
  const { user, login, loading: loginLoading } = useMocaIdentity();
  const [step, setStep] = useState(1);
  const [connected, setConnected] = useState<string[]>(initialConnected);
  const [loading, setLoading] = useState<string | null>(null);
  const [form, setForm] = useState<MocaConnectWidgetForm>({
    game: "",
    rank: "",
    name: "",
    age: "",
    country: defaultCountry,
  });

  const handleConnect = async (provider: string) => {
    setLoading(provider);
    try {
      if (onConnect) await onConnect(provider);
      setConnected((prev) => [...prev, provider]);
    } finally {
      setLoading(null);
    }
  };

  const canContinue = connected.includes("steam") || connected.includes("epic");

  const handleSubmit = async () => {
    if (onIssue) await onIssue({ connected, ...form });
  };

  return (
    <Card className="p-10 rounded-2xl shadow-xl w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-white flex items-center gap-2 mb-6">
        Create your MOCA Gaming Passport
      </h2>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <p className="text-zinc-400 mb-4">
            Connect at least{" "}
            <span className="text-foreground">one platform</span> (Steam or
            Epic) to verify your gaming identity.
          </p>

          <div className="flex flex-col gap-4">
            {PLATFORMS.map((p) => {
              const isConnected = connected.includes(p.id);
              return (
                <div
                  key={p.id}
                  className={`rounded-xl p-6 border flex justify-between items-center text-center transition ${
                    isConnected ? "" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img src={p.icon} alt={p.name} className="w-10 h-10" />
                    <h3 className=" font-medium">{p.name}</h3>
                  </div>
                  {isConnected ? (
                    <div className="flex items-center gap-1   text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Connected
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => handleConnect(p.id)}
                      className="flex items-center "
                    >
                      <Plug className="w-4 h-4 mr-1" />
                      {loading === p.id ? "Connecting..." : "Connect"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex  mt-6 w-full ">
            <Button
              variant="secondary"
              onClick={() => setStep(2)}
              disabled={!canContinue}
              className=""
            >
              Continue
            </Button>
          </div>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-zinc-400 mb-4">
            Tell us a bit about your gaming profile.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 font-medium block">
                Game
              </label>
              <select
                className="   rounded-lg px-3 py-2 w-full bg-card"
                value={form.game}
                onChange={(e) =>
                  setForm({ ...form, game: e.target.value as GameKey })
                }
              >
                <option value="">Select Game</option>
                <option value="cs2">CS2</option>
                <option value="valo">Valorant</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 font-medium block">
                Rank / Experience
              </label>
              <select
                className="  rounded-lg px-3 py-2 w-full bg-card"
                disabled={!form.game}
                value={form.rank}
                onChange={(e) => setForm({ ...form, rank: e.target.value })}
              >
                <option value="">Select Rank</option>
                {form.game &&
                  GAME_RANKS[form.game].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 font-medium block">
                Full Name
              </label>
              <input
                type="text"
                className="   rounded-lg px-3 py-2 w-full bg-card"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 font-medium block">
                Age
              </label>
              <input
                type="number"
                min={12}
                max={100}
                className=" bg-card  rounded-lg px-3 py-2 w-full"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-muted-foreground mb-2 font-medium block">
                Country
              </label>
              <input
                type="text"
                className="  rounded-lg px-3 py-2 w-full bg-card"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(1)} className="">
              Go Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              variant="secondary"
              disabled={!form.game || !form.rank || !form.name || !form.age}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className=" p-6 rounded-xl border">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            Review & Issue Credential
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <div className="bg-card rounded-lg p-4 flex flex-col">
              <span className="text-sm text-muted-foreground mb-2 font-medium block">
                Connected
              </span>
              <span className="text-white font-semibold">
                {connected.join(", ")}
              </span>
            </div>

            <div className="bg-card rounded-lg p-4 flex flex-col">
              <span className="text-sm text-muted-foreground mb-2 font-medium block">
                Game
              </span>
              <span className="text-white font-semibold ">
                {form.game.toUpperCase()}
              </span>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col">
              <span className="text-sm text-muted-foreground mb-2 font-medium block">
                Rank
              </span>
              <span className="text-white font-semibold">{form.rank}</span>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col">
              <span className="text-sm text-muted-foreground mb-2 font-medium block">
                Name
              </span>
              <span className="text-white font-semibold">{form.name}</span>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col">
              <span className="text-sm text-muted-foreground mb-2 font-medium block">
                Age
              </span>
              <span className="text-white font-semibold">{form.age}</span>
            </div>

            <div className="bg-card rounded-lg p-4 flex flex-col">
              <span className="text-sm text-muted-foreground mb-2 font-medium block">
                Country
              </span>
              <span className="text-white font-semibold">{form.country}</span>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              Go Back
            </Button>
            {!user ? (
              <MocaLoginButton
                label="Login with Moca"
                onLoginSuccess={() => {
                  console.log("User logged in, can now issue credentials");
                }}
              />
            ) : (
              <IssueCredentialButton
                subject={{
                  connected: true,
                  game: form.game,
                  rank: form.rank,
                  name: form.name,
                  age: Number(form.age),
                  country: form.country,
                }}
                label="Issue Gaming Credential"
                onSuccess={(cred) => console.log("Issued:", cred)}
                onError={(err) => console.error("Error:", err)}
              />
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
