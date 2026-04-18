import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { AppQueryClientProvider } from "@/components/providers/query-client-provider";
import { cn } from "@/lib/utils";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "AI Claim Orchestrator",
  description:
    "Mock claim process route, generated OpenAPI document, and Scalar reference page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        manrope.variable,
        fraunces.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AppQueryClientProvider>{children}</AppQueryClientProvider>
      </body>
    </html>
  );
}
