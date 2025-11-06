"use client";

import { useGetTokenBalance } from "@chipi-stack/nextjs";
import { useAuth } from "@clerk/nextjs";

export function UsdcBalance({ walletPublicKey }: { walletPublicKey: string }) {
  const { getToken } = useAuth();
  const { data: usdcBalance } = useGetTokenBalance({
    params: {
      chain: "STARKNET",
      chainToken: "USDC",
      walletPublicKey,
    },
    getBearerToken: getToken,
  });

  return (
    <p className="text-8xl">
      {!isNaN(Number(usdcBalance?.balance))
        ? `$${Number(usdcBalance?.balance).toFixed(2)}`
        : "$0.00"}
    </p>
  );
}


