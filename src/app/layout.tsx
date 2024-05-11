import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import NextAuthSessionProvider from "@/components/session-provider";
import { Toaster } from "@/components/ui/toaster"
import '../config'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMH",
  description: "Platform for SME to manage and run buisness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
            <NextAuthSessionProvider>
            {children}
            </NextAuthSessionProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
