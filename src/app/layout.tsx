import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { AppQueryClientProvider } from "@/components/providers/query-client-provider";
import { AppThemeProvider } from "@/components/providers/theme-provider";
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
      suppressHydrationWarning
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        manrope.variable,
        fraunces.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AppThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
          forcedTheme="dark"
        >
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
