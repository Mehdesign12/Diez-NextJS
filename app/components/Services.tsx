'use client';
import { useLang } from '../context/LangContext';
import { BlurFade } from './ui/BlurFade';
import { TextAnimate } from './ui/TextAnimate';

export default function Services() {
  const { t } = useLang();

  const bentoCards = [
    {
      col: 'md:col-span-2',
      delay: 0.1,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      icon: 'fa-pen-ruler',
      titleKey: 'bento-1-title',
      descKey: 'bento-1-desc',
      extra: (
        <div className="absolute -right-10 -bottom-10 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
          <div className="flex gap-4">
            <div className="w-32 h-32 rounded-full border-4 border-white/20"></div>
            <div className="w-32 h-32 rounded-full bg-blue-500/30 blur-xl"></div>
          </div>
        </div>
      ),
    },
    {
      col: 'md:row-span-2',
      delay: 0.2,
      iconBg: 'bg-[#FF4D29]/20',
      iconColor: 'text-[#FF4D29]',
      icon: 'fa-code',
      titleKey: 'bento-2-title',
      descKey: 'bento-2-desc',
      isTerminal: true,
    },
    {
      col: '',
      delay: 0.3,
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-400',
      icon: 'fa-chart-line',
      titleKey: 'bento-3-title',
      descKey: 'bento-3-desc',
      extra: (
        <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-between px-8 pb-6 opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="w-2 bg-green-400 h-4 rounded-t"></div>
          <div className="w-2 bg-green-400 h-8 rounded-t"></div>
          <div className="w-2 bg-green-400 h-6 rounded-t"></div>
          <div className="w-2 bg-green-400 h-12 rounded-t"></div>
          <div className="w-2 bg-green-400 h-10 rounded-t"></div>
        </div>
      ),
    },
    {
      col: '',
      delay: 0.4,
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      icon: 'fa-mobile-alt',
      titleKey: 'bento-4-title',
      descKey: 'bento-4-desc',
      extra: (
        <i className="fas fa-wifi absolute -bottom-4 -right-4 text-8xl text-white/5 group-hover:text-white/10 transition-colors" style={{ transform: 'rotate(-15deg)' }}></i>
      ),
    },
  ];

  return (
    <section id="services" className="relative z-0 min-h-screen flex flex-col justify-start pt-32 md:pt-48 pb-32 bg-[#0F0F0F] text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#FF4D29] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <BlurFade delay={0} duration={0.5} yOffset={0} blur="0px" inView>
            <span className="text-[#FF4D29] font-bold tracking-wider uppercase text-sm mb-4 block">{t('bento-label')}</span>
          </BlurFade>
          <BlurFade delay={0.1} duration={0.6} yOffset={16} blur="10px" inView>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <TextAnimate animation="slideUp" by="word" delay={0.1}>
                {t('bento-title')}
              </TextAnimate>
            </h2>
          </BlurFade>
          <BlurFade delay={0.3} duration={0.55} yOffset={10} blur="8px" inView>
            <p className="text-xl text-gray-400 leading-relaxed">{t('bento-subtitle')}</p>
          </BlurFade>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* Card 1 — col-span-2 */}
          <BlurFade delay={0.1} duration={0.6} yOffset={20} blur="12px" inView className="md:col-span-2">
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden bento-card">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl mb-6">
                  <i className="fas fa-pen-ruler"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('bento-1-title')}</h3>
                <p className="text-gray-400 max-w-sm">{t('bento-1-desc')}</p>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-full border-4 border-white/20"></div>
                  <div className="w-32 h-32 rounded-full bg-blue-500/30 blur-xl"></div>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Card 2 — row-span-2 */}
          <BlurFade delay={0.2} duration={0.6} yOffset={20} blur="12px" inView className="md:row-span-2">
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden flex flex-col bento-card">
              <div className="w-12 h-12 rounded-xl bg-[#FF4D29]/20 flex items-center justify-center text-[#FF4D29] text-xl mb-6">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('bento-2-title')}</h3>
              <p className="text-gray-400 mb-8">{t('bento-2-desc')}</p>
              <div className="mt-auto bg-black/50 rounded-xl p-4 font-mono text-xs text-green-400 border border-white/5 shadow-2xl">
                <div className="flex gap-1.5 mb-3 opacity-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <p><span className="text-purple-400">const</span> <span className="text-yellow-300">process</span> = <span className="text-blue-300">async</span> {`() => {`}</p>
                <p className="pl-4"><span className="text-purple-400">await</span> automatiser(<span className="text-orange-300">&apos;Facturation&apos;</span>);</p>
                <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-green-300">&quot;Temps Gagné&quot;</span>;</p>
                <p>{`}`}</p>
              </div>
            </div>
          </BlurFade>

          {/* Card 3 */}
          <BlurFade delay={0.3} duration={0.6} yOffset={20} blur="12px" inView>
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden bento-card">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 text-xl mb-6">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{t('bento-3-title')}</h3>
                <p className="text-gray-400 text-sm">{t('bento-3-desc')}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-between px-8 pb-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="w-2 bg-green-400 h-4 rounded-t"></div>
                <div className="w-2 bg-green-400 h-8 rounded-t"></div>
                <div className="w-2 bg-green-400 h-6 rounded-t"></div>
                <div className="w-2 bg-green-400 h-12 rounded-t"></div>
                <div className="w-2 bg-green-400 h-10 rounded-t"></div>
              </div>
            </div>
          </BlurFade>

          {/* Card 4 */}
          <BlurFade delay={0.4} duration={0.6} yOffset={20} blur="12px" inView>
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden bento-card">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-xl mb-6">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{t('bento-4-title')}</h3>
                <p className="text-gray-400 text-sm">{t('bento-4-desc')}</p>
              </div>
              <i className="fas fa-wifi absolute -bottom-4 -right-4 text-8xl text-white/5 group-hover:text-white/10 transition-colors" style={{ transform: 'rotate(-15deg)' }}></i>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
