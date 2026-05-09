"use client";

import { useRef, useState, useEffect } from "react";
import { ImagePlus, Save } from "lucide-react";
import { useBrand } from "@/context/BrandContext";
import { toast } from "sonner";

export default function BrandPage() {
  const { brand, loading, actualizarBrand } = useBrand();

  const [nombre, setNombre] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [correo, setCorreo] = useState("");
  const [cargo, setCargo] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) {
      setNombre(brand.nombre || "");
      setBio(brand.bio || "");
      setLinkedin(brand.linkedin || "");
      setCorreo(brand.correo || "");
      setCargo(brand.cargo || "");
      setAvatar(brand.avatar);
    }
  }, [brand, loading]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const guardar = async () => {
    setIsSaving(true);
    try {
      await actualizarBrand({ nombre, avatar, bio, linkedin, correo, cargo });
      toast.success("Cambios guardados correctamente", {
        description: "Tu perfil ha sido actualizado."
      });
    } catch (error: any) {
      toast.error("Error al guardar", {
        description: error.message || "Problema de conexión o tabla inexistente."
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 md:p-10 max-w-xl animate-pulse">
        <div className="h-10 w-48 bg-[#3d332e]/5 rounded-lg mb-8" />
        <div className="h-32 bg-white rounded-xl border border-[#e8e3dd] mb-6" />
        <div className="h-48 bg-white rounded-xl border border-[#e8e3dd]" />
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 max-w-xl pb-36 md:pb-10">
      <div className="flex items-start justify-between mb-8 gap-4">
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-[#3d332e] mb-2">Brand</h1>
          <p className="text-[#3d332e]/60 text-base">Configura la identidad de tu marca.</p>
        </div>
        {/* Desktop button */}
        <button
          onClick={guardar}
          disabled={isSaving}
          className="hidden md:flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] disabled:bg-[#3d332e]/50 text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <Save size={15} />
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Name input */}
        <div className="bg-white rounded-xl border border-[#e8e3dd] p-6">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block mb-3">
            Nombre de la cuenta
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: 12enpunto"
            className="w-full px-4 py-3 rounded-lg border border-[#3d332e]/10 bg-[#f9f4e8]/30 text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
          />
        </div>

        {/* Cargo input */}
        <div className="bg-white rounded-xl border border-[#e8e3dd] p-6">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block mb-3">
            Cargo / Título Profesional
          </label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Ej: Fundadora & Pastelera"
            className="w-full px-4 py-3 rounded-lg border border-[#3d332e]/10 bg-[#f9f4e8]/30 text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
          />
        </div>

        {/* Bio textarea */}
        <div className="bg-white rounded-xl border border-[#e8e3dd] p-6">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block mb-3">
            Biografía
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Una breve descripción sobre ti o tu marca..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-[#3d332e]/10 bg-[#f9f4e8]/30 text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition resize-none"
          />
        </div>

        {/* Contact links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-6">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block mb-3">
              URL de LinkedIn
            </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/tu-perfil"
              className="w-full px-4 py-3 rounded-lg border border-[#3d332e]/10 bg-[#f9f4e8]/30 text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
            />
          </div>
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-6">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block mb-3">
              Correo Público
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="hola@12enpunto.cl"
              className="w-full px-4 py-3 rounded-lg border border-[#3d332e]/10 bg-[#f9f4e8]/30 text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
            />
          </div>
        </div>

        {/* Avatar upload */}
        <div className="bg-white rounded-xl border border-[#e8e3dd] p-8 flex flex-col items-center gap-4">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 self-start mb-2">
            Avatar / Logo
          </label>
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
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#e8e3dd] group-hover:border-[#f15a24]/50 overflow-hidden flex items-center justify-center bg-[#f9f4e8] transition-colors">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <ImagePlus size={32} className="text-[#3d332e]/25" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100">
              <span className="text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded-full">Cambiar</span>
            </div>
          </button>
          <p className="text-xs text-[#3d332e]/40">Haz clic para subir una imagen</p>
          {avatar && (
            <button onClick={() => setAvatar(null)} className="text-xs text-[#3d332e]/30 hover:text-[#f15a24] transition-colors">
              Quitar imagen
            </button>
          )}
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 md:hidden bg-white border-t border-[#e8e3dd] px-5 py-4">
        <button
          onClick={guardar}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] disabled:bg-[#3d332e]/50 text-[#fdfbf7] text-sm font-semibold px-4 py-3 rounded-xl transition-colors cursor-pointer"
        >
          <Save size={15} />
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
