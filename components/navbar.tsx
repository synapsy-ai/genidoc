"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function NavBar() {
  const { setTheme } = useTheme();
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-center print:hidden">
      <nav className="m-2 flex items-center rounded-full bg-white/50 px-4 py-2 shadow-md backdrop-blur-md dark:bg-slate-900/50">
        <Link className="mr-2 flex space-x-2" href={"/"}>
          <Image alt="SynapsyLogo" height={25} width={25} src={"/logo.svg"} />
          <h2 className="font-bold">GeniDoc</h2>
        </Link>
        <Link href={"/create"}>
          <Button variant="ghost">Create</Button>
        </Link>
        <Link href={"/generations"}>
          <Button variant="ghost">My Generations</Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}
