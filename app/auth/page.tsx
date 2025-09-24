"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAirKit } from "@/hooks/useAirKit";
import { Wallet, Gamepad2 } from "lucide-react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function AuthPage() {
  const { user, loading, airService } = useAirKit();

  if (loading)
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">Loading AIR Kit...</div>
    );

  // Logged-in UI
  if (user?.isLoggedIn) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome, Gamer!
        </h1>
        <p className="mt-2 text-foreground/70">Your Moca Passport is ready.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
              <CardDescription>Details provided by AIR Kit</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>
                <strong>Account ID:</strong> {user.id}
              </p>

              <p className="flex items-center gap-2">
                <strong>Status:</strong>{" "}
                {user.isLoggedIn ? (
                  <span className="flex items-center text-green-600 gap-1">
                    <AiOutlineCheckCircle /> You are logged in
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 gap-1">
                    <AiOutlineCloseCircle /> Not logged in
                  </span>
                )}
              </p>

              <p className="flex items-center gap-2">
                <strong>MFA Setup:</strong>{" "}
                {user.isMFASetup ? (
                  <span className="flex items-center text-green-600 gap-1">
                    <AiOutlineCheckCircle /> Enabled
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 gap-1">
                    <AiOutlineCloseCircle /> Not Enabled
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>
                Your AIR-linked wallet / account address for on-chain reputation
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="break-all">
                <strong>Address:</strong> {user.abstractAccountAddress}
              </p>
              <Button
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => {
                  if (user.abstractAccountAddress) {
                    navigator.clipboard.writeText(user.abstractAccountAddress);
                    alert("Wallet address copied!");
                  } else {
                    alert("No wallet address available.");
                  }
                }}
              >
                <Wallet className="mr-2 h-4 w-4" /> Copy Address
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // Not logged in UI
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Sign in to Moca Passport
      </h1>
      <p className="mt-1 text-foreground/70">
        Click below to continue with AIR Kit SSO:
      </p>

      <div className="mt-8">
        <Button
          className="w-full max-w-xs bg-red-600 text-white hover:bg-red-500"
          onClick={async () => {
            if (!airService) return;
            try {
              await airService.login(); // useAirKit hook will automatically pick up login
            } catch (err) {
              console.error("Login failed:", err);
            }
          }}
        >
          <Gamepad2 className="mr-2 h-4 w-4" /> Continue with AIR SSO
        </Button>
      </div>
    </main>
  );
}
