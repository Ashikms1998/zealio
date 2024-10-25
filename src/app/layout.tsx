import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SocketContextProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zealio",
  description: "Stay disciplined stay happy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <SocketContextProvider>
      <body className="relative">
        {children}
        <Toaster />
      </body>
        </SocketContextProvider>
    </html>
  );
}
