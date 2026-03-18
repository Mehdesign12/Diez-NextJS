'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime error:', error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FFF8F3]">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#FF4D29]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#FF4D29]/5 blur-3xl" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link href="/" className="mb-10">
          <Image
            src="/images/logo.png"
            alt="Diez Agency — retour à l'accueil"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* 500 number */}
        <motion.h1
          className="text-[8rem] font-extrabold leading-none tracking-tight text-[#0F0F0F] sm:text-[10rem]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
          5
          <span className="text-[#FF4D29]">0</span>
          0
        </motion.h1>

        {/* Message */}
        <motion.p
          className="mb-2 mt-4 text-xl font-semibold text-[#0F0F0F] sm:text-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Erreur inattendue
        </motion.p>

        <motion.p
          className="mb-10 max-w-md text-base text-[#0F0F0F]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Quelque chose s&apos;est mal passé. Veuillez réessayer ou revenir à l&apos;accueil.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button
            onClick={reset}
            className="group relative inline-flex items-center gap-2 rounded-full border border-[#FF4D29] bg-[#FF4D29] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-transparent hover:text-[#FF4D29] hover:shadow-[0_0_20px_rgba(255,77,41,0.3)]"
          >
            <i className="fa-solid fa-rotate-right text-xs transition-transform duration-300 group-hover:rotate-90" />
            Réessayer
          </button>
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-bold text-[#0F0F0F] transition-all duration-300 hover:border-[#FF4D29] hover:text-[#FF4D29] hover:shadow-[0_0_20px_rgba(255,77,41,0.1)]"
          >
            <i className="fa-solid fa-arrow-left text-xs transition-transform duration-300 group-hover:-translate-x-1" />
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer credit */}
      <motion.p
        className="absolute bottom-6 text-xs text-[#0F0F0F]/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Diez Agency
      </motion.p>
    </div>
  );
}
