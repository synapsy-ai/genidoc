"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGenerations } from "@/lib/generation";
import { encode } from "gpt-token-utils";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import { Copy, Edit, Printer } from "lucide-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CodeBlock, sunburst } from "react-code-blocks";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(
  () => import("@uiw/react-markdown-preview"),
  {
    ssr: false,
  }
);
export default function ViewPage() {
  const searchParams = useSearchParams();
  const id: number = parseInt(searchParams.get("id") ?? "0");

  const generations = getGenerations();
  const gen = generations[id];
  const [md, setMd] = useState(gen.result);
  const { theme } = useTheme();
  const [nbTokens, setNbTokens] = useState(0);
  const [nbWords] = useState(
    gen.result
      .replaceAll("#", "")
      .replaceAll("|", "")
      .replaceAll("-", "")
      .split(" ").length
  );
  const [nbChars] = useState(gen.result.length);

  const [price, setPrice] = useState("$0");
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        let e = encode(gen.result);
        let price = `\$${((e.length / 1000) * 0.06).toFixed(4)}`;
        setNbTokens(e.length);
        setPrice(price.toString());
      }
    } catch (error) {}
  }, []);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-slate-100/40 p-4 pb-16 dark:bg-transparent sm:mt-16 sm:pb-0 md:gap-8 md:p-10 print:mt-0 print:bg-white">
      <header className="mx-auto grid w-full max-w-6xl gap-2 print:hidden">
        <h1 className="text-3xl font-semibold">View generation</h1>
        <div className="mt-2 flex justify-center sm:justify-start print:hidden">
          <Button
            className="flex space-x-2"
            onClick={() => navigator.clipboard.writeText(md)}
          >
            <span>
              <Copy size={16} />
            </span>
            <span>Copy</span>
          </Button>
        </div>
      </header>
      <section className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]">
        <Tabs defaultValue="code">
          <TabsList className="grid w-full grid-cols-2 mt-4">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="h-full w-full">
            <div className="code-block" style={{ fontFamily: "consolas" }}>
              <CodeBlock
                {...{
                  text: md,
                  language: "markdown",
                  wrapLongLines: true,
                  showLineNumbers: false,
                  theme: sunburst,
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div>
              <MarkdownPreview
                style={{ background: "transparent" }}
                className="p-2"
                source={md}
                wrapperElement={{
                  "data-color-mode": theme === "light" ? "light" : "dark",
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
        <div className="grid gap-6 print:hidden">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Template</span>
                  <span className="font-medium">{gen.template?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Date</span>
                  <span className="font-medium">
                    {new Date(gen.date).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex w-full flex-col items-center justify-center gap-2 px-2 pb-5 md:p-0">
                <div className="w-full">
                  <h2 className="text-sm font-normal text-slate-400 dark:text-slate-500">
                    Price
                  </h2>
                  <p id="price" className="text-xl font-semibold">
                    {price}
                  </p>
                </div>
                <div className="hover:bg-whit w-full">
                  <h2 className="text-sm font-normal text-slate-400 dark:text-slate-500">
                    Tokens
                  </h2>
                  <p id="price" className="text-xl font-semibold">
                    {nbTokens}
                  </p>
                </div>
                <div className="hover:bg-whit w-full">
                  <h2 className="text-sm font-normal text-slate-400 dark:text-slate-500">
                    Words
                  </h2>
                  <p className="text-xl font-semibold">{nbWords}</p>
                </div>
                <div className="hover:bg-whit w-full">
                  <h2 className="text-sm font-normal text-slate-400 dark:text-slate-500">
                    Characters
                  </h2>
                  <p className="text-xl font-semibold">{nbChars}</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
