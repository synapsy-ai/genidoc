"use client";
import Footer from "@/components/footer";
import { FeatureAnimation } from "@/components/magicui/feature-animation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Documentation with Synapsy Genidoc
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Synapsy Genidoc is a powerful app that uses OpenAI&apos;s
                    GPT models to automatically generate high-quality Markdown
                    documentation for your code, saving you time and effort.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="create">
                    <Button>Get started</Button>
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              <div className="sm:flex justify-center items-center hidden">
                <div className="rounded-2xl aspect-square max-h-36 border my-2 dark:border-slate-800 bg-white/50 p-12 shadow-lg backdrop-blur-md transition hover:border-slate-400 hover:bg-white/70 hover:shadow-xl dark:bg-slate-800/20 dark:shadow-sky-500/20 dark:hover:border-slate-500 dark:hover:bg-slate-400/20">
                  <Image
                    height={96}
                    width={96}
                    alt="Synapsy Logo"
                    src={
                      useTheme().theme === "light"
                        ? "logolight.svg"
                        : "logodark.svg"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full border bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Documentation Process
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Synapsy Genidoc offers a range of powerful features to help
                  you create high-quality documentation for your projects, from
                  automatic generation to seamless integration with your
                  favorite tools.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Automatic Documentation Generation
                      </h3>
                      <p className="text-muted-foreground">
                        Synapsy Genidoc uses OpenAI&apos;s GPT models to
                        automatically generate detailed Markdown documentation
                        for your code, saving you time and effort.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Customizable Templates
                      </h3>
                      <p className="text-muted-foreground">
                        Customize the look and feel of your documentation with a
                        range of pre-built templates, or create your own from
                        scratch.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Seamless Integration
                      </h3>
                      <p className="text-muted-foreground">
                        Synapsy Genidoc integrates seamlessly in your workflow
                        and can be customized to generate documentation in
                        custom formats.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <FeatureAnimation />
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Synapsy Genidoc
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Synapsy Genidoc is a powerful documentation tool that uses the
                latest advancements in natural language processing to streamline
                the process of creating high-quality Markdown documentation for
                your code. Our mission is to help developers save time and
                effort, so they can focus on building great products.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                href="https://github.com/synapsy-ai/genidoc"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                GitHub
              </Link>
              <Link
                href="create"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
