"use client";
import { GenerationItem } from "@/components/generation-item";
import { getGenerations, getSortedGenerations } from "@/lib/generation";
import { loadTemplates } from "@/lib/template";
import { Eraser } from "lucide-react";
import { useState } from "react";

export default function Generations() {
  let gens = getSortedGenerations();
  let unsorted = getGenerations();
  const [noItems, setNoItems] = useState(unsorted.length === 0);
  return (
    <main className="mt-16 mx-2">
      <header>
        <h2 className="text-2xl font-bold">My Generations</h2>
        <p>You can find here all your previous generations.</p>
      </header>
      {!noItems ? (
        <section className="mt-4">
          {gens.map((el, i) => (
            <div key={i}>
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
    </main>
  );
}
