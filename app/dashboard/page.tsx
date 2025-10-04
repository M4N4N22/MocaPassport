"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTopCards from "@/components/dashboard/DashboardTopCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { useAirKit } from "@/hooks/useAirKit";

export default function DashboardPage() {
  const { user, initialized, loading, error, login } = useAirKit();
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

  const handleLoginClick = async () => {
    if (!initialized) {
      console.warn("[DashboardPage] AirService not initialized yet");
      return;
    }

    try {
      await login();
      console.log("[DashboardPage] Login successful:", user);
    } catch (err) {
      console.error("[DashboardPage] Login failed:", err);
    }
  };

  if (loading || !initialized) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin h-10 w-10 text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-600">
        <p>Error initializing AirKit: {error}</p>
        <button onClick={handleLoginClick} className="ml-4 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <DashboardHeader loginCallback={handleLoginClick} user={user} />
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
            user={user}
          />
        </>
      )}
    </main>
  );
}
