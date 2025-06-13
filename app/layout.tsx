import type { Metadata } from "next";
import { Nunito, Montserrat, Fira_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./globals.css";
import { Providers } from "./providers";

const qc = new QueryClient();

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});
const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Eleganza Bank",
  description: "Eleganza is a modern banking platform for everyone.",
  icons: {
    icon: './logo.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <html lang="en">
        <body
          className={`${nunito.variable} ${montserrat.variable} ${firaMono.variable} antialiased`}
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          <Providers>
          {children}
          </Providers>
        </body>
      </html>
     
   
  );
}
