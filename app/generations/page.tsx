"use client";
import { Eraser } from "lucide-react";
import { useState } from "react";

export default function Generations() {
  const [noItems, setNoItems] = useState(true);
  return (
    <main className="mt-16 mx-2">
      <header>
        <h2 className="text-2xl font-bold">My Generations</h2>
        <p>You can find here all your previous generations.</p>
      </header>
      {!noItems ? (
        <section className="flex flex-wrap justify-center p-5 md:justify-start"></section>
      ) : (
        <section className="flex min-h-[50vh] flex-col items-center justify-center">
          <Eraser height={48} width={48} />
          <p>No generations to show</p>
        </section>
      )}
    </main>
  );
}
