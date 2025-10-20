// src/core/airServiceSingleton.ts
import { AirService, BUILD_ENV } from "@mocanetwork/airkit";

let airService: AirService | null = null;
let initialized = false;

export async function getAirService(): Promise<AirService> {
  if (airService && initialized) return airService;

  const partnerId = process.env.NEXT_PUBLIC_AIR_PARTNER_ID;
  if (!partnerId) throw new Error("[AirService] Missing NEXT_PUBLIC_AIR_PARTNER_ID");

  airService = new AirService({ partnerId });

  console.log("[SDK] Initializing AirService...");
  await airService.init({
    buildEnv: BUILD_ENV.SANDBOX,
    enableLogging: true,
    skipRehydration: false,
  });

  initialized = true;
  console.log("[SDK] AirService initialized successfully");
  return airService;
}
