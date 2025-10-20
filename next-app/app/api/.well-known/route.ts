import { NextResponse } from "next/server";
import * as jose from "jose";
import fs from "fs";
import { join } from "path";

const publicKeyPath = join(process.cwd(), "public.key");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");

const key = await jose.importSPKI(publicKey, "RS256");
const jwk = await jose.exportJWK(key);

jwk.kid = process.env.KEY_ID!;

export async function GET() {
  return NextResponse.json({ keys: [jwk] });
}
