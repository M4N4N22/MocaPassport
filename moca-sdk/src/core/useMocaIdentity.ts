import { useState, useEffect, useCallback } from "react";
import { getAirService } from "./airServiceSingleton";
import { AirLoginResult } from "@mocanetwork/airkit";

export type MocaUser = { handle: string; walletAddress: string; token: string };

export function useMocaIdentity() {
  const [user, setUser] = useState<MocaUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [airService, setAirService] = useState<any | null>(null); // <-- store after init

  const init = useCallback(async () => {
    if (typeof window === "undefined") return; // safeguard for SSR

    try {
      const service = await getAirService();
      await service.init({
        buildEnv: "sandbox",
        enableLogging: true,
        skipRehydration: false,
      });
      setAirService(service);
      setInitialized(true);
    } catch (err: any) {
      console.error("[MocaIdentity] Init Error:", err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async () => {
    if (!airService) throw new Error("AirService not initialized yet");
    const result = (await airService.login()) as AirLoginResult;

    const mocaUser: MocaUser = {
      handle: result.id ?? "",
      walletAddress: result.abstractAccountAddress ?? "",
      token: result.token ?? "",
    };

    localStorage.setItem("moca_user", JSON.stringify(mocaUser));
    setUser(mocaUser);
    return mocaUser;
  }, [airService]);

  const logout = useCallback(() => {
    localStorage.removeItem("moca_user");
    setUser(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safe
    init();

    const stored = localStorage.getItem("moca_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("moca_user");
      }
    }
  }, [init]);

  return {
    airService, // now safely null until client init
    user,
    loading,
    initialized,
    error,
    login,
    logout,
  };
}
