"use client";

import { useState, useRef } from "react";
import { useGaleria, GaleriaImagen } from "@/context/GaleriaContext";
import { 
  ImageIcon, 
  Plus, 
  Trash2, 
  Loader2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Heart,
  Hammer
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import Image from "next/image";
import DeleteModal from "@/components/DeleteModal";

type Categoria = "hero" | "recuerdos" | "artesanal";

const CATEGORIES: { id: Categoria; label: string; icon: any; description: string }[] = [
  { 
    id: "hero", 
    label: "Galería Hero", 
    icon: Sparkles, 
    description: "Imágenes principales que rotan en la cabecera de la página de inicio." 
  },
  { 
    id: "recuerdos", 
    label: "Galería Recuerdos", 
    icon: Heart, 
    description: "Fotos para la sección 'Creado con amor • desde 2001' en el inicio." 
  },
  { 
    id: "artesanal", 
    label: "Galería Artesanal", 
    icon: Hammer, 
    description: "Imágenes de procesos para la sección 'Galería Artesanal' en La Pastelera." 
  },
];

function GaleriaSection({ 
  cat, 
  imagenes, 
  onUpload, 
  onDelete 
}: { 
  cat: typeof CATEGORIES[0]; 
  imagenes: GaleriaImagen[]; 
  onUpload: (file: File, categoria: Categoria) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onUpload(file, cat.id);
      toast.success("Imagen subida correctamente");
    } catch (error) {
      toast.error("Error al subir imagen");
      console.error(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#f9f4e8] rounded-lg text-[#f15a24]">
              <cat.icon size={16} />
            </div>
            <h3 className="font-bold text-[#3d332e] text-lg">{cat.label}</h3>
          </div>
          <p className="text-xs text-[#3d332e]/40 font-medium">{cat.description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 bg-white border border-[#e8e3dd] rounded-full text-[#3d332e]/40 hover:text-[#3d332e] transition-colors shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 bg-white border border-[#e8e3dd] rounded-full text-[#3d332e]/40 hover:text-[#3d332e] transition-colors shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1 snap-x"
        >
          {/* Upload Button Card */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 w-48 aspect-[4/5] bg-white border-2 border-dashed border-[#e8e3dd] rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#f15a24]/30 hover:bg-[#fdfbf7] transition-all group/upload snap-start"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            {isUploading ? (
              <Loader2 size={24} className="text-[#f15a24] animate-spin" />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-[#f9f4e8] flex items-center justify-center text-[#3d332e]/20 group-hover/upload:text-[#f15a24] group-hover/upload:scale-110 transition-all">
                <Plus size={24} />
              </div>
            )}
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/40 group-hover/upload:text-[#f15a24]">Agregar Imagen</p>
          </div>

          {/* Images List */}
          {imagenes.map((img) => (
            <div 
              key={img.id} 
              className="shrink-0 w-48 aspect-[4/5] bg-white rounded-3xl border border-[#e8e3dd] overflow-hidden relative group/img shadow-sm snap-start"
            >
              <Image 
                src={img.url} 
                alt="" 
                fill 
                className="object-cover group-hover/img:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <button 
                  onClick={() => onDelete(img.id)}
                  className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors shadow-lg"
                 >
                   <Trash2 size={18} />
                 </button>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/20 backdrop-blur-md rounded-full text-[9px] font-bold text-white uppercase tracking-tighter">
                #{img.orden}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GaleriaPage() {
  const { imagenes, loading, agregarImagen, eliminarImagen } = useGaleria();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });

  const handleUpload = async (file: File, categoria: Categoria) => {
    const supabase = createClient();
    
    // 1. Upload to Storage
    const fileName = `${categoria}/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("galeria")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from("galeria")
      .getPublicUrl(fileName);

    // 3. Save to Table
    await agregarImagen(publicUrl, categoria);
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await eliminarImagen(deleteModal.id);
      toast.success("Imagen eliminada");
    } catch (e) {
      toast.error("Error al eliminar");
    }
  };

  if (loading) {
    return (
      <div className="p-5 md:p-10 animate-pulse space-y-12">
        <div className="h-10 w-64 bg-[#3d332e]/5 rounded-lg" />
        <div className="space-y-4">
          <div className="h-6 w-48 bg-[#3d332e]/5 rounded-lg" />
          <div className="flex gap-4">
            <div className="w-48 aspect-[4/5] bg-[#3d332e]/5 rounded-3xl" />
            <div className="w-48 aspect-[4/5] bg-[#3d332e]/5 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10 space-y-16">
      {/* Header */}
      <div className="hidden md:block">
        <h1 className="text-4xl font-bold text-[#3d332e] mb-2 font-[family-name:var(--font-fraunces)]">
          Galería Multicategoría
        </h1>
        <p className="text-[#3d332e]/60 text-base">
          Organiza y actualiza las imágenes dinámicas de todo el sitio web.
        </p>
      </div>

      {/* Categories */}
      {CATEGORIES.map((cat) => (
        <GaleriaSection 
          key={cat.id} 
          cat={cat} 
          imagenes={imagenes.filter(img => img.categoria === cat.id)}
          onUpload={handleUpload}
          onDelete={async (id) => setDeleteModal({ isOpen: true, id })}
        />
      ))}

      <DeleteModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="¿Eliminar imagen?"
        description="Esta acción no se puede deshacer. La imagen desaparecerá de todas las secciones del sitio donde se encuentre."
      />
    </div>
  );
}
