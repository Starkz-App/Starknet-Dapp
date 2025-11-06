"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useTransfer, type WalletData } from "@chipi-stack/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/src/components/ui/use-toast";

import WalletPinDialog from "@/src/components/wallet-pin-dialog";

const formSchema = z.object({
  recipientAddress: z
    .string()
    .min(1, { message: "Recipient address is required" })
    .regex(/^0x[a-fA-F0-9]+$/, {
      message: "Invalid address format",
    }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be greater than 0",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SendUsdcDialog({ wallet }: { wallet: WalletData }) {
  const { toast } = useToast();
  const [showPin, setShowPin] = useState(false);
  const [open, setOpen] = useState(false);
  const [pendingTransfer, setPendingTransfer] = useState<FormValues | null>(
    null
  );
  const { transferAsync, isLoading: isLoadingTransfer } = useTransfer();
  const { getToken } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientAddress: "",
      amount: "0",
    },
  });

  const handleExecuteTransfer = async (
    values: FormValues,
    encryptKey: string
  ) => {
    try {
      const token = await getToken();
      if (!token) {
        toast({ title: "Not authenticated", variant: "destructive" });
        return;
      }

      await transferAsync({
        bearerToken: token,
        params: {
          encryptKey,
          wallet: {
            publicKey: wallet.publicKey,
            encryptedPrivateKey: wallet.encryptedPrivateKey,
          },
          amount: String(values.amount),
          token: "USDC",
          recipient: values.recipientAddress,
        },
      });

      toast({ title: "Transfer executed" });
      form.reset();
      setPendingTransfer(null);
    } catch (err: unknown) {
      toast({ title: err instanceof Error ? err.message : "Error executing transfer", variant: "destructive" });
    }
  };

  const onSubmit = (values: FormValues) => {
    setPendingTransfer(values);
    setShowPin(true);
  };

  const handlePinSubmit = async (pinValue: string) => {
    if (pendingTransfer) {
      await handleExecuteTransfer(pendingTransfer, pinValue);
      setShowPin(false);
      setOpen(false);
    }
  };

  return (
    <>
      <WalletPinDialog
        open={showPin}
        onSubmit={handlePinSubmit}
        onCancel={() => setShowPin(false)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Send USDC</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send USDC</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="recipientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="0x123..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (USDC)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="decimal"
                        type="number"
                        min={0}
                        step="any"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoadingTransfer || !form.formState.isValid}
              >
                Authorize transaction
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}


