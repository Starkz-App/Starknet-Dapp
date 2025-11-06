"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCreateWallet } from "@chipi-stack/nextjs";

export default function CreateWallet() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { createWalletAsync , isLoading} = useCreateWallet();
  const [encryptKey, setEncryptKey] = useState("");
  const [error, serError]= useState("");


  const handleCreateWallet = async () => {
    if (!encryptKey) {
      setError("Please enter an encryption key");
      return;
    }

    try {
      setError("");
      setSuccess("");
      const token = await getToken();

      await createWalletAsync({
        params: {
          encryptKey,
          externalUserId: user.id,
        },
        bearerToken: token || "",
      });
      

      console.log('createWalletResponse', response);
      setEncryptKey("");
    } catch (error) {
      setError(error.message || "Failed to create wallet");
      console.error("Error creating wallet:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">Create Wallet</h2>
      
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}
      
      <div className="space-y-2">
        <input
          type="password"
          placeholder="Enter encryption key"
          value={encryptKey}
          onChange={(e) => setEncryptKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <button
          onClick={handleCreateWallet}
          disabled={isProcessing || !encryptKey}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 w-full"
        >
          {isLoading ? "Creating..." : "Create Wallet"}
        </button>
      </div>
    </div>
  );
}