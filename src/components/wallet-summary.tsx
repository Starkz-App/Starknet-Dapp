"use client";

import Image from "next/image";
import { useToast } from "@/src/components/ui/use-toast";
import { CopyIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UsdcBalance } from "@/src/components/usdc-balance";

export function WalletSummary({
  normalizedPublicKey,
  walletPublicKey,
}: {
  normalizedPublicKey: string;
  walletPublicKey: string;
}) {
  const { toast } = useToast();
  const shortWallet = normalizedPublicKey
    ? `${normalizedPublicKey.slice(0, 6)}...${normalizedPublicKey.slice(-4)}`
    : "";

  const copyFullWallet = async () => {
    if (!normalizedPublicKey) return;
    await navigator.clipboard.writeText(normalizedPublicKey);
    toast({ title: "Wallet copied to clipboard" });
  };
  return (
    <Card>
      <CardHeader>
        <Button type="button" variant="ghost" onClick={copyFullWallet}>
          {shortWallet}
          <CopyIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle className="flex items-center gap-1">
          Total
          <Image
            src="/usd-coin-usdc-logo.svg"
            alt="USDC"
            width={20}
            height={20}
          />
          <span> USDC balance</span>
        </CardTitle>
        <UsdcBalance walletPublicKey={walletPublicKey} />
      </CardContent>
    </Card>
  );
}


