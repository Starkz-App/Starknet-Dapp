"use client";
import { useAuth, SignedIn } from "@clerk/nextjs";
import { useMemo } from "react";
import { CreateWalletDialog } from "@/src/components/create-wallet.dialog";
import { WalletSummary } from "@/src/components/wallet-summary";
import SendUsdcDialog from "@/src/components/send-usdc-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useGetWallet } from "@chipi-stack/nextjs";

export default function WalletPanel() {
  const { getToken } = useAuth();
  const { data: wallet, isLoading, refetch } = useGetWallet({ getBearerToken: getToken });

  const hasWallet = useMemo(() => !!wallet?.publicKey, [wallet]);

  return (
    <SignedIn>
      <Card className="glass-card border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Wallet</CardTitle>
          {!hasWallet ? (
            <CreateWalletDialog onSuccess={() => refetch()} />
          ) : (
            <Button variant="outline" onClick={() => refetch()}>Refresh</Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading wallet...</p>}
          {!isLoading && !hasWallet && (
            <p className="text-sm text-muted-foreground">No wallet found. Create one to start using USDC.</p>
          )}
          {!isLoading && hasWallet && (
            <div className="space-y-4">
              <WalletSummary
                normalizedPublicKey={wallet.normalizedPublicKey}
                walletPublicKey={wallet.publicKey}
              />
              <SendUsdcDialog wallet={wallet} />
            </div>
          )}
        </CardContent>
      </Card>
    </SignedIn>
  );
}
