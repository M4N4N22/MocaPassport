// app/api/generate-jwt/route.ts
import { NextResponse } from "next/server";
import * as jose from "jose";

const privateKey = process.env.PRIVATE_KEY!.replace(/\\n/g, "\n");
const partnerId = process.env.PARTNER_ID!;
const keyId = process.env.KEY_ID!;

export async function GET() {
  try {
    console.log("[Generate JWT] Generating partner JWT...");

    const alg = "RS256";
    const key = await jose.importPKCS8(privateKey, alg);

    const jwt = await new jose.SignJWT({ partnerId })
      .setProtectedHeader({ alg, kid: keyId })
      .setExpirationTime("5m") // 5 minutes validity
      .sign(key);

    console.log("[Generate JWT] JWT generated");

    return NextResponse.json({ success: true, jwt });
  } catch (err) {
    console.error("[Generate JWT] Error generating JWT:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
