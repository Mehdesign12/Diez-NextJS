import "./globals.css";

export const metadata = {
  title: "Diez Agency | Expert en Transformation Digitale & Automatisation",
  description:
    "Boostez votre croissance avec Diez Agency. Nous créons des outils sur-mesure, automatisons vos processus et transformons votre business.",
  icons: {
    icon: "/images/logo_clean.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased selection:bg-diez-orange selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
