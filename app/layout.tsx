import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Diez Agency | Custom Automation & Digital Agency",
  description: "Automate your business, build custom tools and transform your digital operations. Free audit available.",
  metadataBase: new URL("https://diez-agency.com"),
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
