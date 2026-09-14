import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollThread from "./components/ScrollThread";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Meaning from "./components/Meaning";
import SignatureReveal from "./components/SignatureReveal";
import Offerings from "./components/Offerings";
import Weekend from "./components/Weekend";
import Order from "./components/Order";
import Catering from "./components/Catering";
import Gallery from "./components/Gallery";
import Values from "./components/Values";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-terracotta focus:text-cream focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <Header />
      <ScrollThread />

      <main id="main-content" className="flex-1">
        <Hero />
        <Story />
        <Meaning />
        <SignatureReveal />
        <Offerings />
        <Weekend />
        <Order />
        <Catering />
        <Gallery />
        <Values />
        {/* SAMPLE CONTENT — see src/data/testimonials.ts. Remove this line
            (and the import above) once real testimonials replace it, or to
            hide the section until then. */}
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
