"use client";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Generation } from "@/lib/generation";
import { Calendar } from "lucide-react";

export function GenerationItem(props: { item: Generation; id: number }) {
  function getRandomGradient() {
    const gradients = [
      "bg-linear-to-r from-yellow-400 to-pink-500",
      "bg-linear-to-r from-green-400 to-blue-500",
      "bg-linear-to-r from-purple-400 to-red-500",
      "bg-linear-to-r from-pink-400 to-blue-500",
      "bg-linear-to-r from-indigo-500 to-purple-600",
      "bg-linear-to-r from-pink-500 to-indigo-600",
      "bg-linear-to-r from-red-500 to-yellow-500",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={"generations/view?id=" + props.item.index}
            className="m-2 flex w-[380px] flex-col overflow-hidden rounded-md border border-slate-200 shadow-md transition hover:-translate-y-2 hover:shadow-lg dark:border-slate-700"
          >
            <span
              className={
                "flex h-16 items-start justify-start border-b border-slate-200 dark:border-slate-700 " +
                getRandomGradient()
              }
            >
              <span className="mx-2 mt-2 w-auto rounded-full border border-[#ffffff55] bg-[#ffffff55] px-1.5 text-sm text-white backdrop-blur-md">
                {props.item.template?.language}
              </span>
            </span>
            <span className="flex flex-col items-start">
              <p className="mx-1 mt-1 text-sm flex text-slate-500 dark:text-slate-400 items-center">
                <Calendar height={12} />
                <span>{new Date(props.item.date).toLocaleString()}</span>
              </p>
              <h3 className="m-2 text-left font-bold">
                {props.item.snippet.length > 30
                  ? props.item.snippet.substring(0, 30) + "..."
                  : props.item.snippet}
              </h3>
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="max-w-[380px]">
          {props.item.snippet}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
