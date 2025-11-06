"use client";
import { useEffect, useMemo, useRef } from "react";

interface PinInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
}

export default function PinInput({ value, onChange, length = 4, autoFocus, disabled }: PinInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = useMemo(() => {
    const chars = value.split("");
    return Array.from({ length }, (_, i) => chars[i] ?? "");
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, [autoFocus]);

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyDigits = raw.replace(/\D/g, "");
    if (onlyDigits.length === 0) {
      setDigit(index, "");
      return;
    }
    // If paste multiple, distribute
    const chars = onlyDigits.split("");
    for (let i = 0; i < chars.length && index + i < length; i++) {
      setDigit(index + i, chars[i]);
    }
    const nextIndex = Math.min(index + chars.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
    inputsRef.current[nextIndex]?.select();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        setDigit(index, "");
        return;
      }
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        setDigit(index - 1, "");
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          className="h-12 w-12 text-center text-xl rounded-md border bg-background"
          value={digits[i]}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.currentTarget.select()}
          disabled={disabled}
        />
      ))}
    </div>
  );
}


