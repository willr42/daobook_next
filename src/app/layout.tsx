import "./globals.css";
import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import { Italiana } from "next/font/google";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-franklin",
});
const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-italiana",
});

export const metadata: Metadata = {
  title: "Daobook",
  description: "Clinic Management Application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${italiana.variable}`}>
      <body>{children}</body>
    </html>
  );
}
