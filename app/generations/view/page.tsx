"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGenerations } from "@/lib/generation";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CodeBlock, sunburst } from "react-code-blocks";

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

  return (
    <main className="mt-20 print:mt-0">
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
            />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
