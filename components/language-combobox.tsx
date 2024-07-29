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
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./ui/scroll-area";

const languages = [
  { value: "abap", label: "Abap" },
  { value: "aes", label: "Aes" },
  { value: "apex", label: "Apex" },
  { value: "bat", label: "Bat" },
  { value: "bicep", label: "Bicep" },
  { value: "brainfuck", label: "Brainfuck" },
  { value: "c", label: "C" },
  { value: "cameligo", label: "Cameligo" },
  { value: "clike", label: "Clike" },
  { value: "clojure", label: "Clojure" },
  { value: "coffeescript", label: "Coffeescript" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "csp", label: "Csp" },
  { value: "css", label: "Css" },
  { value: "dart", label: "Dart" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "ecl", label: "Ecl" },
  { value: "elixir", label: "Elixir" },
  { value: "erlang", label: "Erlang" },
  { value: "flow9", label: "Flow9" },
  { value: "fsharp", label: "Fsharp" },
  { value: "freemarker2", label: "Freemarker2" },
  { value: "go", label: "Go" },
  { value: "graphql", label: "Graphql" },
  { value: "handlebars", label: "Handlebars" },
  { value: "hcl", label: "Hcl" },
  { value: "html", label: "Html" },
  { value: "ini", label: "Ini" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "Javascript" },
  { value: "json", label: "Json" },
  { value: "jsx", label: "Jsx" },
  { value: "julia", label: "Julia" },
  { value: "kotlin", label: "Kotlin" },
  { value: "less", label: "Less" },
  { value: "lex", label: "Lex" },
  { value: "lexon", label: "Lexon" },
  { value: "liquid", label: "Liquid" },
  { value: "livescript", label: "Livescript" },
  { value: "lua", label: "Lua" },
  { value: "m3", label: "M3" },
  { value: "markdown", label: "Markdown" },
  { value: "mips", label: "Mips" },
  { value: "msdax", label: "Msdax" },
  { value: "mysql", label: "Mysql" },
  { value: "nginx", label: "Nginx" },
  { value: "pascal", label: "Pascal" },
  { value: "pascaligo", label: "Pascaligo" },
  { value: "perl", label: "Perl" },
  { value: "php", label: "Php" },
  { value: "pla", label: "Pla" },
  { value: "plaintext", label: "Plaintext" },
  { value: "postiats", label: "Postiats" },
  { value: "powerquery", label: "Powerquery" },
  { value: "powershell", label: "Powershell" },
  { value: "proto", label: "Proto" },
  { value: "pug", label: "Pug" },
  { value: "python", label: "Python" },
  { value: "qsharp", label: "Qsharp" },
  { value: "r", label: "R" },
  { value: "razor", label: "Razor" },
  { value: "redis", label: "Redis" },
  { value: "redshift", label: "Redshift" },
  { value: "restructuredtext", label: "Restructuredtext" },
  { value: "ruby", label: "Ruby" },
  { value: "rust", label: "Rust" },
  { value: "sb", label: "Sb" },
  { value: "scala", label: "Scala" },
  { value: "scheme", label: "Scheme" },
  { value: "scss", label: "Scss" },
  { value: "shell", label: "Shell" },
  { value: "sol", label: "Sol" },
  { value: "sparql", label: "Sparql" },
  { value: "sql", label: "Sql" },
  { value: "st", label: "St" },
  { value: "stylus", label: "Stylus" },
  { value: "swift", label: "Swift" },
  { value: "systemverilog", label: "Systemverilog" },
  { value: "tcl", label: "Tcl" },
  { value: "toml", label: "Toml" },
  { value: "tsx", label: "Tsx" },
  { value: "twig", label: "Twig" },
  { value: "typescript", label: "Typescript" },
  { value: "vb", label: "Vb" },
  { value: "vbscript", label: "Vbscript" },
  { value: "verilog", label: "Verilog" },
  { value: "xml", label: "Xml" },
  { value: "yaml", label: "Yaml" },
];

export function LanguageComboBox(props: {
  setLang: Function;
  defaultValue?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.defaultValue || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? languages.find((language) => language.value === value)?.label
            : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              <ScrollArea className="h-[200px]">
                {languages.map((language) => (
                  <CommandItem
                    key={language.value}
                    value={language.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      props.setLang(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === language.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {language.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
