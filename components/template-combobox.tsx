"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Template } from "@/lib/template";
import { ScrollArea } from "./ui/scroll-area";

export function TemplateCombobox(props: {
  templates: Template[];
  setTemp: Function;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-[300px] justify-between"
        >
          {value
            ? props.templates.find(
                (template) => template.name.toLowerCase() === value
              )?.name
            : "Select templates..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search template..." />
          <CommandEmpty>No template found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[200px]">
              {props.templates.map((template) => (
                <CommandItem
                  key={template.name}
                  value={template.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    props.setTemp(currentValue === value ? null : template);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === template.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {template.name}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
