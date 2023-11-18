"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock, sunburst } from "react-code-blocks";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Codesandbox, Plus } from "lucide-react";
import CreateTemplate from "@/components/create-template";
import { TemplateCombobox } from "@/components/template-combobox";
import { Template, loadTemplates } from "@/lib/template";
import { Input } from "@/components/ui/input";
import { getSettings, setSettings } from "@/lib/settings";
import OpenAI from "openai";
import { addGeneration } from "@/lib/generation";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(
  () => import("@uiw/react-markdown-preview"),
  {
    ssr: false,
  }
);

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
export default function Page() {
  let settings = getSettings();

  const [md, setMd] = useState("# Hello, World");
  const [codeSn, setCodeSn] = useState("");
  const [template, setTemplate] = useState<Template | undefined>();
  const [key, setKey] = useState(settings?.key);
  const { theme } = useTheme();

  async function generate() {
    setMd("");
    const openai = new OpenAI({
      apiKey: key,
      dangerouslyAllowBrowser: true,
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `GOAL: Generate markdown documentation for code snippets. Language: ${template?.language}. Use the following template: ${template?.markdown_template}`,
        },
        {
          role: "user",
          content: `Generate the markdown documentation for this code:\n${codeSn}`,
        },
      ],
      stream: true,
    });
    let code = "";
    for await (const chunk of completion) {
      if (chunk.choices[0].delta.content)
        code += chunk.choices[0].delta.content;
      setMd(code);
    }
    addGeneration({
      template: template,
      snippet: codeSn,
      date: new Date(),
      result: code ?? md ?? "",
    });
  }

  return (
    <main className="mt-16">
      <section>
        <h3 className="text-xl font-bold m-2">Templates</h3>
        <div className="flex items-center space-x-2">
          <CreateTemplate />
          <TemplateCombobox setTemp={setTemplate} templates={loadTemplates()} />
        </div>
      </section>
      <section className="items-center space-x-2">
        <h3 className="text-xl font-bold m-2">Code Snippet</h3>
        <CodeEditor
          className="rounded-md border border-slate-200 dark:border-slate-600"
          value={codeSn}
          placeholder="Paste your code snippet here."
          onChange={(evn) => setCodeSn(evn.target.value)}
          padding={15}
          language={template?.language}
          data-color-mode={theme == "light" ? "light" : "dark"}
          style={{
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </section>
      <section>
        <h3 className="text-xl font-bold m-2">Options</h3>
        <div className="grid grid-cols-[auto,1fr] mx-2 items-center space-x-2">
          <p>API Key</p>
          <Input
            type="password"
            value={key}
            onChange={(v) => {
              setKey(v.target.value);
              if (settings) settings.key = v.target.value;
              setSettings(settings || { key: v.target.value });
            }}
          />
        </div>
      </section>
      <section className="px-2 my-2 flex justify-center">
        <Button onClick={generate} disabled={!template || !codeSn || !key}>
          Generate
        </Button>
      </section>
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
