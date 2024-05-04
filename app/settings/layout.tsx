"use client";

import { SettingsNavBar } from "@/components/settings-navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="sm:mt-16 mt-2">
      <section className="grid grid-cols-[auto,1fr] items-center space-x-2 w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="sm:hidden ml-2">
              <Menu width={16} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SettingsNavBar
              currentPage={pathname.split("/")[pathname.split("/").length - 1]}
            />
          </SheetContent>
        </Sheet>
        <div className="flex sm:space-x-2 items-center">
          <Settings className="sm:block hidden" />
          <div>
            <h3 className="font-bold text-2xl">Settings</h3>
            <p>Customize Synapsy Genidoc.</p>
          </div>
        </div>
      </section>
      <Separator className="my-2" />
      <section className="grid grid-cols-[auto,1fr]">
        <div>
          <span className="hidden sm:block">
            <SettingsNavBar
              currentPage={pathname.split("/")[pathname.split("/").length - 1]}
            />
          </span>
        </div>
        {children}
      </section>
    </main>
  );
}
