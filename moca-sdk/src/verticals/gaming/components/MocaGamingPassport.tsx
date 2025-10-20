"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../../../components/ui/Card";
import { getGameIcon } from "../../../utils/getGameIcon";

export interface IssuedCredential {
  connected: string[];
  game: string;
  rank: string;
  name: string;
  age: string | number;
  country: string;
  xp?: string;
}

interface MocaGamingPassportProps {
  issuedCredential?: IssuedCredential;
}

export function MocaGamingPassport({
  issuedCredential,
}: MocaGamingPassportProps) {
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mapToPassportCreds = () => {
      if (!issuedCredential) return [];

      const mapped: any[] = [];

      // Game Rank credential
      mapped.push({
        id: `${issuedCredential.game}_rank`,
        label: `${issuedCredential.game} Rank`,
        value: issuedCredential.rank,
        game: issuedCredential.game,
        icon: getGameIcon(issuedCredential.game),
      });

      // Optional: Total XP
      mapped.push({
        id: "xp",
        label: "Total Gaming XP",
        value: issuedCredential.xp || "N/A",
        game: "Cross-Platform",
        icon: "https://cdn-icons-png.freepik.com/256/8078/8078524.png?semt=ais_white_label",
        issuedBy: "Moca Gaming Passport",
      });

      // Connected platforms
      issuedCredential.connected.forEach((platform) => {
        mapped.push({
          id: `${platform}_connected`,
          label: `${platform} Connected`,
          value: "verified",
          game: platform,
          icon: getGameIcon(platform),
          issuedBy: "Moca Gaming Passport",
        });
      });

      return mapped;
    };

    setLoading(true);
    const creds = mapToPassportCreds();
    setCredentials(creds);
    setLoading(false);
  }, [issuedCredential]);

  return (
    <Card className="rounded-2xl shadow w-full max-w-4xl border text-card-foreground">
      {/* Header */}
      <div className="flex flex-col p-6  border-b gap-4">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-semibold">Your Gaming Passport</h2>
          <span className="bg-primary/10 text-primary py-2 px-4 rounded-full text-xs">
            Verified by Moca
          </span>
        </div>

        {/* User Info */}
        <div className="flex justify-between items-center">
          {issuedCredential && (
            <div className="flex sm:flex-row gap-4 ">
              <div className="">
                <span className="text-xs text-muted-foreground">Name</span>
                <p className="font-medium text-foreground">
                  {issuedCredential.name}
                </p>
              </div>
              <div className="">
                <span className="text-xs text-muted-foreground">Age</span>
                <p className="font-medium text-foreground">
                  {issuedCredential.age}
                </p>
              </div>
              <div className="">
                <span className="text-xs text-muted-foreground">Country</span>
                <p className="font-medium text-foreground">
                  {issuedCredential.country}
                </p>
              </div>
            </div>
          )}
          {!loading && credentials.length > 0 && (
            <motion.div className="   flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-2 sm:gap-0">
              <div>
                Passport Status:{" "}
                <span className="font-medium text-foreground">Active</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {/* Loading / Empty */}
      {loading ? (
        <div className="flex flex-col items-center py-10 opacity-70">
          <div className="animate-spin border-2 border-border border-t-foreground rounded-full w-10 h-10 mb-3" />
          <p className="text-sm text-muted-foreground">
            Fetching credentials...
          </p>
        </div>
      ) : credentials.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No verified credentials found.
          <p className="text-sm mt-1">Connect a game to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-1 p-6">
          {credentials.map((cred) => (
            <motion.div
              key={cred.id}
              whileHover={{ scale: 1.03 }}
              className="flex justify-between p-4 rounded-xl bg-card items-center"
            >
              <div className="flex items-center gap-3 ">
                <div className="bg-background p-4 rounded-xl">
                  <img
                    src={cred.icon}
                    alt={cred.game}
                    className="w-8 h-8 opacity-90"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{cred.game}</p>
                  <h3 className="font-semibold text-foreground">
                    {cred.label}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <span className="  text-primary bg-background rounded-full px-4 py-1">
                  {cred.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
