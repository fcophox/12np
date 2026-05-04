"use client";

import { useRef, useState, useEffect } from "react";
import { ImagePlus, Save } from "lucide-react";
import { useBrand } from "@/context/BrandContext";

export default function BrandPage() {
  const { brand, actualizarBrand } = useBrand();

  const [nombre, setNombre] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNombre(brand.nombre);
    setAvatar(brand.avatar);
  }, [brand]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const guardar = () => {
    actualizarBrand({ nombre, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-10 max-w-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#3d332e] mb-2">Brand</h1>
          <p className="text-[#3d332e]/60 text-base">Configura la identidad de tu marca.</p>
        </div>
        <button
          onClick={guardar}
          className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <Save size={15} />
          {saved ? "¡Guardado!" : "Guardar"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e3dd] p-8 flex flex-col gap-8">
        {/* Avatar */}
        <div className="flex flex-col gap-3 items-center">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="relative group cursor-pointer"
          >
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-[#e8e3dd] group-hover:border-[#f15a24]/50 overflow-hidden flex items-center justify-center bg-[#f9f4e8] transition-colors">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <ImagePlus size={28} className="text-[#3d332e]/25" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100">
              <span className="text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded-full">Cambiar</span>
            </div>
          </button>
          {avatar && (
            <button onClick={() => setAvatar(null)} className="text-xs text-[#3d332e]/30 hover:text-[#f15a24] transition-colors">
              Quitar imagen
            </button>
          )}
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#3d332e]">Nombre de la marca</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: 12enpunto"
            className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
          />
        </div>

        {/* Preview */}
        {(nombre || avatar) && (
          <div className="border-t border-[#e8e3dd] pt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3d332e]/30 mb-4">Vista previa</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f9f4e8] overflow-hidden flex items-center justify-center shrink-0">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-bold text-[#3d332e]/40">
                    {nombre.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-[#3d332e]">{nombre || "—"}</p>
                <p className="text-xs text-[#3d332e]/40">Tu marca</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
