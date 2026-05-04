import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#6b5a51] text-white pt-20 pb-10 mt-auto px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-16">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 text-[12px] font-medium tracking-[0.12em] uppercase font-[family-name:var(--font-inter)]">
            <Link href="/" className="hover:opacity-70 transition-opacity whitespace-nowrap">Inicio</Link>
            <Link href="/la-pastelera" className="hover:opacity-70 transition-opacity whitespace-nowrap">La pastelera</Link>
            <Link href="/la-carta" className="hover:opacity-70 transition-opacity whitespace-nowrap">La carta</Link>
            <Link href="/contacto" className="hover:opacity-70 transition-opacity whitespace-nowrap">Contacto</Link>
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full font-medium text-[12px] hover:bg-white hover:text-[#6b5a51] transition-all"
            >
              Pymes & Empresas
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="relative w-72 h-36 md:w-80 md:h-40 flex justify-center md:justify-end">
            <Image
              src="/images/brand/12np-v.svg"
              alt="12enpunto — Pastelería artesanal"
              fill
              className="object-contain object-center md:object-right brightness-0 invert"
            />
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 flex flex-col items-center">
          <p className="text-[10px] md:text-xs font-medium tracking-[0.2em] opacity-60 uppercase text-center">
            © 2026 12ENPUNTO PASTELERÍA. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
}
