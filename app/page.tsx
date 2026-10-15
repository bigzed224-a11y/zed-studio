import Cursor from "@/components/Cursor";
import FloatingNav from "@/components/FloatingNav";
import { SmoothScrollProvider } from "@/lib/scroll";
import About from "@/components/About";
import CharReveal from "@/components/CharReveal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import ParallaxStrip from "@/components/ParallaxStrip";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
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
        <ParallaxStrip
          src="/images/founder-cover.webp"
          alt="Portrait of the founder of Zed Studio"
        />
        <Manifesto />
        <Projects />
        <ParallaxStrip
          src="/images/work/red-apple-cover.webp"
          alt="Red Apple book cover design"
          height="60vh"
        />
        <Services />
        <Testimonials />
        <About />
        <Founder />
        <Contact />
        <Footer />
      </main>
      <FloatingNav />
    </SmoothScrollProvider>
  );
}
