"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/src/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"

export interface ComboboxItem {
  value: string;
  label: string;
}

export interface ComboboxProps {
  items: ComboboxItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Combobox({ items, value, onChange, placeholder = "Select an item..." }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  // Error checking and logging
  React.useEffect(() => {
    if (!Array.isArray(items)) {
      console.error('Combobox items is not an array:', items);
    }
  }, [items]);

  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? safeItems.find((item) => item.value === value)?.label ?? placeholder
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {safeItems.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  onChange(item.value === value ? "" : item.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
