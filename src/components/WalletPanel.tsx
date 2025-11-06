"use client";
import { useAuth, SignedIn, useUser } from "@clerk/nextjs";
import { useMemo, useEffect, useState } from "react";
import { CreateWalletDialog } from "@/src/components/create-wallet.dialog";
import { WalletSummary } from "@/src/components/wallet-summary";
import SendUsdcDialog from "@/src/components/send-usdc-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useGetWallet } from "@chipi-stack/nextjs";

export default function WalletPanel() {
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [tokenReady, setTokenReady] = useState(false);
  
  // Ensure we have a token before fetching wallet
  useEffect(() => {
    const checkToken = async () => {
      if (authLoaded && userLoaded && user) {
        try {
          const token = await getToken();
          setTokenReady(!!token);
        } catch (error) {
          console.error("Error getting token:", error);
          setTokenReady(false);
        }
      }
    };
    checkToken();
  }, [authLoaded, userLoaded, user, getToken]);

  // Create a stable token getter that ensures we have a valid token
  const tokenGetter = useMemo(() => {
    return async () => {
      // Wait for token to be ready
      if (!tokenReady || !user) {
        // Wait a bit and retry if still not ready
        await new Promise(resolve => setTimeout(resolve, 100));
        if (!tokenReady || !user) {
          throw new Error("Authentication not ready");
        }
      }
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("No authentication token available");
        }
        return token;
      } catch (error) {
        console.error("Error getting token in wallet fetch:", error);
        throw error;
      }
    };
  }, [tokenReady, user, getToken]);

  // Always call the hook (required by React rules)
  // The hook should handle empty token gracefully or we'll handle the error
  const { data: wallet, isLoading, error, refetch } = useGetWallet({ 
    getBearerToken: tokenGetter
  });

  // Debug logging
  useEffect(() => {
    if (authLoaded && userLoaded) {
      console.log("=== Wallet Panel Debug ===");
      console.log("User:", user?.id);
      console.log("Token ready:", tokenReady);
      console.log("Wallet data:", wallet);
      console.log("Is loading:", isLoading);
      console.log("Error:", error);
      console.log("Raw wallet object:", JSON.stringify(wallet, null, 2));
    }
  }, [wallet, isLoading, error, tokenReady, authLoaded, userLoaded, user]);

  const normalizedWallet = useMemo(() => {
    if (!wallet) return null;
    
    // Try various possible field names from the API
    const publicKey = (wallet as any)?.publicKey 
      ?? (wallet as any)?.walletPublicKey 
      ?? (wallet as any)?.address
      ?? (wallet as any)?.wallet?.publicKey
      ?? (wallet as any)?.wallet?.walletPublicKey;
    
    const normalizedPublicKey = (wallet as any)?.normalizedPublicKey 
      ?? (wallet as any)?.walletPublicKey 
      ?? (wallet as any)?.address
      ?? (wallet as any)?.wallet?.normalizedPublicKey
      ?? (wallet as any)?.wallet?.walletPublicKey
      ?? publicKey;
    
    const encryptedPrivateKey = (wallet as any)?.encryptedPrivateKey 
      ?? (wallet as any)?.walletEncryptedPrivateKey 
      ?? (wallet as any)?.encryptedKey
      ?? (wallet as any)?.privateKey
      ?? (wallet as any)?.wallet?.encryptedPrivateKey
      ?? (wallet as any)?.wallet?.walletEncryptedPrivateKey;
    
    const result = { 
      publicKey, 
      normalizedPublicKey, 
      encryptedPrivateKey,
      ...wallet 
    };
    
    console.log("Normalized wallet:", result);
    return result as { 
      publicKey?: string; 
      normalizedPublicKey?: string; 
      encryptedPrivateKey?: string;
      [key: string]: any;
    };
  }, [wallet]);

  const hasWallet = useMemo(() => {
    if (!normalizedWallet) return false;
    const hasKey = !!(normalizedWallet.publicKey || normalizedWallet.normalizedPublicKey);
    console.log("Has wallet check:", hasKey, normalizedWallet);
    return hasKey;
  }, [normalizedWallet]);

  const handleWalletCreated = async () => {
    // Wait a bit for the backend to process, then refetch
    setTimeout(() => {
      console.log("Refetching wallet after creation...");
      refetch();
    }, 2000);
  };

  // Don't render until auth is loaded
  if (!authLoaded || !userLoaded) {
    return (
      <SignedIn>
        <Card className="glass-card border-0">
          <CardContent>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </SignedIn>
    );
  }

  // Check if error is a 404 (no wallet) vs actual error
  const isNotFoundError = error && (
    (error as any)?.status === 404 || 
    (error as any)?.response?.status === 404 ||
    String(error).includes("404") ||
    String(error).includes("not found") ||
    String(error).includes("No wallet")
  );

  // Check if error is due to missing input (token not ready)
  const isInputRequiredError = error && (
    String(error).includes("Input is required") ||
    String(error).includes("required") ||
    (!tokenReady && error)
  );

  return (
    <SignedIn>
      <Card className="glass-card border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Wallet</CardTitle>
          {hasWallet && (
            <Button variant="outline" onClick={() => {
              console.log("Manual refresh triggered");
              refetch();
            }}>Refresh</Button>
          )}
        </CardHeader>
        <CardContent>
          {!tokenReady && (
            <p className="text-sm text-muted-foreground">Initializing...</p>
          )}
          
          {tokenReady && isLoading && (
            <p className="text-sm text-muted-foreground">Loading wallet...</p>
          )}
          
          {tokenReady && error && !isNotFoundError && !isInputRequiredError && (
            <div className="space-y-2">
              <p className="text-sm text-destructive">Error loading wallet: {String(error)}</p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
            </div>
          )}
          
          {tokenReady && !isLoading && (isNotFoundError || isInputRequiredError || (!error && !hasWallet)) && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                No wallet found. Create one to start using USDC.
              </p>
              <CreateWalletDialog onSuccess={handleWalletCreated} />
            </div>
          )}
          
          {tokenReady && !isLoading && !error && hasWallet && normalizedWallet && (
            <div className="space-y-4">
              <WalletSummary
                normalizedPublicKey={normalizedWallet.normalizedPublicKey || normalizedWallet.publicKey || ""}
                walletPublicKey={normalizedWallet.publicKey || normalizedWallet.normalizedPublicKey || ""}
              />
              <SendUsdcDialog wallet={normalizedWallet as any} />
            </div>
          )}
        </CardContent>
      </Card>
    </SignedIn>
  );
}
