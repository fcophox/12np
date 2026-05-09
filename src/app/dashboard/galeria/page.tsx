"use client";

import { ImageIcon, Plus, Info } from "lucide-react";

export default function GaleriaPage() {
  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 md:mb-10 gap-4">
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-[#3d332e] mb-2">
            Galería de Imágenes
          </h1>
          <p className="text-[#3d332e]/60 text-base">
            Gestiona las fotografías que se muestran en el sitio web.
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3d332e] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#f15a24] transition-all shadow-lg shadow-[#3d332e]/10">
          <Plus size={16} />
          Subir Imagen
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-[2rem] border border-[#e8e3dd] flex flex-col items-center justify-center py-24 px-6 text-center shadow-sm">
        <div className="w-20 h-20 rounded-3xl bg-[#f9f4e8] flex items-center justify-center mb-8 relative">
          <ImageIcon size={32} className="text-[#3d332e]/20" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border border-[#e8e3dd] flex items-center justify-center shadow-sm">
             <Plus size={14} className="text-[#f15a24]" />
          </div>
        </div>
        
        <div className="max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)]">
            Tu galería está vacía
          </h2>
          <p className="text-sm text-[#3d332e]/50 leading-relaxed">
            Sube las mejores fotos de tus productos, locales o equipo para mostrar la esencia de tu marca en el sitio web.
          </p>
        </div>

        <div className="mt-12 p-4 bg-[#fdfbf7] rounded-2xl border border-[#e8e3dd] flex items-start gap-3 text-left max-w-md">
          <Info size={16} className="text-[#f15a24] mt-0.5 shrink-0" />
          <p className="text-[11px] text-[#3d332e]/60 leading-relaxed">
            <span className="font-bold text-[#3d332e]">Pro-tip:</span> Para mejores resultados, utiliza imágenes en formato .webp o .jpg de alta resolución (mínimo 1200px de ancho).
          </p>
        </div>
      </div>
    </div>
  );
}
