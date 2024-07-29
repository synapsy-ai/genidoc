"use client";
import {
  ArrowUpRightFromSquare,
  BookTemplate,
  Laptop,
  Moon,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { loadTemplates } from "@/lib/template";
import { useState } from "react";
import TemplateItem from "@/components/template-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { resetGenerations } from "@/lib/generation";
import { getSettings, resetSettings, setSettings } from "@/lib/settings";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { version } from "@/lib/version";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getModels } from "@/lib/ai";
import { Input } from "@/components/ui/input";
export default function SettingsPage() {
  const { setTheme } = useTheme();
  let templates = loadTemplates();
  let settings = getSettings();
  const [temp, setTemp] = useState(templates);
  const [key, setKey] = useState(settings?.key);
  const [model, setModel] = useState(settings?.defaultModel ?? "gpt-3.5-turbo");
  const [models, setModels] = useState(
    settings?.availableModels ?? ["gpt-3.5-turbo"]
  );
  const [modelQuery, setModelQuery] = useState("");
  const [anchor, setAnchor] = useState("general");
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-slate-100/40 p-4 px-2 pb-20 dark:bg-transparent sm:mt-16 sm:pb-0 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="mx-2 text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 p-2 text-sm text-muted-foreground">
          <Link
            href="#general"
            onClick={() => setAnchor("general")}
            className={anchor === "general" ? "font-semibold text-primary" : ""}
            prefetch={false}
          >
            General
          </Link>
          <Link
            href="#models"
            prefetch={false}
            onClick={() => setAnchor("models")}
            className={anchor === "models" ? "font-semibold text-primary" : ""}
          >
            OpenAI Models
          </Link>
          <Link
            href="#templates"
            prefetch={false}
            onClick={() => setAnchor("templates")}
            className={
              anchor === "templates" ? "font-semibold text-primary" : ""
            }
          >
            Templates
          </Link>
          <Link
            href="#about"
            prefetch={false}
            onClick={() => setAnchor("about")}
            className={anchor === "about" ? "font-semibold text-primary" : ""}
          >
            About
          </Link>
        </nav>
        <div className="grid gap-6">
          <Card id="general">
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Choose the theme for the Synapsy Write application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-stretch space-y-2 sm:grid sm:grid-cols-3 sm:space-x-2 sm:space-y-0">
                <Button
                  onClick={() => setTheme("light")}
                  variant="outline"
                  className="px-10 py-8"
                >
                  <div className="my-2 grid grid-cols-[auto,1fr] items-center space-x-2">
                    <Sun />
                    <p>Light</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="px-10 py-8"
                  onClick={() => setTheme("dark")}
                >
                  <div className="my-2 grid grid-cols-[auto,1fr] items-center space-x-2">
                    <Moon />
                    <p>Dark</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="px-10 py-8"
                  onClick={() => setTheme("system")}
                >
                  <div className="my-2 grid grid-cols-[auto,1fr] items-center space-x-2">
                    <Laptop />
                    <p>System</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card id="models">
            <CardHeader>
              <CardTitle>OpenAI Models</CardTitle>
              <CardDescription>
                Select the OpenAI model to use for text generation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-stretch pb-2">
                <Input
                  value={modelQuery}
                  onChange={(v) => setModelQuery(v.target.value)}
                  placeholder="Search models..."
                />
                <Button
                  onClick={async () => {
                    const m = await getModels(settings?.key ?? "");
                    setModels(m);
                    if (settings) {
                      settings.availableModels = m;
                      setSettings(settings);
                    } else {
                      setSettings({ key: key ?? "", availableModels: m });
                    }
                  }}
                  className="text-nowrap"
                  variant="link"
                >
                  Refresh model list
                </Button>
              </div>
              <ScrollArea className="h-36">
                <div className="grid gap-4">
                  {models.sort().map((m, i) => (
                    <>
                      {m.includes(modelQuery) && (
                        <div
                          key={i}
                          className="flex items-center justify-between mr-3"
                        >
                          <div>
                            <h4 className="text-lg font-medium">{m}</h4>
                          </div>
                          <Button
                            onClick={() => {
                              setModel(m);
                              if (settings) {
                                settings.defaultModel = m;
                                setSettings(settings);
                              }
                            }}
                            variant="secondary"
                            size="sm"
                          >
                            {m === model ? "Selected" : "Select"}
                          </Button>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>OpenAI API Key</CardTitle>
              <CardDescription>Your OpenAI API Key.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="password"
                placeholder="Enter your API Key"
                value={key}
                onChange={(v) => {
                  setKey(v.target.value);
                  if (settings) settings.key = v.target.value;
                  setSettings(settings || { key: v.target.value });
                }}
              />
            </CardContent>
          </Card>
          <Card id="templates">
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Edit your code templates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {temp.length > 0 &&
                  temp.map((el, i) => (
                    <TemplateItem
                      id={i}
                      template={el}
                      key={i}
                      setTemplates={setTemp}
                    />
                  ))}
                {temp.length < 1 && (
                  <div className="flex flex-col items-center justify-center">
                    <BookTemplate />
                    <p>No templates created.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generation History</CardTitle>
              <CardDescription>Manage your generation history.</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="h-auto py-1 px-1" variant="destructive">
                    <Trash2 height={14} />
                    <p>Erase history</p>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your history and remove your Generation data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        resetGenerations();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reset settings</CardTitle>
              <CardDescription>
                Reset Synapsy Genidoc settings to their default values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="h-auto py-1 px-1" variant="destructive">
                    <X height={14} />
                    <p>Reset Settings</p>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your settings and reset them back to their default values.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        resetSettings();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Card id="about">
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>
                Learn more about the Synapsy Genidoc application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Synapsy Genidoc is a powerful documentation tool that uses the
                latest advancements in natural language processing to streamline
                the process of creating high-quality Markdown documentation for
                your code.
              </p>
              <Dialog>
                <DialogTrigger>
                  <Button variant="link" className="space-x-2 mt-2">
                    <ArrowUpRightFromSquare size={16} />
                    <span>About</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>About Synapsy Genidoc</DialogTitle>
                    <p>
                      Version {version} <br />© {new Date().getFullYear()}{" "}
                      Synapsy by Peyronnet
                    </p>
                    <p>
                      NextJS - MIT License - © 2024 Vercel, Inc.
                      <br />
                      RadixUI - MIT License - © 2022 WorkOS
                      <br />
                      shadcn/ui - MIT License - © 2023 shadcn
                      <br />
                      Lucide - ISC License - © 2024 Lucide Contributors
                    </p>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
