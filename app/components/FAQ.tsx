'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '../context/LangContext';
import { BlurFade } from './ui/BlurFade';
import { TextAnimate } from './ui/TextAnimate';

export default function FAQ() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t('faq-q1'), a: t('faq-a1') },
    { q: t('faq-q2'), a: t('faq-a2') },
    { q: t('faq-q3'), a: t('faq-a3') },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Titre */}
        <BlurFade delay={0} duration={0.6} yOffset={16} blur="10px" inView>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <TextAnimate animation="slideUp" by="word" delay={0}>
              {t('faq-title')}
            </TextAnimate>
          </h2>
        </BlurFade>

        {/* Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <BlurFade key={i} delay={0.1 + i * 0.1} duration={0.5} yOffset={14} blur="8px" inView>
              <div
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  openIndex === i ? 'bg-white shadow-lg' : 'bg-gray-50'
                }`}
              >
                <button
                  className="flex justify-between items-center font-bold cursor-pointer w-full text-lg text-[#0F0F0F] text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="ml-4 flex-shrink-0"
                  >
                    <i className="fas fa-chevron-down text-[#FF4D29]"></i>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
