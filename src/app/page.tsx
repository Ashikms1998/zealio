import Image from "next/image";
import { Footer, Hero, Navbar } from "../components";
import "./globals.css";
// import { fetchData} from "../api/index";
export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
