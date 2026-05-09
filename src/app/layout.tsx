import type { Metadata } from "next";
import { Montserrat, Fraunces } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "12enpunto — Pastelería artesanal y café de especialidad",
    template: "%s | 12enpunto",
  },
  description: "Pastelería artesanal, viennoiserie y café de especialidad en Chile. Pedidos personalizados para empresas y Pymes.",
  keywords: ["pastelería artesanal", "café especialidad", "viennoiserie", "tortas", "macarons", "pastelería Chile", "12enpunto"],
  authors: [{ name: "12enpunto" }],
  creator: "12enpunto",
  metadataBase: new URL("https://12enpunto.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://12enpunto.com",
    siteName: "12enpunto",
    title: "12enpunto — Pastelería artesanal y café de especialidad",
    description: "Pastelería artesanal, viennoiserie y café de especialidad en Chile. Pedidos personalizados para empresas y Pymes.",
    images: [{ url: "/images/brand/background.png", width: 1200, height: 630, alt: "12enpunto — Pastelería artesanal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "12enpunto — Pastelería artesanal y café de especialidad",
    description: "Pastelería artesanal, viennoiserie y café de especialidad en Chile.",
    images: ["/images/brand/background.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "12enpunto",
  url: "https://12enpunto.com",
  logo: "https://12enpunto.com/images/brand/12np-v.svg",
  image: "https://12enpunto.com/images/brand/background.png",
  description: "Pastelería artesanal, viennoiserie y café de especialidad en Santiago, Chile.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hola@12enpunto.com",
    availableLanguage: "Spanish",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fdfbf7]">
        {children}
      </body>
    </html>
  );
}
