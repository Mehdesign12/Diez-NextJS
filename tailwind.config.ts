import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        diez: {
          base: '#FFF8F3',
          orange: '#FF4D29',
          dark: '#0F0F0F',
          gray: '#F4F4F5',
          surface: '#FFFFFF',
        },
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(0,0,0,0.05)',
        glow: '0 0 20px rgba(255, 77, 41, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'word-rise': 'word-rise 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 4s linear infinite',
        marquee: 'marquee 25s linear infinite',
        'hover-card': 'hover-card 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 1s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        'word-rise': {
          '0%': { transform: 'translateY(120%) rotate(10deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'hover-card': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(6deg)' },
          '50%': { transform: 'translateY(-15px) rotate(6deg)' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
