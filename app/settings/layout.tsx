"use client";

import { SettingsNavBar } from "@/components/settings-navbar";
import { Button } from "@/components/ui/button";
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

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="mt-16 mx-2">
      <section className="mb-4">
        <h3 className="font-bold text-2xl">Settings</h3>
        <p>Customize Synapsy Genidoc.</p>
      </section>
      <section className="grid grid-cols-[auto,1fr]">
        <div>
          <span className="hidden sm:block">
            <SettingsNavBar
              currentPage={pathname.split("/")[pathname.split("/").length - 1]}
            />
          </span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <Menu width={16} />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SettingsNavBar
                currentPage={
                  pathname.split("/")[pathname.split("/").length - 1]
                }
              />
            </SheetContent>
          </Sheet>
        </div>
        {children}
      </section>
    </main>
  );
}
