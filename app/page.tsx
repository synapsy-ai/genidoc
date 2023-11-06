import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold ">
          Create documentation easily with AI.
        </h1>
        <p className="text-slate-500">
          Document your products using OpenAI&apos;s GPT-4 models.
        </p>
        <Link href={""}>
          <Button className="m-2">Get started</Button>
        </Link>
      </section>
    </main>
  );
}
