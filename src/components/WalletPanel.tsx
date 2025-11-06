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

  // Store the actual token once ready
  const [actualToken, setActualToken] = useState<string | null>(null);
  
  // Get and store the token when ready
  useEffect(() => {
    const fetchToken = async () => {
      if (tokenReady && user) {
        try {
          const token = await getToken();
          console.log("Token fetched and stored, length:", token?.length || 0);
          setActualToken(token);
        } catch (error) {
          console.error("Error fetching token:", error);
          setActualToken(null);
        }
      } else {
        setActualToken(null);
      }
    };
    fetchToken();
  }, [tokenReady, user, getToken]);

  // Create a simple token getter that returns the stored token
  const tokenGetter = useMemo(() => {
    return async () => {
      console.log("Token getter called - actualToken available:", !!actualToken);
      if (!actualToken) {
        console.error("No token available in getter");
        throw new Error("No authentication token available");
      }
      return actualToken;
    };
  }, [actualToken]);

  // Only call the hook when we have a token ready
  const shouldFetchWallet = tokenReady && !!user && !!actualToken;
  
  // Create a token getter that always returns a valid token or throws a clear error
  const tokenGetter = useMemo(() => {
    if (!shouldFetchWallet || !actualToken) {
      // Return a function that throws immediately if not ready
      // This prevents the hook from trying to make a request
      return async () => {
        throw new Error("Wallet fetch not ready - token not available");
      };
    }
    
    // Return a function that always returns the stored token
    return async () => {
      console.log("Token getter called - returning stored token");
      return actualToken;
    };
  }, [shouldFetchWallet, actualToken]);
  
  // Always call the hook (required by React rules)
  // The hook should handle errors gracefully
  const walletQueryResult = useGetWallet({ 
    getBearerToken: tokenGetter,
    // Try to pass enabled option if the hook supports it (React Query pattern)
    ...(shouldFetchWallet ? {} : { enabled: false } as any)
  });
  
  const { data: wallet, isLoading, error, refetch } = walletQueryResult;

  // Debug logging
  useEffect(() => {
    if (authLoaded && userLoaded) {
      console.log("=== Wallet Panel Debug ===");
      console.log("User:", user?.id);
      console.log("Token ready:", tokenReady);
      console.log("Actual token stored:", !!actualToken);
      console.log("Should fetch wallet:", shouldFetchWallet);
      console.log("Wallet data:", wallet);
      console.log("Is loading:", isLoading);
      console.log("Error:", error);
      if (error) {
        console.log("Error details:", {
          message: (error as any)?.message,
          status: (error as any)?.status,
          statusCode: (error as any)?.statusCode,
          response: (error as any)?.response,
        });
      }
      console.log("Raw wallet object:", JSON.stringify(wallet, null, 2));
    }
  }, [wallet, isLoading, error, tokenReady, actualToken, shouldFetchWallet, authLoaded, userLoaded, user]);

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

  // Check if error is a 401 (authentication issue)
  const isUnauthorizedError = error && (
    (error as any)?.status === 401 ||
    (error as any)?.response?.status === 401 ||
    (error as any)?.statusCode === 401 ||
    String(error).includes("401") ||
    String(error).toLowerCase().includes("unauthorized") ||
    String(error).toLowerCase().includes("missing or invalid authorization")
  );

  // Check if error is a 404 (no wallet) vs actual error
  const isNotFoundError = error && !isUnauthorizedError && (
    (error as any)?.status === 404 || 
    (error as any)?.response?.status === 404 ||
    (error as any)?.statusCode === 404 ||
    String(error).includes("404") ||
    String(error).toLowerCase().includes("not found") ||
    String(error).toLowerCase().includes("no wallet")
  );

  // Check if error is due to missing input (token not ready)
  const isInputRequiredError = error && !isUnauthorizedError && (
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
          
          {tokenReady && error && isUnauthorizedError && (
            <div className="space-y-2">
              <p className="text-sm text-destructive">Authentication error. Please try refreshing the page.</p>
              <Button variant="outline" size="sm" onClick={() => {
                // Force token refresh and retry
                setTokenReady(false);
                setTimeout(async () => {
                  try {
                    const token = await getToken();
                    setTokenReady(!!token);
                    if (token) {
                      refetch();
                    }
                  } catch (err) {
                    console.error("Error refreshing token:", err);
                  }
                }, 500);
              }}>Retry Authentication</Button>
            </div>
          )}
          
          {tokenReady && error && !isUnauthorizedError && !isNotFoundError && !isInputRequiredError && (
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
