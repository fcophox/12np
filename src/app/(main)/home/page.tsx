import type { Metadata } from "next";
import FullSiteHome from "@/components/FullSiteHome";

export const metadata: Metadata = {
  title: "Pastelería artesanal y café de especialidad",
  description: "Descubre nuestra selección de Pâtisserie, Viennoiserie y café de especialidad. Elaborados cada día con ingredientes locales y pasión artesanal en Santiago, Chile.",
  alternates: { canonical: "/home" },
  openGraph: {
    title: "12enpunto — Pastelería artesanal y café de especialidad",
    description: "Descubre nuestra selección de Pâtisserie, Viennoiserie y café de especialidad en Santiago, Chile.",
    url: "https://12enpunto.cl/home",
    images: [{ url: "/images/brand/heroimagen.png", width: 1200, height: 630, alt: "12enpunto — Pastelería artesanal" }],
  },
};

export default function HomePage() {
  return <FullSiteHome />;
}
