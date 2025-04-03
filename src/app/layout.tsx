"use client";
import { GlobalErrorBoundary } from "@/shared/components";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { useMemo } from "react";

import React from "react";
import "./globals.css";
import { Header } from "./_components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useNextTheme();

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === "dark" ? "dark" : "light",
          primary: {
            main: theme === "dark" ? "#fff" : "#000",
          },
          secondary: {
            main: theme === "dark" ? "#000" : "#fff",
          },
          background: {
            default: theme === "dark" ? "#121212" : "#fff",
            paper: theme === "dark" ? "#1e1e1e" : "#fff",
          },
          text: {
            primary: theme === "dark" ? "#fff" : "#000",
            secondary: theme === "dark" ? "#aaa" : "#666",
          },
          divider: theme === "dark" ? "#333" : "#ccc",
        },
      }),
    [theme],
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalErrorBoundary>
          <ThemeProvider theme={muiTheme}>
            <div className="flex flex-col h-screen p-4">
              <Header />
              <main className="flex-grow">{children}</main>
            </div>
          </ThemeProvider>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
