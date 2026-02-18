'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#0F0F0F] text-white pt-16 pb-12 md:pt-12 md:pb-8 relative md:fixed bottom-auto md:bottom-0 left-0 right-0 w-full z-0 md:-z-10 h-auto md:h-[400px] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
                <Image src="/images/logo.png" alt="Diez Logo" width={32} height={32} style={{ width: 'auto', height: 'auto' }} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl">Diez Agency</span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs">{t('footer-desc')}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 md:mb-6">{t('footer-h-services')}</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-sm">
              <li><Link href="#" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-web')}</Link></li>
              <li><Link href="#" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-mob')}</Link></li>
              <li><Link href="#" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-ui')}</Link></li>
              <li><Link href="#" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-consult')}</Link></li>
              <li><Link href="/blog" className="hover:text-[#FF4D29] transition-colors">Blog & Actualités</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 md:mb-6">{t('footer-h-company')}</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-sm">
              <li><Link href="#" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-about')}</Link></li>
              <li><Link href="#" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-careers')}</Link></li>
              <li><Link href="/blog" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-blog')}</Link></li>
              <li><Link href="#contact" className="hover:text-[#FF4D29] transition-colors">{t('footer-l-contact')}</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-4 md:mb-6">{t('footer-h-newsletter')}</h4>
            <p className="text-gray-400 text-xs md:text-sm mb-4">{t('footer-news-text')}</p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('footer-email-ph')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border border-white/10 rounded-l-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#FF4D29]"
              />
              <button className="bg-[#FF4D29] px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-xs md:text-sm text-center md:text-left">© 2025 Diez Agency. Tous droits réservés.</div>
          <div className="flex space-x-6 text-gray-400">
            <Link href="#" className="hover:text-white transition-colors"><i className="fab fa-twitter"></i></Link>
            <Link href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin"></i></Link>
            <Link href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></Link>
            <Link href="#" className="hover:text-white transition-colors"><i className="fab fa-dribbble"></i></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
