"use client";

import { useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/button";
import { motion } from "framer-motion";
import { Loader2, Trash2 } from "lucide-react";
import { getGameIcon } from "../../../utils/getGameIcon";

export interface VerificationRecord {
  connected: string[];
  game: string;
  rank: string;
  name: string;
  age: number | string;
  country: string;
  xp: string;
  verified?: boolean;
}

interface MocaVerificationDashboardProps {
  records?: VerificationRecord[];
  onVerify?: (record: VerificationRecord) => Promise<void> | void;
  onRevoke?: (record: VerificationRecord) => Promise<void> | void;
}

export function MocaVerificationDashboard({
  records = [],
  onVerify,
  onRevoke,
}: MocaVerificationDashboardProps) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [data, setData] = useState<VerificationRecord[]>(records);

  const handleVerify = async (index: number) => {
    setLoadingIndex(index);
    try {
      if (onVerify) await onVerify(data[index]);
      setData((prev) =>
        prev.map((r, i) => (i === index ? { ...r, verified: true } : r))
      );
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleRevoke = async (index: number) => {
    if (onRevoke) await onRevoke(data[index]);
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="rounded-2xl shadow w-full max-w-4xl border text-card-foreground">
      {/* Header */}
      <div className="flex flex-col p-6 border-b gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Verification Dashboard</h2>
          <span className="bg-primary/10 text-primary py-2 px-4 rounded-full text-xs">
            Managed by Moca
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Verify or revoke gamer credentials issued through Moca Gaming
          Passport.
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center py-10 opacity-70">
          <p className="text-sm text-muted-foreground">No credentials found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 p-6 w-fit">
          {data.map((record, index) => (
            <motion.div
              key={`${record.name}-${record.game}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-3 p-6 rounded-3xl border"
            >
              {/* Row 3 — Connected Platforms */}
              <div className="flex flex-wrap gap-2 mb-2">
                {record.connected.map((plat) => (
                  <span
                    key={plat}
                    className="text-xs px-3 py-1 rounded-full bg-muted font-medium"
                  >
                    {plat} Account Connected
                  </span>
                ))}
              </div>

              {/* Row 1 — Name, Age, Country */}
              <div className="flex flex-wrap gap-12 p-6 bg-card rounded-3xl">
                <div>
                  <span className="text-xs text-muted-foreground">Name</span>
                  <p className="font-medium text-foreground">{record.name}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Age</span>
                  <p className="font-medium text-foreground">{record.age}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Country</span>
                  <p className="font-medium text-foreground">
                    {record.country}
                  </p>
                </div>
              </div>

              <div className="space-y-6 bg-card rounded-3xl p-6">
                {/* Row 2 — Game, Rank, XP */}
                <div className="flex flex-wrap gap-12 items-center">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Game</p>
                      <p className="font-medium text-foreground">
                        {record.game}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">Rank</span>
                    <p className="font-medium text-foreground">{record.rank}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">XP</span>
                    <p className="font-medium text-foreground">{record.xp}</p>
                  </div>
                </div>

                {/* Row 4 — Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  {!record.verified ? (
                    loadingIndex === index ? (
                      <Loader2 className="animate-spin w-5 h-5 text-primary" />
                    ) : (
                      <Button
                        onClick={() => handleVerify(index)}
                        className=" font-medium px-4 rounded-xl w-full bg-foreground"
                      >
                        <span className="text-background">Verify</span>
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={() => handleRevoke(index)}
                      className="bg-muted font-medium px-4 rounded-xl w-full"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
