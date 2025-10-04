"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AirLoginResult } from "@mocanetwork/airkit";

interface DashboardHeaderProps {
  loginCallback?: () => Promise<void>;
  user?: AirLoginResult | null;
}

export default function DashboardHeader({ loginCallback, user }: DashboardHeaderProps) {
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    if (loginCallback) return loginCallback();
    console.warn("[DashboardHeader] No login callback provided");
  };

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback>MP</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your Passport</h1>
          {user?.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <p className="text-foreground/70">Welcome, Gamer!</p>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" size="sm">
                    View Account Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Account Details</DialogTitle>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between gap-8">
                        <span>
                          <strong>Handle / ID:</strong> {user.id}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(user.id);
                            alert("ID copied!");
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <span>
                          <strong>Wallet Address:</strong>{" "}
                          <span className="break-all">{user.abstractAccountAddress}</span>
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(user.abstractAccountAddress || "");
                            alert("Wallet address copied!");
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <p className="text-foreground/70">Sign in to get started</p>
          )}
        </div>
      </div>

      {!user?.isLoggedIn && (
        <Button variant="ghost" onClick={handleLogin}>
          Sign in with AIR
        </Button>
      )}
    </div>
  );
}
