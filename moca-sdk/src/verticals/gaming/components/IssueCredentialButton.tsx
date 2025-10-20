"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { issueGamingCredential, GamingCredentialSubject } from "../issueCredential";

interface IssueCredentialButtonProps {
  subject: GamingCredentialSubject;
  onSuccess?: (issuedCredential: any) => void;
  onError?: (error: string) => void;
  label?: string;
  className?: string;
}

export default function IssueCredentialButton({
  subject,
  onSuccess,
  onError,
  label = "Issue Credential",
  className,
}: IssueCredentialButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const result = await issueGamingCredential(subject);

    if (result.success) {
      setSuccess(true);
      onSuccess?.(result.issuedCredential);
    } else {
      setError(result.error || "Unknown error");
      onError?.(result.error || "Unknown error");
    }

    setLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading || success}
      className={className}
    >
      {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
      {success && <CheckCircle2 className="w-4 h-4 mr-2" />}
      {error && <AlertCircle className="w-4 h-4 mr-2" />}
      {success ? "Issued!" : error ? "Retry" : label}
    </Button>
  );
}
