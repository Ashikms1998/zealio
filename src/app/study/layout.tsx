import Videocall from "@/components/VideoCall";
import CallNotification from "@/components/CallNotification";
import SocketInitializer from "@/components/SocketInitializer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketInitializer />
      {children}
      <Videocall />
      <CallNotification />
    </html>
  );
}
