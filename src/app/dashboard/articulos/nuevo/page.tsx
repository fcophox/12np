"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ImagePlus, Save, Upload } from "lucide-react";
import RichEditor from "@/components/RichEditor";
import { useArticulos, Articulo } from "@/context/ArticulosContext";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function NuevoArticuloPage() {
  const router = useRouter();
  const { agregarArticulo } = useArticulos();
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("borrador");
  const [categoria, setCategoria] = useState("");
  const [etiquetas, setEtiquetas] = useState("");
  const [autorNombre, setAutorNombre] = useState("");
  const [autorCargo, setAutorCargo] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [autorPreview, setAutorPreview] = useState<string | null>(null);
  const [contenido, setContenido] = useState("");

  const coverInputRef = useRef<HTMLInputElement>(null);
  const autorInputRef = useRef<HTMLInputElement>(null);

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

  const guardar = (estadoFinal: Articulo["estado"]) => {
    if (!titulo.trim()) return alert("El título es obligatorio.");
    const articulo: Articulo = {
      id: Date.now().toString(),
      titulo,
      slug: slug || slugify(titulo),
      descripcion,
      contenido,
      estado: estadoFinal,
      categoria,
      etiquetas,
      autorNombre,
      autorCargo,
      coverPreview,
      autorPreview,
      creadoEn: new Date().toISOString(),
    };
    agregarArticulo(articulo);
    router.push("/dashboard/articulos");
  };

  return (
    <div className="p-10 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-[#3d332e]/40 mb-6">
        <Link href="/dashboard" className="hover:text-[#3d332e] transition-colors">Dashboard</Link>
        <ChevronRight size={13} />
        <Link href="/dashboard/articulos" className="hover:text-[#3d332e] transition-colors">Artículos</Link>
        <ChevronRight size={13} />
        <span className="text-[#3d332e]/70">Nuevo artículo</span>
      </div>

      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#3d332e]">Nuevo artículo</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => guardar("borrador")}
            className="flex items-center gap-2 border border-[#e8e3dd] bg-white hover:bg-[#f9f4e8] text-[#3d332e] text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
            <Save size={15} />
            Guardar borrador
          </button>
          <button
            onClick={() => guardar("publicado")}
            className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
            <Upload size={15} />
            Publicar
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left - Main form */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Título */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">
              Título <span className="text-[#f15a24]">*</span>
            </label>
            <input
              type="text"
              value={titulo}
              onChange={handleTituloChange}
              placeholder="Título del artículo"
              className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">
              Slug <span className="text-[#f15a24]">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={handleSlugChange}
              placeholder="titulo-del-articulo"
              className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e]/60 text-sm font-mono placeholder:text-[#3d332e]/20 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
            />
          </div>

          {/* Descripción corta */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">Descripción corta</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Resumen del artículo (se muestra en listados y SEO)"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition resize-none"
            />
          </div>

          {/* Contenido */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#3d332e]">Contenido</label>
            <RichEditor onChange={setContenido} />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[280px] shrink-0 flex flex-col gap-4">
          {/* Imagen de portada */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Imagen de portada</h3>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file, setCoverPreview);
              }}
            />
            <div
              onClick={() => coverInputRef.current?.click()}
              onDrop={handleCoverDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-[#e8e3dd] rounded-lg cursor-pointer hover:border-[#f15a24]/40 hover:bg-[#f9f4e8]/30 transition-colors overflow-hidden"
            >
              {coverPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="Portada" className="w-full h-36 object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <ImagePlus size={24} className="text-[#3d332e]/25 mb-2" />
                  <p className="text-xs text-[#3d332e]/40 leading-relaxed">
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                  <p className="text-[10px] text-[#3d332e]/25 mt-1">JPG, PNG, WebP — máx. 5 MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Estado */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Estado</h3>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition cursor-pointer"
            >
              <option value="borrador">Borrador</option>
              <option value="revision">En revisión</option>
              <option value="publicado">Publicado</option>
              <option value="archivado">Archivado</option>
            </select>
          </div>

          {/* Categoría */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Categoría</h3>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition cursor-pointer"
            >
              <option value="">Sin categoría</option>
              <option value="noticias">Noticias</option>
              <option value="blog">Blog</option>
              <option value="tutoriales">Tutoriales</option>
              <option value="productos">Productos</option>
            </select>
          </div>

          {/* Etiquetas */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-3">Etiquetas</h3>
            <input
              type="text"
              value={etiquetas}
              onChange={(e) => setEtiquetas(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] placeholder:text-[#3d332e]/25 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
            />
            <p className="text-[11px] text-[#3d332e]/35 mt-2">Separa las etiquetas con comas.</p>
          </div>

          {/* Autor */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <h3 className="text-sm font-semibold text-[#3d332e] mb-4">Autor</h3>
            <input
              ref={autorInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file, setAutorPreview);
              }}
            />
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={() => autorInputRef.current?.click()}
                className="w-16 h-16 rounded-full border-2 border-dashed border-[#e8e3dd] hover:border-[#f15a24]/40 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer overflow-hidden"
              >
                {autorPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={autorPreview} alt="Autor" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImagePlus size={16} className="text-[#3d332e]/25" />
                    <span className="text-[10px] text-[#3d332e]/35">Subir foto</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#3d332e]/50 font-medium">Nombre</label>
                <input
                  type="text"
                  value={autorNombre}
                  onChange={(e) => setAutorNombre(e.target.value)}
                  placeholder="Ej: María González"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] placeholder:text-[#3d332e]/25 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#3d332e]/50 font-medium">Cargo</label>
                <input
                  type="text"
                  value={autorCargo}
                  onChange={(e) => setAutorCargo(e.target.value)}
                  placeholder="Ej: Lead Engineer"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] placeholder:text-[#3d332e]/25 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
