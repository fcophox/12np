import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-8 py-20 text-center">
      <div className="relative w-48 h-24 mb-12">
        <Image
          src="/images/brand/12np-v.svg"
          alt="12enpunto Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="space-y-6 max-w-lg">
        <h1 className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-fraunces)] text-[#f15a24]">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)]">
          Página no encontrada
        </h2>
        <p className="text-[#3d332e]/60 text-lg leading-relaxed">
          Lo sentimos, el dulce momento que buscas no parece estar aquí. ¿Te ayudamos a volver al camino?
        </p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3d332e] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#f15a24] transition-all duration-300 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Inicio
        </Link>
        <Link
          href="/cotizar"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#3d332e] text-[#3d332e] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#3d332e] hover:text-white transition-all duration-300"
        >
          Pymes & Empresas
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
