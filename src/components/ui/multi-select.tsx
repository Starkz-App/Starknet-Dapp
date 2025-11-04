"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { CheckIcon } from "lucide-react"

type Option = {
  label: string
  value: string
}

type MultiSelectProps = {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select items...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = React.useCallback(
    (item: string) => {
      onChange(selected.filter((i) => i !== item))
    },
    [onChange, selected],
  )

  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : []

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selected.length > 0 ? (
            <div className="flex gap-1 flex-wrap">
              {selected.map((item) => (
                <Badge variant="secondary" key={item} className="mr-1">
                  {safeOptions.find((option) => option.value === item)?.label || item}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {safeOptions.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value],
                  )
                  setOpen(true)
                }}
              >
                <CheckIcon
                  className={cn("mr-2 h-4 w-4", selected.includes(option.value) ? "opacity-100" : "opacity-0")}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
