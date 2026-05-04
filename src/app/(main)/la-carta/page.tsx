import type { Metadata } from "next";
import LaCartaClient from "./LaCartaClient";

export const metadata: Metadata = {
  title: "La Carta — Pâtisserie, Viennoiserie y Cafetería",
  description: "Explora nuestra carta: tortas, macarons, croissants, pain au chocolat, café de especialidad y más. Todo elaborado artesanalmente en Santiago, Chile.",
  alternates: { canonical: "/la-carta" },
  openGraph: {
    title: "La Carta | 12enpunto",
    description: "Explora nuestra carta artesanal: Pâtisserie, Viennoiserie y Cafetería de especialidad.",
    url: "https://12enpunto.cl/la-carta",
    images: [{ url: "/images/products/products1.webp", width: 1200, height: 630, alt: "Torta de Chocolate — 12enpunto" }],
  },
};

export default function LaCartaPage() {
  return <LaCartaClient />;
}
