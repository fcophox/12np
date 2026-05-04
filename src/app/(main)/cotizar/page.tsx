import type { Metadata } from "next";
import CotizarClient from "./CotizarClient";

export const metadata: Metadata = {
  title: "Cotización para Empresas y Pymes",
  description: "Solicita una cotización personalizada de pastelería y café para tu empresa o Pyme en Santiago. Selecciona productos, cantidades y recibe una propuesta a medida.",
  alternates: { canonical: "/cotizar" },
  openGraph: {
    title: "Cotización para Empresas y Pymes | 12enpunto",
    description: "Solicita una cotización personalizada de pastelería y café para tu empresa o Pyme en Santiago.",
    url: "https://12enpunto.cl/cotizar",
  },
};

export default function CotizarPage() {
  return <CotizarClient />;
}
