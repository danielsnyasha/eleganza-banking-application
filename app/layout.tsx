import type { Metadata } from "next";
import { Nunito, Montserrat, Fira_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
  title: "Landing Page Example",
  description: "Modern app structure with public and protected routes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${nunito.variable} ${montserrat.variable} ${firaMono.variable} antialiased`}
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
