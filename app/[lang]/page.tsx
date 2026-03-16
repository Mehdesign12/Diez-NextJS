import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LangProvider } from '@/app/context/LangContext';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Partners from '@/app/components/Partners';
import Portfolio from '@/app/components/Portfolio';
import ServicesSection from '@/app/components/ServicesSection';
import Services from '@/app/components/Services';
import Footer from '@/app/components/Footer';
import type { SupportedLang } from './layout';
import { SUPPORTED_LANGS } from './layout';

/* Below-the-fold sections — lazy-loaded to reduce initial JS bundle */
const Timeline = dynamic(() => import('@/app/components/Timeline'));
const Testimonials = dynamic(() => import('@/app/components/Testimonials'));
const Pricing = dynamic(() => import('@/app/components/Pricing'));
const FAQ = dynamic(() => import('@/app/components/FAQ'));
const Manifesto = dynamic(() => import('@/app/components/Manifesto'));
const CTA = dynamic(() => import('@/app/components/CTA'));
const ScrollReveal = dynamic(() => import('@/app/components/ScrollReveal'));

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

        {/* Section Services — accordion */}
        <ServicesSection />

        {/* Bento Expertise */}
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
