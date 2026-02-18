'use client';

import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Manifesto from './components/Manifesto';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';

export default function Home() {
  return (
    <LangProvider>
      {/* Noise Texture */}
      <div className="bg-noise"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 bg-[#FFF8F3]">
        <Hero />
        <Partners />
        <Portfolio />

        {/* Services Section */}
        <Services />

        {/* Curtain Wrapper */}
        <div className="relative z-20 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.3)] -mt-10 rounded-t-[3rem] md:rounded-t-[5rem]">
          <Timeline />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Manifesto />
          <CTA />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll Reveal */}
      <ScrollReveal />
    </LangProvider>
  );
}
