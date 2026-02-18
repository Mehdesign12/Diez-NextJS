'use client';
import { useState } from 'react';
import { useLang } from '../context/LangContext';

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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('faq-title')}</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                openIndex === i ? 'bg-white shadow-lg' : 'bg-gray-50'
              }`}
            >
              <button
                className="flex justify-between items-center font-bold cursor-pointer w-full text-lg text-[#0F0F0F] text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className={`transition-transform duration-300 ml-4 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <i className="fas fa-chevron-down text-[#FF4D29]"></i>
                </span>
              </button>
              {openIndex === i && (
                <div className="text-gray-600 mt-4 leading-relaxed animate-fadeIn">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
