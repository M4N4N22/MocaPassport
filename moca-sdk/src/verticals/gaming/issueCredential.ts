// src/verticals/gaming/issueCredential.ts
"use client";

import { getAirService } from "../../core/airServiceSingleton";
import type { AirService } from "@mocanetwork/airkit";

export interface GamingCredentialSubject {
  connected: boolean; // true if at least one platform is verified
  game: string; // e.g., Valorant, CS2
  rank: string; // player's rank
  name: string;
  age: number;
  country: string;
  xp?: string; // optional
  id?: string; // optional, will auto-generate if missing
}

export interface IssueResult {
  success: boolean;
  issuedCredential?: any; // returned from AirService
  error?: string;
}

/**
 * Remove undefined/null fields and ensure required fields exist.
 */
function sanitizeCredentialSubject(subject: GamingCredentialSubject) {
  return {
    connected: subject.connected,
    country: subject.country,
    game: subject.game,
    name: subject.name,
    rank: subject.rank,
    age: subject.age,
    id: subject.id || `urn:uuid:${crypto.randomUUID()}`,
    xp: subject.xp || "0 Years",
  };
}

/**
 * Frontend wrapper that fully handles credential issuance via the AIR Kit widget.
 * Devs just pass the credential subject (partial allowed).
 */
export async function issueGamingCredential(
  subject: GamingCredentialSubject
): Promise<IssueResult> {
  try {
    // 1️⃣ Initialize AirService (singleton)
    const airService: AirService = await getAirService();

    // 2️⃣ Fetch JWT from backend (keep private key safe!)
    const res = await fetch("/api/generate-jwt");
    const data = await res.json();
    if (!data.success || !data.jwt) throw new Error("Failed to fetch JWT");

    const jwt = data.jwt;

    // 3️⃣ Prepare sanitized credential subject
    const credentialSubject = sanitizeCredentialSubject(subject);

    // 4️⃣ Issue credential using the AIR Kit widget internally
    const issuedCredential = await airService.issueCredential({
      authToken: jwt,
      issuerDid: process.env.NEXT_PUBLIC_ISSUER_DID!,
      credentialId: process.env.NEXT_PUBLIC_CREDENTIAL_ID!,
      credentialSubject,
    });

    return { success: true, issuedCredential };
  } catch (err: any) {
    console.error("[Gaming SDK] issueGamingCredential error:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}
