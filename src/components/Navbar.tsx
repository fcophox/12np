"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Close menu on path change
  useEffect(() => {
    startTransition(() => {
      setIsMenuOpen(false);
    });
  }, [pathname]);

  return (
    <>
      <nav className="sticky top-0 z-50 px-8 py-4 md:py-6 md:px-16 w-full bg-[#fdfbf7]/80 backdrop-blur-lg border-b border-[#3d332e]/5">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">

          {/* Mobile: Hamburger (Left) | Desktop: Logo (Left) */}
          <div className="flex-1 flex justify-start items-center">
            {/* Desktop Logo */}
            <Link href="/" className="hidden md:block relative w-74 h-16">
              <Image
                src="/images/brand/12np-h.svg"
                alt="12enpunto — Pastelería artesanal"
                fill
                className="object-contain object-left pointer-events-none"
                priority
              />
            </Link>

            {/* Mobile Logo (left) */}
            <Link href="/" className="md:hidden relative w-36 h-12">
              <Image
                src="/images/brand/12np-h.svg"
                alt="12enpunto — Pastelería artesanal"
                fill
                className="object-contain object-left transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Mobile: Logo (Center) | Desktop: Menu (Center) */}
          <div className="flex-[2] flex justify-center items-center">
            {/* Center (desktop menu removed - items moved right) */}
          </div>

          {/* Mobile: Button (Right) | Desktop: Button (Right) */}
          <div className="flex-1 flex justify-end items-center">
            {/* Desktop Menu (right-aligned) */}
            <div className="hidden md:flex items-center justify-end gap-8 text-sm font-medium text-[#3d332e]">
              <Link href="/" className="hover:text-[#f15a24] transition-colors whitespace-nowrap">Inicio</Link>
              <Link href="/la-carta" className="hover:text-[#f15a24] transition-colors whitespace-nowrap">La carta</Link>
              <Link href="/la-pastelera" className="hover:text-[#f15a24] transition-colors whitespace-nowrap">La pastelera</Link>
              <Link href="/blog" className="hover:text-[#f15a24] transition-colors whitespace-nowrap">Blog</Link>
              <Link href="/contacto" className="hover:text-[#f15a24] transition-colors whitespace-nowrap">Contacto</Link>
              <Link href="/cotizar" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#74865e] text-[#74865e] rounded-full hover:bg-[#74865e] hover:text-white transition-all whitespace-nowrap font-medium text-sm">
                Pymes & Empresas
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Mobile Hamburger (right) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ml-3 transition-colors z-50 ${isMenuOpen ? 'text-white' : 'text-black'}`}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#3d332e] z-40 transition-all duration-500 flex flex-col items-center justify-center gap-12 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Link href="/" className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-white hover:text-[#f15a24] transition-colors uppercase tracking-widest">Inicio</Link>
        <Link href="/la-carta" className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-white hover:text-[#f15a24] transition-colors uppercase tracking-widest">La carta</Link>
        <Link href="/la-pastelera" className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-white hover:text-[#f15a24] transition-colors uppercase tracking-widest">La pastelera</Link>
        <Link href="/blog" className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-white hover:text-[#f15a24] transition-colors uppercase tracking-widest">Blog</Link>
        <Link href="/contacto" className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-[#f15a24] hover:text-white transition-colors uppercase tracking-widest text-center">Estemos en contacto</Link>

        <div className="mt-12 pt-12 border-t border-white/10 w-64 flex flex-col items-center gap-6">
          <span className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">Contáctanos</span>
          <p className="text-white text-sm font-medium">hola@12enpunto.com</p>
        </div>
      </div>
    </>
  );
}
