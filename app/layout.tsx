import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import MobileNavBar from "@/components/mobile-nav";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

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
          className={
            manrope.className +
            " dark:bg-slate-950 dark:text-white antialiased scroll-smooth"
          }
        >
          <NavBar />
          {children}
          <MobileNavBar />
        </body>
      </ThemeProvider>
    </html>
  );
}
