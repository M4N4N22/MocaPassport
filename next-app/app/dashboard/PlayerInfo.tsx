"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const GAME_RANKS = {
  cs2: ["Silver", "Gold Nova", "Master Guardian", "Global Elite"],
  valo: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"],
};

export type GameKey = keyof typeof GAME_RANKS;

type PlayerInfoProps = {
  onBack: () => void;
  onNext: (formData: {
    game: GameKey | "";
    rank: string;
    name: string;
    age: string;
    country: string;
  }) => void;
};

export default function PlayerInfo({ onBack, onNext }: PlayerInfoProps) {
  const [form, setForm] = useState({
    game: "" as GameKey | "",
    rank: "",
    name: "",
    age: "",
    country: "",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-zinc-400 mb-4">Tell us a bit about your gaming profile.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm mb-2 font-medium block">Game</label>
          <select
            className="rounded-lg px-3 py-2 w-full bg-card"
            value={form.game}
            onChange={(e) => setForm({ ...form, game: e.target.value as GameKey })}
          >
            <option value="">Select Game</option>
            <option value="cs2">CS2</option>
            <option value="valo">Valorant</option>
          </select>
        </div>

        <div>
          <label className="text-sm mb-2 font-medium block">Rank / Experience</label>
          <select
            className="rounded-lg px-3 py-2 w-full bg-card"
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
          <label className="text-sm mb-2 font-medium block">Full Name</label>
          <input
            type="text"
            className="rounded-lg px-3 py-2 w-full bg-card"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm mb-2 font-medium block">Age</label>
          <input
            type="number"
            min={12}
            max={100}
            className="rounded-lg px-3 py-2 w-full bg-card"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm mb-2 font-medium block">Country</label>
          <input
            type="text"
            className="rounded-lg px-3 py-2 w-full bg-card"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>Go Back</Button>

        <Button
          variant="secondary"
          onClick={() => onNext(form)}
          disabled={!form.game || !form.rank || !form.name || !form.age}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
