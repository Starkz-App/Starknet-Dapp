"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/src/components/ui/use-toast";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
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
import PinInput from "@/src/components/PinInput";
import { CheckCircleIcon } from "lucide-react";
import { useCreateWallet } from "@chipi-stack/nextjs";
import { useAuth } from "@clerk/nextjs";

const FormSchema = z
  .object({
    pin: z
      .string()
      .regex(/^\d{4}$/, { message: "Enter exactly 4 digits" }),
    confirmPin: z
      .string()
      .regex(/^\d{4}$/, { message: "Enter exactly 4 digits" }),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs don't match",
    path: ["confirmPin"],
  });

export function CreateWalletDialog() {
  const { toast } = useToast();
  const { getToken, userId: clerkUserId } = useAuth();
  const {
    createWalletAsync,
    isLoading,
    isSuccess,
    data: walletDetails,
  } = useCreateWallet();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const token = await getToken();
    if (!token || !clerkUserId) {
      toast({ title: "Authentication failed", variant: "destructive" });
      return;
    }

    try {
      await createWalletAsync({
        params: {
          encryptKey: data.pin,
          externalUserId: clerkUserId,
        },
        bearerToken: token,
      });
      toast({ title: "Wallet created successfully!" });
      form.reset();
    } catch (error) {
      toast({ title: "Failed to create wallet", variant: "destructive" });
      console.error("Wallet creation error:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Wallet</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Wallet</DialogTitle>
          <DialogDescription>
            Create a PIN to protect your wallet and funds
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter PIN</FormLabel>
                    <FormControl>
                      <PinInput value={field.value} onChange={field.onChange} autoFocus />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">4 digits. Keep this PIN safe.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm PIN</FormLabel>
                    <FormControl>
                      <PinInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full"
              >
                {isLoading
                  ? "Creating..."
                  : isSuccess
                    ? "Wallet Created Successfully!"
                    : "Create Wallet"}
              </Button>
            </form>
          </Form>
        </DialogHeader>

        <DialogFooter>
          {walletDetails && (
            <div className="w-full border rounded-md p-3 space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircleIcon className="h-4 w-4" />
                <span className="font-medium">Wallet Created Successfully!</span>
              </div>
              <div>
                <p>Transaction Hash:</p>
                <span className="break-all">{walletDetails.txHash}</span>
              </div>

              <div>
                <p>Wallet Public Key:</p>
                <span className="break-all">{walletDetails.walletPublicKey}</span>
              </div>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


