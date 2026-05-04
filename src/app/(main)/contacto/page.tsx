import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos por email, WhatsApp o completa el formulario. Estamos en Santiago de Chile y respondemos a la brevedad.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | 12enpunto",
    description: "Escríbenos por email, WhatsApp o completa el formulario. Estamos en Santiago de Chile.",
    url: "https://12enpunto.cl/contacto",
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
