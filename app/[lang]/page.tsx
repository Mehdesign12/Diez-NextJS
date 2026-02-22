import { notFound } from 'next/navigation';
import { LangProvider } from '@/app/context/LangContext';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Partners from '@/app/components/Partners';
import Portfolio from '@/app/components/Portfolio';
import Services from '@/app/components/Services';
import Timeline from '@/app/components/Timeline';
import Testimonials from '@/app/components/Testimonials';
import Pricing from '@/app/components/Pricing';
import FAQ from '@/app/components/FAQ';
import Manifesto from '@/app/components/Manifesto';
import CTA from '@/app/components/CTA';
import Footer from '@/app/components/Footer';
import ScrollReveal from '@/app/components/ScrollReveal';
import type { SupportedLang } from './layout';
import { SUPPORTED_LANGS } from './layout';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();

  return (
    <>
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
    </>
  );
}
