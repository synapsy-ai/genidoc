"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGenerations } from "@/lib/generation";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import { Copy } from "lucide-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CodeBlock, sunburst } from "react-code-blocks";
import { useTheme } from "next-themes";

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

  return (
    <main className="sm:mt-20 mt-2 print:mt-0">
      <Tabs defaultValue="code">
        <TabsList className="grid w-full grid-cols-2 mt-4">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="h-full w-full">
          <div style={{ fontFamily: "consolas" }}>
            <CodeBlock
              {...{
                text: md,
                language: "markdown",
                wrapLines: true,
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
      <section className="flex justify-center">
        <Button
          variant="outline"
          className="flex space-x-2"
          onClick={() => navigator.clipboard.writeText(md)}
        >
          <Copy size={16} />
          <span>Copy</span>
        </Button>
      </section>
    </main>
  );
}
