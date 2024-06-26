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
import { Codesandbox, Copy, Pen, PenBox, Plus, Settings } from "lucide-react";
import CreateTemplate from "@/components/create-template";
import { TemplateCombobox } from "@/components/template-combobox";
import { Template, loadTemplates } from "@/lib/template";
import { Input } from "@/components/ui/input";
import { getSettings, setSettings } from "@/lib/settings";
import OpenAI from "openai";
import { addGeneration } from "@/lib/generation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
  const [templates, setTemplates] = useState(loadTemplates());

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
    <main className="sm:mt-16 mt-2">
      <header className="flex items-center space-x-2 mx-2">
        <PenBox />
        <span>
          <h2 className="text-2xl font-bold">Create</h2>
          <p>Document your code using the power of AI.</p>
        </span>
      </header>
      <Separator className="my-2" />
      <section>
        <h3 className="text-xl font-bold m-2">Templates</h3>
        <div className="flex items-center space-x-2">
          <CreateTemplate setTemplates={setTemplates} />
          <TemplateCombobox setTemp={setTemplate} templates={templates} />
        </div>
      </section>
      <section className="items-center m-2">
        <h3 className="text-xl font-bold">Code Snippet</h3>
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
      <section className="m-2">
        <h3 className="text-xl font-bold">Options</h3>
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2">
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
          <Link href="/settings">
            <Button variant="outline">
              <Settings height={14} />
            </Button>
          </Link>
        </div>
      </section>
      <section className="px-2 my-2 flex justify-center">
        <Button onClick={generate} disabled={!template || !codeSn || !key}>
          Generate
        </Button>
      </section>
      <Tabs defaultValue="code">
        <TabsList className="grid m-2 grid-cols-2 mt-4">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="h-full mx-2">
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
          className="flex space-x-2 mt-2"
          onClick={() => navigator.clipboard.writeText(md)}
        >
          <Copy size={16} />
          <span>Copy</span>
        </Button>
      </section>
    </main>
  );
}
