import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Services from "@/components/Services";
import WhyZed from "@/components/WhyZed";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";

const marqueeItems = [
  "Web Development",
  "Web Applications",
  "React & Next.js",
  "Brand Identity",
  "UI/UX Design",
  "Responsive Design",
  "Full-Stack Dev",
  "Digital Products",
];

export default function Home() {
  return (
    <PageLoader>
      <ScrollProgress />
      <main>
        <Nav />
        <Hero />
        <Marquee items={marqueeItems} />
        <div className="section-divider" />
        <Work />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <WhyZed />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </main>
    </PageLoader>
  );
}
