"use client";

import { useRef, useState, useEffect } from "react";
import { ImagePlus, Save, ArrowLeft } from "lucide-react";
import { useBrand } from "@/context/BrandContext";
import { toast } from "sonner";
import Link from "next/link";

export default function PerfilPage() {
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
      <div className="p-5 md:p-10 animate-pulse">
        <div className="h-10 w-48 bg-[#3d332e]/5 rounded-lg mb-8" />
        <div className="h-32 bg-transparent rounded-xl border border-dashed border-[#e8e3dd] mb-6" />
        <div className="h-48 bg-transparent rounded-xl border border-dashed border-[#e8e3dd]" />
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard" className="md:hidden text-[#3d332e]/40">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-[#3d332e]">Perfil</h1>
          </div>
          <p className="text-[#3d332e]/60 text-sm md:text-base">Configura tu información personal y profesional.</p>
        </div>
        
        {/* Desktop Save Button */}
        <button
          onClick={guardar}
          disabled={isSaving}
          className="hidden md:flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] disabled:bg-[#3d332e]/50 text-[#fdfbf7] text-sm font-semibold px-6 py-3 rounded-xl transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#3d332e]/10"
        >
          <Save size={16} />
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      <div className="flex flex-col gap-10">
        {/* Avatar Section - Flat */}
        <div className="flex flex-col items-start gap-4">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40">
            Imagen de perfil
          </label>
          <div className="flex items-center gap-6">
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
              <div className="w-24 h-24 rounded-full border border-[#e8e3dd] group-hover:border-[#f15a24]/50 overflow-hidden flex items-center justify-center bg-white transition-colors">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <ImagePlus size={24} className="text-[#3d332e]/20" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors" />
            </button>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => inputRef.current?.click()} 
                className="text-sm font-semibold text-[#f15a24] hover:text-[#d44d1e] transition-colors"
              >
                Cambiar foto
              </button>
              {avatar && (
                <button 
                  onClick={() => setAvatar(null)} 
                  className="text-xs text-[#3d332e]/40 hover:text-red-500 transition-colors text-left"
                >
                  Eliminar imagen
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form Fields - No cards */}
        <div className="grid grid-cols-1 gap-8">
          {/* Name input */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block">
              Nombre de la cuenta
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: 12enpunto"
              className="w-full bg-transparent border-b border-[#3d332e]/10 py-2 text-[#3d332e] text-base font-medium focus:outline-none focus:border-[#f15a24] transition-colors placeholder:text-[#3d332e]/20"
            />
          </div>

          {/* Cargo input */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block">
              Cargo / Título Profesional
            </label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ej: Fundadora & Pastelera"
              className="w-full bg-transparent border-b border-[#3d332e]/10 py-2 text-[#3d332e] text-base font-medium focus:outline-none focus:border-[#f15a24] transition-colors placeholder:text-[#3d332e]/20"
            />
          </div>

          {/* Bio textarea */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block">
              Biografía
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Una breve descripción sobre ti o tu marca..."
              rows={6}
              className="w-full bg-transparent border-b border-[#3d332e]/10 py-2 text-[#3d332e] text-base font-medium focus:outline-none focus:border-[#f15a24] transition-colors placeholder:text-[#3d332e]/20 resize-none"
            />
          </div>

          {/* Contact info group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block">
                URL de LinkedIn
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin.com/in/perfil"
                className="w-full bg-transparent border-b border-[#3d332e]/10 py-2 text-[#3d332e] text-base font-medium focus:outline-none focus:border-[#f15a24] transition-colors placeholder:text-[#3d332e]/20"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 block">
                Correo Público
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="hola@12enpunto.com"
                className="w-full bg-transparent border-b border-[#3d332e]/10 py-2 text-[#3d332e] text-base font-medium focus:outline-none focus:border-[#f15a24] transition-colors placeholder:text-[#3d332e]/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 md:hidden bg-[#f5f5f5] border-t border-[#e8e3dd] px-5 py-4">
        <button
          onClick={guardar}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] disabled:bg-[#3d332e]/50 text-[#fdfbf7] text-sm font-semibold px-4 py-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-[#3d332e]/20"
        >
          <Save size={18} />
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
