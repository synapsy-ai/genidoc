"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center">
        <div className="rounded-2xl border my-2 dark:border-slate-800 bg-white/50 p-12 shadow-lg backdrop-blur-md transition hover:border-slate-400 hover:bg-white/70 hover:shadow-xl dark:bg-slate-800/20 dark:shadow-sky-500/20 dark:hover:border-slate-500 dark:hover:bg-slate-400/20">
          <Image
            height={96}
            width={96}
            alt="Synapsy Logo"
            src={
              useTheme().theme === "light" ? "logolight.svg" : "logodark.svg"
            }
          />
        </div>
        <h1 className="text-5xl text-center font-bold ">
          Create documentation easily with AI.
        </h1>
        <p className="text-slate-500">
          Document your products using OpenAI&apos;s GPT-4 models.
        </p>
        <Link href={"/create"}>
          <Button className="m-2">Get started</Button>
        </Link>
      </section>
    </main>
  );
}
