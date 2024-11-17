import Videocall from "@/components/VideoCall";
import CallNotification from "@/components/CallNotification";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        {children}
        <Videocall/>
        <CallNotification/>
    </html>
  );
}
