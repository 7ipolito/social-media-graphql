"use client";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/client";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "@/components/Navbar";

const kanit = Kanit({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-kanit",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={kanit.variable}>
      <body>
        <ClerkProvider afterSignOutUrl={"/"}>
          <ApolloProvider client={client}>
            {" "}
            <NextUIProvider>{children} </NextUIProvider>
          </ApolloProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
