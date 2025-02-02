"use client";
import { GenerationItem } from "@/components/generation-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getGenerations, getSortedGenerations } from "@/lib/generation";
import { Download, Eraser, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Generations() {
  let gens = getSortedGenerations();
  let unsorted = getGenerations();
  const [noItems, setNoItems] = useState(unsorted.length === 0);
  const [history, setHistory] = useState(gens);
  function Import(event: any) {
    let file = event.target.files[0]; // get the selected file
    let reader = new FileReader(); // create a FileReader object
    reader.onload = function (event) {
      let text: string = event.target?.result as string; // get the file content as text
      localStorage.setItem("genidoc_gens", text);
      refresh();
    };
    reader.readAsText(file); // read the file as text
  }

  function refresh() {
    setHistory(getSortedGenerations());
  }
  return (
    <main className="flex min-h-[calc(100vh-(--spacing(16)))] flex-1 flex-col gap-4 bg-slate-100/40 p-4 pb-16 dark:bg-transparent sm:mt-16 sm:pb-0 md:gap-8 md:p-10 print:mt-0 print:bg-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto grid w-full gap-2 print:hidden">
          <h1 className="text-3xl font-semibold">My Generations</h1>
        </div>
        <header className="bg-white-25 sticky top-0 z-50 w-full p-2 shadow-xs backdrop-blur-md dark:bg-slate-900/25 sm:static sm:bg-transparent sm:p-0 sm:shadow-none sm:dark:bg-transparent">
          <Input
            type="file"
            id="FileSelector"
            accept="application/json"
            className="hidden"
            onChange={Import}
          ></Input>
          <div className="flex space-x-2">
            <Link
              target="_blank"
              href={
                "data:text/plain;charset=UTF-8," +
                encodeURIComponent(
                  typeof window !== "undefined"
                    ? JSON.stringify(history)
                    : "{msg: 'an error occurred'}"
                )
              }
              download={"generations.json"}
            >
              <Button variant="link" className="space-x-2 px-0">
                <Upload height={16} /> <p>Export</p>
              </Button>
            </Link>
            <Button
              variant="link"
              onClick={() =>
                (
                  document.getElementById("FileSelector") as HTMLInputElement
                ).click()
              }
              className="space-x-2 px-0"
            >
              <Download height={16} /> <p>Import</p>
            </Button>
          </div>
          <Separator className="my-2" />
        </header>
        {!noItems ? (
          <section className="mt-4">
            {history.map((el, i) => (
              <div key={i} className={el.gens.length > 0 ? "" : "hidden"}>
                <h3 className="font-bold">{el.name}</h3>
                <div className="flex flex-wrap justify-center p-5 md:justify-start">
                  {el.gens.map((item, j) => (
                    <GenerationItem key={j} id={j} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="flex min-h-[50vh] flex-col items-center justify-center">
            <Eraser height={48} width={48} />
            <p>No generations to show</p>
          </section>
        )}
      </div>
    </main>
  );
}
