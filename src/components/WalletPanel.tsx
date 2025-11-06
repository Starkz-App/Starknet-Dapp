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

  const normalizedWallet = useMemo(() => {
    const publicKey = (wallet as any)?.publicKey ?? (wallet as any)?.walletPublicKey;
    const normalizedPublicKey = (wallet as any)?.normalizedPublicKey ?? (wallet as any)?.walletPublicKey ?? publicKey;
    const encryptedPrivateKey = (wallet as any)?.encryptedPrivateKey ?? (wallet as any)?.walletEncryptedPrivateKey ?? (wallet as any)?.encryptedKey;
    return { publicKey, normalizedPublicKey, encryptedPrivateKey } as { publicKey?: string; normalizedPublicKey?: string; encryptedPrivateKey?: string };
  }, [wallet]);

  const hasWallet = !!normalizedWallet.publicKey;

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
          {!isLoading && hasWallet && (
            <div className="space-y-4">
              <WalletSummary
                normalizedPublicKey={normalizedWallet.normalizedPublicKey as string}
                walletPublicKey={normalizedWallet.publicKey as string}
              />
              <SendUsdcDialog wallet={normalizedWallet as any} />
            </div>
          )}
        </CardContent>
      </Card>
    </SignedIn>
  );
}
