import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import MailingPopup from "@/components/MailingPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slavic Baby",
  description: "Experience the essence of Slavic Baby.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <MailingPopup />
      </body>
    </html>
  );
}
