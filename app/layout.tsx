import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Diez Agency | Expert en Transformation Digitale & Automatisation",
  description: "Boostez votre croissance avec Diez Agency. Nous créons des outils sur-mesure, automatisons vos processus et transformons votre business. Audit gratuit.",
  keywords: "agence digitale, automatisation, développement web, transformation numérique, audit business, saas, ui/ux design",
  authors: [{ name: "Diez Agency" }],
  metadataBase: new URL("https://diez-agency.com"),
  openGraph: {
    type: "website",
    url: "https://diez-agency.com/",
    title: "Diez Agency | Votre Transformation Digitale, Sereine & Maîtrisée",
    description: "Arrêtez de perdre du temps sur des tâches manuelles. Découvrez nos solutions d'automatisation et de développement sur-mesure.",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diez Agency | Expert Transformation Digitale",
    description: "Boostez votre croissance avec Diez Agency. Audit gratuit disponible.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased selection:bg-[#FF4D29] selection:text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
