import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SocketContextProvider } from "@/context/SocketContext";
import Videocall from "@/components/VideoCall";
import CallNotification from "@/components/CallNotification";
import SocketInitializer from "@/components/SocketInitializer";
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
      <SocketInitializer/>
        {children}
        <Videocall/>
        <CallNotification/>
        <Toaster />
      </body>
        </SocketContextProvider>
    </html>
  );
}
