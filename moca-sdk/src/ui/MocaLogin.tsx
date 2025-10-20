"use client";

import React, { useState } from "react";
import { useMocaIdentity } from "../core/useMocaIdentity";
import { Button } from "../components/ui/button";
import { Loader2, Wallet } from "lucide-react";

export type MocaLoginButtonProps = {
  label?: string;
  onLoginSuccess?: (user: any) => void;
  CustomButton?: React.ComponentType<{
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
  }>;
};

export function MocaLoginButton({
  label = "Login with Moca",
  onLoginSuccess,
  CustomButton,
}: MocaLoginButtonProps) {
  const { user, login, loading, initialized } = useMocaIdentity();
  const [localLoading, setLocalLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLocalLoading(true);
      const u = await login();
      onLoginSuccess?.(u);
    } catch (err) {
      console.error("[MocaLoginButton] login error:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  const Btn = CustomButton || Button;

  if (loading || !initialized) {
    return (
      <Btn disabled>
        <Loader2 className="w-4 h-4 animate-spin mr-2 flex items-center" /> Initializing...
      </Btn>
    );
  }

  if (user) return null; // hide login button if user is already logged in

  return (
    <Btn onClick={handleLogin} disabled={localLoading}>
      {localLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Connecting...
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4 mr-2" /> {label}
        </>
      )}
    </Btn>
  );
}
