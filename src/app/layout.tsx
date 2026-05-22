import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arkham — Automatizaciones con IA",
  description: "Automatizá tus procesos sin conocimientos técnicos. Solo describí qué querés y la IA se encarga del resto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased h-full`}>
        {children}
      </body>
    </html>
  );
}
