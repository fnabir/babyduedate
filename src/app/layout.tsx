import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baby due date calculator",
  description: "Estimate your due date and see how far along you are.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${bricolage.variable} ${newsreader.variable}`}
    >
      <body className="font-serif">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
