"use client";
import { BookTemplate, Laptop, Moon, Sun } from "lucide-react";
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
export default function SettingsPage() {
  const { setTheme } = useTheme();
  let templates = loadTemplates();
  const [temp, setTemp] = useState(templates);
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-slate-100/40 p-4 px-2 pb-20 dark:bg-transparent sm:mt-16 sm:pb-0 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="mx-2 text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 p-2 text-sm text-muted-foreground">
          <Link
            href="#"
            className="font-semibold text-primary"
            prefetch={false}
          >
            General
          </Link>
          <Link href="#" prefetch={false}>
            OpenAI Models
          </Link>
          <Link href="#" prefetch={false}>
            Templates
          </Link>
          <Link href="#" prefetch={false}>
            About
          </Link>
        </nav>
        <div className="grid gap-6">
          <Card>
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

          <Card>
            <CardHeader>
              <CardTitle>OpenAI Models</CardTitle>
              <CardDescription>
                Select the OpenAI model to use for text generation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">GPT-3</h4>
                    <p className="text-sm text-muted-foreground">
                      General-purpose language model
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Select
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">GPT-3.5</h4>
                    <p className="text-sm text-muted-foreground">
                      Improved language model
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Select
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">GPT-4</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced language model
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Select
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Edit your code templates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {temp.length > 0 &&
                  temp.map((el, i) => (
                    <TemplateItem
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
              <CardTitle>About</CardTitle>
              <CardDescription>
                Learn more about the Synapsy Write application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <p>
                  Synapsy Write is an AI-powered text and document generation
                  tool that helps you create high-quality content with ease.
                  Developed by a team of experts in natural language processing
                  and machine learning, Synapsy Write leverages the latest
                  advancements in language models to deliver exceptional
                  results.
                </p>
                <Link href="#" className="text-primary" prefetch={false}>
                  Learn more
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
