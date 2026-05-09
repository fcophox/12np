"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function B2BBanner() {
  return (
    <section className="w-full bg-[#3d332e] py-24 md:py-32 relative overflow-hidden text-center">
      {/* Background image with low opacity */}
      <AppImage
        src="/images/brand/background.png"
        alt=""
        variant="fill"
        className="object-cover opacity-5 brightness-50 pointer-events-none select-none"
      />

      <div className="max-w-4xl mx-auto px-8 md:px-16 relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">Pymes & Empresas</span>
          
          <h2 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] text-white leading-tight">
            ¿Eres empresa o Pyme? <br />
            <span className="text-[#f15a24]">Trabajemos juntos.</span>
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Si quieres cotizar para tu negocio, puedo ayudarte con productos personalizados y precios especiales.
          </p>

          <div className="pt-6">
            <Link href="/cotizar">
              <button className="inline-flex items-center gap-2 px-10 py-5 bg-[#74865e] text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20">
                Cotizar ahora
                <ArrowUpRight size={16} />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
