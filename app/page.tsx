import Cursor from "@/components/Cursor";
import FloatingNav from "@/components/FloatingNav";
import { SmoothScrollProvider } from "@/lib/scroll";
import About from "@/components/About";
import CharReveal from "@/components/CharReveal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Ticker from "@/components/Ticker";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <Cursor />
      <TopBar />
      <main id="top" className="relative">
        <Hero />
        <Ticker />
        <Manifesto />
        <Projects />
        <Services />
        <About />
        <Contact />
        <Footer />
      </main>
      <FloatingNav />
    </SmoothScrollProvider>
  );
}
