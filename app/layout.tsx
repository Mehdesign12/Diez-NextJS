import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CursorProvider } from "@/app/components/ui/CursorProvider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diez-agency.com"),
  title: {
    default: "Diez Agency – Présence digitale, Profit mesurable.",
    template: "%s | Diez Agency",
  },
  description:
    "Diez Agency – Présence digitale, Profit mesurable. Création de sites web, identité visuelle et stratégie digitale sur-mesure.",
  keywords: [
    "agence digitale",
    "création site web",
    "identité visuelle",
    "stratégie digitale",
    "automatisation",
    "développement sur-mesure",
    "Diez Agency",
  ],
  authors: [{ name: "Diez Agency", url: "https://diez-agency.com" }],
  creator: "Diez Agency",
  publisher: "Diez Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://diez-agency.com",
    siteName: "Diez Agency",
    title: "Diez Agency – Présence digitale, Profit mesurable.",
    description:
      "Création de sites web, identité visuelle et stratégie digitale sur-mesure.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Diez Agency – Présence digitale, Profit mesurable.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diez Agency – Présence digitale, Profit mesurable.",
    description:
      "Création de sites web, identité visuelle et stratégie digitale sur-mesure.",
    images: ["/og-image.jpg"],
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
        <meta name="theme-color" content="#FF4D29" />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased selection:bg-[#FF4D29] selection:text-white overflow-x-hidden`}
      >
        <CursorProvider />
        {children}
      </body>
    </html>
  );
}
