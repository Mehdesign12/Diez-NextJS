/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        diez: {
          base: "#FFF8F3",
          orange: "#FF4D29",
          dark: "#0F0F0F",
          gray: "#F4F4F5",
          surface: "#FFFFFF",
        },
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(0,0,0,0.05)",
        glow: "0 0 20px rgba(255, 77, 41, 0.3)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
