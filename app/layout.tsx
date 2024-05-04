import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import MobileNavBar from "@/components/mobile-nav";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synapsy Genidoc",
  description: "Generate documentations easily using the power of AI.",
  twitter: {
    title: "Synapsy Genidoc",
    description: "Generate documentations easily using the power of AI.",
    card: "summary_large_image",
    images: ["https://peyronnet.group/synapsy_genidoc_social.png"],
    creator: "@PeyronnetGroup",
  },
  openGraph: {
    title: "Synapsy Genidoc",
    description: "Generate documentations easily using the power of AI.",
    images: ["https://peyronnet.group/synapsy_genidoc_social.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={dmSans.className + " dark:bg-slate-950 dark:text-white"}
        >
          <NavBar />
          {children}
          <MobileNavBar />
        </body>
      </ThemeProvider>
    </html>
  );
}
