// useAirKit.ts
import { useState, useEffect } from "react";
import { AirService, BUILD_ENV, AirLoginResult } from "@mocanetwork/airkit";

let airService: AirService | null = null;

export function useAirKit() {
  const [user, setUser] = useState<AirLoginResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAir = async () => {
      airService = new AirService({
        partnerId: process.env.NEXT_PUBLIC_AIR_PARTNER_ID!,
      });

      await airService.init({
        buildEnv: BUILD_ENV.SANDBOX,
        enableLogging: true,
        skipRehydration: false,
      });

      const loginResult = await airService.login();
      console.log("AIR login result:", loginResult); 
      setUser(loginResult);
      setLoading(false);
    };

    initAir().catch(console.error);
  }, []);

  return { user, loading, airService };
}
