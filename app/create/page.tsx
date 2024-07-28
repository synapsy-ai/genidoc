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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

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
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-slate-100/40 p-4 pb-16 dark:bg-transparent sm:mt-16 sm:pb-0 md:gap-8 md:p-10 print:mt-0 print:bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-2 print:hidden">
        <h1 className="text-3xl font-semibold">Create</h1>
        <p className="text-muted-foreground">
          Document your code using the power of AI.
        </p>
      </div>
      <section className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[300px,1fr] lg:grid-cols-[350px,1fr]">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Template</CardTitle>
              <CardDescription>
                Select a pre-designed template for your Markdown documentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CreateTemplate setTemplates={setTemplates} />
                <TemplateCombobox setTemp={setTemplate} templates={templates} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
              <CardDescription>
                Provide required information about your generation.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Prompt</CardTitle>
              <CardDescription>Provide the code to document.</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter className="flex items-center justify-center space-x-2">
              <Button
                onClick={generate}
                disabled={!template || !codeSn || !key}
              >
                Generate
              </Button>
              <Button
                variant="outline"
                className="flex space-x-2"
                onClick={() => navigator.clipboard.writeText(md)}
              >
                <Copy size={16} />
                <span>Copy</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-start ">
                <Tabs defaultValue="code">
                  <TabsList>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code">
                    <div
                      className="code-block"
                      style={{ fontFamily: "consolas" }}
                    >
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
                        style={{
                          background: "transparent",
                          width: "100%",
                        }}
                        className="p-2"
                        source={md}
                        wrapperElement={{
                          "data-color-mode":
                            theme === "light" ? "light" : "dark",
                        }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
