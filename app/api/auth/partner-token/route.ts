import { NextResponse } from "next/server";
import jwt, { SignOptions } from "jsonwebtoken";

export async function GET() {
  try {
    const privateKey = process.env.PRIVATE_KEY!;
    const partnerId = process.env.PARTNER_ID!;
    const keyId = process.env.KEY_ID!;

    const payload = {
      partnerId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 5 * 60, // 5 min expiry
    };

    // Explicitly type options
    const signOptions: SignOptions & { header: { kid: string; alg: string } } = {
      algorithm: "RS256",
      header: {
        kid: keyId,
        alg: "RS256", 
      },
    };

    const token = jwt.sign(payload, privateKey, signOptions);

    return NextResponse.json({ token });
  } catch (err: any) {
    console.error("JWT error:", err);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
