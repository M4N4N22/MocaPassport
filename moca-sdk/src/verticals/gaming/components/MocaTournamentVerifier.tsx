"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/button";
import {
  CheckCircle,
  XCircle,
  Search,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const MOCK_PLAYER_DATA = {
  id: "moca_12345",
  name: "Manan Singh",
  credentials: {
    "rank.valo": "Ascendant 2",
    "rank.cs2": "Master Guardian Elite",
    "experience.years": 3,
  },
};

const TOURNAMENT_CRITERIA = {
  "rank.valo": "Ascendant",
  "experience.years": 2,
};

export function MocaTournamentVerifier() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [result, setResult] = useState<Record<string, boolean>>({});

  const handleVerify = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setVerified(null);

    await new Promise((res) => setTimeout(res, 1800));

    const checks: Record<string, boolean> = {};
    let pass = true;

    for (const [key, requiredValue] of Object.entries(TOURNAMENT_CRITERIA)) {
      const typedKey = key as keyof typeof MOCK_PLAYER_DATA.credentials;
      const playerValue = MOCK_PLAYER_DATA.credentials[typedKey];
      const ok =
        typeof playerValue === "number"
          ? playerValue >= (requiredValue as number)
          : playerValue
              .toLowerCase()
              .includes((requiredValue as string).toLowerCase());
      checks[typedKey] = ok;
      if (!ok) pass = false;
    }

    setResult(checks);
    setVerified(pass);
    setLoading(false);
  };

  return (
    <Card className="p-6 bg-black border border-zinc-800 rounded-2xl shadow-lg text-white">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#FAFF2A]" />
          Tournament Verifier
        </h2>
        <span className="text-zinc-400 text-sm">Moca SDK Demo</span>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Moca ID or email..."
          className="flex-1 bg-zinc-900 border border-zinc-700 text-sm px-3 py-2 rounded-xl text-white placeholder-zinc-500"
        />
        <Button
          onClick={handleVerify}
          disabled={loading}
          className="bg-[#FAFF2A] text-black font-medium px-4 rounded-xl"
        >
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>

      {loading && (
        <div className="text-center py-6 opacity-70">
          <Loader2 className="animate-spin w-8 h-8 mx-auto mb-3 text-[#FAFF2A]" />
          <p className="text-zinc-400 text-sm">Verifying credentials...</p>
        </div>
      )}

      {!loading && verified !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-5 rounded-xl ${
            verified
              ? "bg-green-950/40 border border-green-700"
              : "bg-red-950/40 border border-red-700"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            {verified ? (
              <CheckCircle className="text-green-400 w-6 h-6" />
            ) : (
              <XCircle className="text-red-400 w-6 h-6" />
            )}
            <h3 className="text-lg font-semibold">
              {verified ? "Player Verified ✅" : "Verification Failed ❌"}
            </h3>
          </div>

          <div className="space-y-3">
            {Object.entries(TOURNAMENT_CRITERIA).map(([key, requiredValue]) => {
              const typedKey = key as keyof typeof MOCK_PLAYER_DATA.credentials;
              const ok = result[typedKey];
              const playerValue = MOCK_PLAYER_DATA.credentials[typedKey];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between text-sm bg-zinc-900/60 border border-zinc-800 rounded-lg p-3"
                >
                  <div>
                    <p className="text-zinc-400">{key}</p>
                    <p className="font-medium text-white">
                      Player:{" "}
                      <span className="text-[#FAFF2A]">
                        {String(playerValue)}
                      </span>
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      ok ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {ok ? "Meets Criteria" : "Below Requirement"}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {!loading && verified === null && (
        <div className="text-zinc-500 text-center py-10 text-sm">
          Enter a gamer’s Moca ID to verify eligibility for your tournament.
        </div>
      )}
    </Card>
  );
}
