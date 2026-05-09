"use client";

import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ImagePlus, Save, Upload } from "lucide-react";
import RichEditor from "@/components/RichEditor";
import { useArticulos, Articulo } from "@/context/ArticulosContext";
import { useBrand } from "@/context/BrandContext";
import { toast } from "sonner";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function EditarArticuloPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { articulos, actualizarArticulo } = useArticulos();
  const { brand } = useBrand();

  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState<any>("borrador");
  const [categoria, setCategoria] = useState("");
  const [destacado, setDestacado] = useState(false);
  const [etiquetas, setEtiquetas] = useState("");
  const [autorNombre, setAutorNombre] = useState("");
  const [autorCargo, setAutorCargo] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [autorPreview, setAutorPreview] = useState<string | null>(null);
  const [contenido, setContenido] = useState("");
  const [creadoEn, setCreadoEn] = useState("");
  
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const autorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loaded) return;
    const a = articulos.find(x => x.id === id);
    if (a) {
      setTitulo(a.titulo);
      setSlug(a.slug);
      setDescripcion(a.descripcion);
      setContenido(a.contenido);
      setEstado(a.estado);
      setCategoria(a.categoria);
      setDestacado(a.destacado || false);
      setEtiquetas(a.etiquetas);
      setAutorNombre(a.autorNombre || brand.nombre);
      setAutorCargo(a.autorCargo);
      setCoverPreview(a.coverPreview);
      setAutorPreview(a.autorPreview || brand.avatar);
      setCreadoEn(a.creadoEn);
      setLoaded(true);
    }
  }, [articulos, id, loaded, brand]);

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
    if (!slugManual) setSlug(slugify(e.target.value));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManual(true);
    setSlug(e.target.value);
  };

  const handleImageFile = (file: File, setter: (s: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => setter(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCoverDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file, setCoverPreview);
  }, []);

  const guardar = async (estadoFinal?: Articulo["estado"]) => {
    if (!titulo.trim()) return toast.error("El título es obligatorio.");
    
    setIsSaving(true);
    try {
      const articulo: Articulo = {
        id: id as string,
        titulo,
        slug: slug || slugify(titulo),
        descripcion,
        contenido,
        estado: estadoFinal || estado,
        categoria,
        etiquetas,
        autorNombre,
        autorCargo,
        coverPreview,
        autorPreview,
        destacado,
        creadoEn
      };
      
      await actualizarArticulo(articulo);
      toast.success("Cambios guardados");
      router.push("/dashboard/articulos");
    } catch (error: any) {
      toast.error("Error al guardar", {
        description: error.message || "No se pudo actualizar el artículo."
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!loaded) return (
    <div className="p-10 animate-pulse">
      <div className="h-6 w-48 bg-[#3d332e]/5 rounded-lg mb-6" />
      <div className="h-10 w-96 bg-[#3d332e]/5 rounded-lg mb-10" />
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <div className="h-12 bg-white rounded-xl border border-[#e8e3dd]" />
          <div className="h-40 bg-white rounded-xl border border-[#e8e3dd]" />
          <div className="h-96 bg-white rounded-xl border border-[#e8e3dd]" />
        </div>
        <div className="w-[280px] space-y-4">
          <div className="h-48 bg-white rounded-xl border border-[#e8e3dd]" />
          <div className="h-24 bg-white rounded-xl border border-[#e8e3dd]" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#3d332e]/40 mb-6">
        <Link href="/dashboard" className="hover:text-[#3d332e] transition-colors">Dashboard</Link>
        <ChevronRight size={13} />
        <Link href="/dashboard/articulos" className="hover:text-[#3d332e] transition-colors">Artículos</Link>
        <ChevronRight size={13} />
        <span className="text-[#3d332e]/70">Editar artículo</span>
      </div>

      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between mb-8 gap-3">
        <h1 className="hidden md:block text-3xl font-bold text-[#3d332e]">Editar artículo</h1>
        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => guardar()}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] disabled:bg-[#3d332e]/50 text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
            <Save size={15} />
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </button>
          {estado !== "publicado" && (
            <button
              onClick={() => guardar("publicado")}
              disabled={isSaving}
              className="flex items-center gap-2 border border-[#3d332e] text-[#3d332e] hover:bg-[#3d332e]/5 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
              <Upload size={15} />
              Publicar ahora
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left - Main form */}
        <div className="flex-1 w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">Título <span className="text-[#f15a24]">*</span></label>
            <input type="text" value={titulo} onChange={handleTituloChange} placeholder="Título del artículo"
              className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">Slug <span className="text-[#f15a24]">*</span></label>
            <input type="text" value={slug} onChange={handleSlugChange} placeholder="slug-del-articulo"
              className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e]/60 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">Descripción corta</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3}
              className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition resize-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">Contenido</label>
            <RichEditor initialValue={contenido} onChange={setContenido} />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full md:w-[280px] shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Imagen de portada</h3>
            <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageFile(f, setCoverPreview); }} />
            <div onClick={() => coverInputRef.current?.click()} onDrop={handleCoverDrop} onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-[#e8e3dd] rounded-lg cursor-pointer hover:border-[#f15a24]/40 hover:bg-[#f9f4e8]/30 transition-colors overflow-hidden">
              {coverPreview ? <img src={coverPreview} alt="" className="w-full h-36 object-cover" /> :
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <ImagePlus size={24} className="text-[#3d332e]/25 mb-2" />
                  <p className="text-xs text-[#3d332e]/40">Arrastra o haz clic</p>
                </div>
              }
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Estado</h3>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition">
              <option value="borrador">Borrador</option>
              <option value="revision">En revisión</option>
              <option value="publicado">Publicado</option>
              <option value="archivado">Archivado</option>
            </select>
          </div>

          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Categoría</h3>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition">
              <option value="">Sin categoría</option>
              <option value="noticias">Noticias</option>
              <option value="blog">Blog</option>
              <option value="tutoriales">Tutoriales</option>
              <option value="productos">Productos</option>
            </select>
          </div>

          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#3d332e]">Destacado</h3>
                <p className="text-[10px] text-[#3d332e]/40 mt-0.5">Mostrar en portada principal</p>
              </div>
              <button
                type="button"
                onClick={() => setDestacado(!destacado)}
                className={`w-11 h-6 rounded-full flex items-center transition-colors px-1 ${
                  destacado ? "bg-[#f15a24]" : "bg-[#e8e3dd]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    destacado ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Etiquetas</h3>
            <input type="text" value={etiquetas} onChange={(e) => setEtiquetas(e.target.value)} placeholder="tag1, tag2..."
              className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition" />
          </div>

          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-4">Autor</h3>
            <input ref={autorInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageFile(f, setAutorPreview); }} />
            <div className="flex justify-center mb-4">
              <button type="button" onClick={() => autorInputRef.current?.click()}
                className="w-16 h-16 rounded-full border-2 border-dashed border-[#e8e3dd] hover:border-[#f15a24]/40 flex items-center justify-center transition-colors cursor-pointer overflow-hidden">
                {autorPreview ? <img src={autorPreview} alt="" className="w-full h-full object-cover" /> : <ImagePlus size={16} className="text-[#3d332e]/25" />}
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <input type="text" value={autorNombre} onChange={(e) => setAutorNombre(e.target.value)} placeholder="Nombre autor"
                className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] focus:outline-none" />
              <input type="text" value={autorCargo} onChange={(e) => setAutorCargo(e.target.value)} placeholder="Cargo autor"
                className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-30 md:hidden bg-white border-t border-[#e8e3dd] px-5 py-4">
        <button onClick={() => guardar()} disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 bg-[#3d332e] text-[#fdfbf7] text-sm font-semibold px-4 py-3 rounded-xl transition-colors cursor-pointer">
          <Save size={15} />
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
