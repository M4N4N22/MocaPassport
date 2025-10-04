// useAirKit.ts
import { useState, useEffect } from "react";
import { AirService, BUILD_ENV, AirLoginResult } from "@mocanetwork/airkit";

let airService: AirService | null = null; // singleton instance

export function useAirKit() {
  const [user, setUser] = useState<AirLoginResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAirService = async () => {
      if (airService) return; 

      try {
        airService = new AirService({
          partnerId: process.env.NEXT_PUBLIC_AIR_PARTNER_ID!,
        });

        await airService.init({
          buildEnv: BUILD_ENV.SANDBOX,
          enableLogging: true,
          skipRehydration: false,
        });

        setInitialized(true);
        setLoading(false);
      } catch (err) {
        console.error("[AirKit] init error:", err);
        setError(String(err));
        setLoading(false);
      }
    };

    initAirService();
  }, []);

  const login = async () => {
    if (!airService) throw new Error("AirService not initialized");

    const loginResult = await airService.login();
    setUser(loginResult);
    return loginResult;
  };

  return { airService, user, loading, initialized, error, login };
}
