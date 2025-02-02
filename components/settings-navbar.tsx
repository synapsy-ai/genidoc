"use client";
import { BookTemplate, Info, KeyRound } from "lucide-react";
import Link from "next/link";

const settingsPage = [
  { name: "OpenAI API", link: "api", icon: <KeyRound size={14} /> },
  { name: "Templates", link: "templates", icon: <BookTemplate size={14} /> },
  { name: "Data", link: "data", icon: <Info size={14} /> },
];

export function SettingsNavBar(props: { currentPage: string }) {
  return (
    <nav className="mx-2">
      {settingsPage.map((el, i) => (
        <Link
          key={i}
          className={
            "grid grid-cols-[24px_1fr] items-center px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md border-l-4" +
            (props.currentPage === el.link
              ? " border-sky-400 bg-slate-100 dark:bg-slate-800"
              : " border-transparent")
          }
          href={`/settings/${el.link}`}
        >
          {el.icon}
          <span>{el.name}</span>
        </Link>
      ))}
    </nav>
  );
}
