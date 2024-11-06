import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "@/app/components/AvtiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Message-realtime",
  description: "GMessage-realtime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
