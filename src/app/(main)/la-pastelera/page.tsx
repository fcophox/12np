import type { Metadata } from "next";
import LaPasteleraClient from "./LaPasteleraClient";

export const metadata: Metadata = {
  title: "La Pastelera — Historia de 12enpunto",
  description: "Conoce a Francisca, fundadora de 12enpunto. Una historia de pasión, técnica y amor por la pastelería artesanal en Santiago de Chile.",
  alternates: { canonical: "/la-pastelera" },
  openGraph: {
    title: "La Pastelera | 12enpunto",
    description: "Conoce a Francisca, fundadora de 12enpunto. Una historia de pasión, técnica y amor por la pastelería artesanal.",
    url: "https://12enpunto.com/la-pastelera",
    images: [{ url: "/images/team/francisca.png", width: 800, height: 800, alt: "Francisca, fundadora de 12enpunto" }],
  },
};

export default function LaPasteleraPage() {
  return <LaPasteleraClient />;
}
