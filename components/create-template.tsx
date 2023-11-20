import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { useTheme } from "next-themes";
import { LanguageComboBox } from "./language-combobox";
import { Input } from "./ui/input";
import { addTemplate, loadTemplates } from "@/lib/template";
const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
export default function CreateTemplate(props: { setTemplates: Function }) {
  const [template, setTemplate] = useState("");
  const [name, setName] = useState("");
  const [lang, setLang] = useState("");
  const { theme } = useTheme();
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="m-2 p-2 flex space-x-2 h-auto">
          <Plus height={16} />
          <p>Create</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a template</DialogTitle>
          <DialogDescription>
            Create a new template for generating documentations using the power
            of generative artificial intelligence.
          </DialogDescription>
        </DialogHeader>
        <h3 className="font-bold">Name</h3>
        <Input value={name} onChange={(v) => setName(v.target.value)} />
        <h3 className="font-bold">Template</h3>
        <CodeEditor
          className="rounded-md border border-slate-200 dark:border-slate-600"
          value={template}
          language="markdown"
          placeholder="Paste your markdown documentation template here."
          onChange={(evn) => setTemplate(evn.target.value)}
          padding={15}
          data-color-mode={theme == "light" ? "light" : "dark"}
          style={{
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <h3 className="font-bold">Language</h3>
        <LanguageComboBox setLang={setLang} />
        <DialogFooter>
          <DialogClose
            className="disabled:cursor-not-allowed"
            disabled={!name || !template || !lang}
          >
            <Button
              onClick={() => {
                addTemplate({
                  name: name,
                  markdown_template: template,
                  language: lang,
                  id: uuidv4(),
                });
                props.setTemplates(loadTemplates());
              }}
              disabled={!name || !template || !lang}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
