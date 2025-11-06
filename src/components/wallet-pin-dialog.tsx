"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import PinInput from "@/src/components/PinInput";

export default function WalletPinDialog({
  open,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  onSubmit: (pin: string) => void;
  onCancel: () => void;
}) {
  const [pin, setPin] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit(pin);
  };

  const disabled = pin?.length !== 4 || isSubmitting;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your PIN</DialogTitle>
          <DialogDescription>
            Your wallet is protected — enter your PIN to continue.
          </DialogDescription>
          <Label>PIN (4 digits)</Label>
          <PinInput value={pin} onChange={setPin} autoFocus />
        </DialogHeader>
        <DialogFooter>
          <Button type="button" disabled={disabled} onClick={handleSubmit}>
            {isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


