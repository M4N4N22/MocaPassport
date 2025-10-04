// useAirKit.ts
import { useState, useEffect } from "react";
import { AirService, BUILD_ENV, AirLoginResult } from "@mocanetwork/airkit";

let airService: AirService | null = null;

export function useAirKit() {
  const [user, setUser] = useState<AirLoginResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAir = async () => {
      console.log("[AirKit] Initializing AirService...");

      try {
        airService = new AirService({
          partnerId: process.env.NEXT_PUBLIC_AIR_PARTNER_ID!,
        });
        console.log("[AirKit] AirService instance created:", airService);

        await airService.init({
          buildEnv: BUILD_ENV.SANDBOX,
          enableLogging: true,
          skipRehydration: false,
        });
        console.log("[AirKit] AirService initialized");

        const loginResult = await airService.login();
        console.log("[AirKit] Login result:", loginResult);

        setUser(loginResult);
      } catch (err) {
        console.error("[AirKit] Error during initialization/login:", err);
      } finally {
        setLoading(false);
        console.log("[AirKit] Loading finished");
      }
    };

    initAir();
  }, []);

  return { user, loading, airService };
}
