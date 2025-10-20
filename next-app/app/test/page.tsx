"use client";

import { useState } from "react";
import {
  MocaLogin,
  MocaConnectWidget,
  MocaGamingPassport,
  MocaVerificationDashboard,
  MocaTournamentVerifier
} from "@mocapassport/sdk";

export default function TestPage() {
  const [user, setUser] = useState<any>(null); // Mock logged in user
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([
    "First Blood - Valorant",
    "Headshot Master - CS2",
  ]);
  const [reputation, setReputation] = useState<Record<string, number>>({
    Sportsmanship: 80,
    Teamplay: 90,
    Consistency: 75,
  });

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleConnect = async (platform: string) => {
 
    console.log("Connecting", platform);
    await new Promise((res) => setTimeout(res, 1000)); 
    console.log("Connected", platform);
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-10 p-10 bg-black text-white">
      <h1 className="text-3xl font-bold text-[#FAFF2A]">Moca SDK Test Page</h1>

      {/* Step 1: Login 
      {!user && <MocaLogin label="Login with Moca" />}*/}

      {/* Step 2: Connect gaming accounts */}

  
   

   
    </div>
  );
}
