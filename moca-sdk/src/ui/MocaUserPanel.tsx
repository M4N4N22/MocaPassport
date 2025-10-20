"use client";

import React, { useState } from "react";
import { useMocaIdentity } from "../core/useMocaIdentity";
import { Button } from "../components/ui/button";
import { LogOut, Eye, EyeOff } from "lucide-react";

export type MocaUserPanelProps = {
  showUserInfo?: boolean;
  CustomButton?: React.ComponentType<{
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
  }>;
};

export function MocaUserPanel({
  showUserInfo = true,
  CustomButton,
}: MocaUserPanelProps) {
  const { user, logout } = useMocaIdentity();
  const [revealHandle, setRevealHandle] = useState(false);
  const [revealWallet, setRevealWallet] = useState(false);

  const Btn = CustomButton || Button;
  const hideStars = (str: string) => "●".repeat(str.length);

  if (!user) return null; 

  return (
    <div className="flex flex-col items-center gap-4">
      {showUserInfo && (
        <div className="flex flex-col text-sm border p-6 rounded-3xl w-64">
          <h4 className="text-xs font-semibold text-muted-foreground mb-4">
            Account Details
          </h4>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-muted-foreground text-[10px] mb-1">
                Handle / ID
              </p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">
                  {revealHandle ? user.handle : hideStars(user.handle)}
                </p>
                <button
                  onClick={() => setRevealHandle(!revealHandle)}
                  className="ml-2 text-muted-foreground"
                  title={revealHandle ? "Hide handle" : "Show handle"}
                >
                  {revealHandle ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-[10px] mb-1">
                Wallet Address
              </p>
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-foreground">
                  {revealWallet
                    ? user.walletAddress
                    : hideStars(user.walletAddress)}
                </p>
                <button
                  onClick={() => setRevealWallet(!revealWallet)}
                  className="ml-2 text-muted-foreground"
                  title={revealWallet ? "Hide wallet" : "Show wallet"}
                >
                  {revealWallet ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
