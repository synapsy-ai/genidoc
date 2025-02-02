import { List, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function MobileNavBar() {
  return (
    <div className="fixed bottom-0 z-50 block w-full sm:hidden print:hidden">
      <nav className="grid grid-cols-3 items-center rounded-t-md bg-white/50 shadow-[0px_-5px_20px_1px_#00000012] backdrop-blur-md dark:bg-slate-900/50">
        <Link
          className="flex items-center justify-center rounded-md border border-transparent p-5 hover:border-slate-200 hover:bg-slate-100/25 dark:hover:border-slate-700 dark:hover:bg-slate-800/25"
          href={"/generations"}
        >
          <List />
        </Link>
        <div className="flex justify-center">
          <Link
            className="group flex w-16 -translate-y-2 items-center justify-center rounded-full border border-blue-400 bg-linear-to-r from-blue-500 to-sky-500 p-5 shadow-md shadow-blue-500/50 hover:from-blue-500 hover:to-blue-500"
            href={"/create"}
          >
            <Plus
              className="transition-all ease-in-out group-hover:scale-125"
              color="white"
            />
          </Link>
        </div>

        <Link
          className="flex items-center justify-center rounded-md border border-transparent p-5 hover:border-slate-200 hover:bg-slate-100/25 dark:hover:border-slate-700 dark:hover:bg-slate-800/25"
          href={"/settings"}
        >
          <Settings />
        </Link>
      </nav>
    </div>
  );
}
