"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTopCards from "@/components/dashboard/DashboardTopCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { useAirKit } from "@/hooks/useAirKit";

export default function DashboardPage() {
  const { user, loading } = useAirKit();
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [proofs, setProofs] = useState<number>(0);
  const [reputation, setReputation] = useState({
    Sportsmanship: 74,
    Teamplay: 68,
    Consistency: 62,
  });

  const handleConnect = (platform: string) => {
    if (!connectedAccounts.includes(platform)) {
      setConnectedAccounts([...connectedAccounts, platform]);
      setAchievements([...achievements, `${platform} Verified Player`]);
      setProofs(proofs + 1);
      setReputation({
        Sportsmanship: reputation.Sportsmanship + 2,
        Teamplay: reputation.Teamplay + 2,
        Consistency: reputation.Consistency + 2,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin h-10 w-10 text-red-600" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <DashboardHeader />
      {user?.isLoggedIn && (
        <>
          <DashboardTopCards
            reputation={reputation}
            achievements={achievements}
            proofs={proofs}
          />
          <DashboardTabs
            connectedAccounts={connectedAccounts}
            handleConnect={handleConnect}
            achievements={achievements}
            reputation={reputation}
          />
        </>
      )}
    </main>
  );
}
