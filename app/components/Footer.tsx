'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../context/LangContext';
import { BlurFade } from './ui/BlurFade';

export default function Footer() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#0F0F0F] text-white pt-16 pb-12 md:pt-12 md:pb-8 relative md:fixed bottom-auto md:bottom-0 left-0 right-0 w-full z-0 md:-z-10 h-auto md:h-[620px] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <BlurFade delay={0} duration={0.6} yOffset={16} blur="10px" inView>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">

            {/* Colonne 1 — Logo + desc */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
                  <Image src="/images/logo.png" alt="Diez Logo" width={32} height={32} style={{ width: 'auto', height: 'auto' }} className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-xl">Diez Agency</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs">{t('footer-desc')}</p>
            </div>

            {/* Colonne 2 — Services */}
            <div>
              <h4 className="font-bold mb-4 md:mb-6">{t('footer-h-services')}</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-sm">
                <li><Link href={`/${lang}/services/saas-web-app`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-web')}</Link></li>
                <li><Link href={`/${lang}/services/llc-creation`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-mob')}</Link></li>
                <li><Link href={`/${lang}/services/llm-seo`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-ui')}</Link></li>
                <li><Link href={`/${lang}/services/agent-automation`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-consult')}</Link></li>
                <li><Link href={`/${lang}/blog`} className="hover:text-[#FF4D29] transition-colors">Blog & Actualités</Link></li>
              </ul>
            </div>

            {/* Colonne 3 — Entreprise */}
            <div>
              <h4 className="font-bold mb-4 md:mb-6">{t('footer-h-company')}</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-sm">
                <li><Link href={`/${lang}#how-we-work`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-about')}</Link></li>
                <li><Link href={`/${lang}/recruitment`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-recruitment')}</Link></li>
                <li><Link href={`/${lang}/blog`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-blog')}</Link></li>
                <li><Link href={`/${lang}/contact`} className="hover:text-[#FF4D29] transition-colors">{t('footer-l-contact')}</Link></li>
              </ul>
            </div>

            {/* Colonne 4 — Newsletter */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-4 md:mb-6">{t('footer-h-newsletter')}</h4>
              <p className="text-gray-400 text-xs md:text-sm mb-4">{t('footer-news-text')}</p>
              <div className="flex">
                <input
                  type="email"
                  aria-label={t('footer-email-ph')}
                  placeholder={t('footer-email-ph')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/10 rounded-l-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#FF4D29]"
                />
                <button aria-label={lang === 'fr' ? "S'inscrire à la newsletter" : 'Subscribe to newsletter'} className="bg-[#FF4D29] px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Maillage interne PSEO — Villes */}
        <BlurFade delay={0.1} duration={0.5} yOffset={10} blur="8px" inView>
          <div className="mb-8">
            <h4 className="font-bold mb-4 text-sm">{lang === 'fr' ? 'Nos implantations au Maroc' : 'Our locations in Morocco'}</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Casablanca', slug: 'casablanca' },
                { name: 'Rabat', slug: 'rabat' },
                { name: 'Marrakech', slug: 'marrakech' },
                { name: 'Fès', slug: 'fes' },
                { name: 'Tanger', slug: 'tanger' },
                { name: 'Agadir', slug: 'agadir' },
                { name: 'Meknès', slug: 'meknes' },
                { name: 'Oujda', slug: 'oujda' },
                { name: 'Kénitra', slug: 'kenitra' },
                { name: 'Tétouan', slug: 'tetouan' },
                { name: 'Salé', slug: 'sale' },
                { name: 'Nador', slug: 'nador' },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/${lang}/agence/${city.slug}`}
                  className="text-gray-500 text-xs hover:text-[#FF4D29] transition-colors border border-white/10 rounded-full px-3 py-1 hover:border-[#FF4D29]/30"
                >
                  {lang === 'fr' ? `Agence digitale ${city.name}` : `Digital agency ${city.name}`}
                </Link>
              ))}
            </div>
            <h4 className="font-bold mb-4 mt-6 text-sm">{lang === 'fr' ? 'Nos secteurs d\'activité' : 'Our industry sectors'}</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { fr: 'Restaurant', en: 'Restaurant', slug: 'restaurant' },
                { fr: 'Immobilier', en: 'Real Estate', slug: 'immobilier' },
                { fr: 'E-commerce', en: 'E-commerce', slug: 'ecommerce' },
                { fr: 'Avocat', en: 'Law Firm', slug: 'avocat' },
                { fr: 'Médecin', en: 'Healthcare', slug: 'medecin' },
                { fr: 'Hôtel', en: 'Hotel', slug: 'hotel' },
                { fr: 'Startup', en: 'Startup', slug: 'startup' },
                { fr: 'PME', en: 'SME', slug: 'pme' },
                { fr: 'Import / Export', en: 'Import / Export', slug: 'import-export' },
                { fr: 'Éducation', en: 'Education', slug: 'education' },
              ].map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/${lang}/agence/casablanca/${sector.slug}`}
                  className="text-gray-500 text-xs hover:text-[#FF4D29] transition-colors border border-white/10 rounded-full px-3 py-1 hover:border-[#FF4D29]/30"
                >
                  {lang === 'fr' ? sector.fr : sector.en}
                </Link>
              ))}
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} duration={0.5} yOffset={8} blur="6px" inView>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-xs md:text-sm text-center md:text-left">© 2025 Diez Agency. Tous droits réservés.</div>
            <div className="flex space-x-6 text-gray-400">
              <a href="https://x.com/diezagency" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="https://www.linkedin.com/company/diezagency" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><i className="fab fa-linkedin"></i></a>
              <a href="https://www.instagram.com/diezagency" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="https://dribbble.com/diezagency" target="_blank" rel="noopener noreferrer" aria-label="Dribbble" className="hover:text-white transition-colors"><i className="fab fa-dribbble"></i></a>
            </div>
          </div>
        </BlurFade>
      </div>
    </footer>
  );
}
