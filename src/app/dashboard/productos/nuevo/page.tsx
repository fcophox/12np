"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ImagePlus, Save } from "lucide-react";
import { useProductos } from "@/context/ProductosContext";
import { toast } from "sonner";

export default function NuevoProductoPage() {
  const router = useRouter();
  const { agregarProducto } = useProductos();

  const [nombre, setNombre] = useState("");
  const [frase, setFrase] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [etiquetas, setEtiquetas] = useState<string[]>([]);
  const [etiquetaInput, setEtiquetaInput] = useState("");
  const [orden, setOrden] = useState(1);
  const [precio, setPrecio] = useState<string>("");
  const [destacado, setDestacado] = useState(false);
  const [imagen, setImagen] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const etiquetaInputRef = useRef<HTMLInputElement>(null);

  const agregarEtiqueta = (valor: string) => {
    const tag = valor.trim();
    if (tag && !etiquetas.includes(tag)) {
      setEtiquetas((prev) => [...prev, tag]);
    }
    setEtiquetaInput("");
  };

  const eliminarEtiqueta = (tag: string) => {
    setEtiquetas((prev) => prev.filter((t) => t !== tag));
  };

  const handleEtiquetaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      agregarEtiqueta(etiquetaInput);
    } else if (e.key === "Backspace" && etiquetaInput === "" && etiquetas.length > 0) {
      setEtiquetas((prev) => prev.slice(0, -1));
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImagen(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const [isSaving, setIsSaving] = useState(false);

  const guardar = async () => {
    if (!nombre.trim()) return toast.error("El nombre es obligatorio.");
    
    setIsSaving(true);
    try {
      const producto = {
        nombre,
        frase,
        etiqueta,
        etiquetas,
        orden,
        precio: precio !== "" ? Number(precio.replace(/\./g, "")) : null,
        destacado,
        pausado: false,
        imagen,
      };
      
      await agregarProducto(producto);
      toast.success("Producto creado con éxito");
      router.push("/dashboard/productos");
    } catch (error: any) {
      toast.error("Error al crear producto", {
        description: error.message || "No se pudo guardar en la base de datos."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#3d332e]/40 mb-6">
        <Link href="/dashboard" className="hover:text-[#3d332e] transition-colors">Dashboard</Link>
        <ChevronRight size={13} />
        <Link href="/dashboard/productos" className="hover:text-[#3d332e] transition-colors">Productos</Link>
        <ChevronRight size={13} />
        <span className="text-[#3d332e]/70">Nuevo producto</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <h1 className="hidden md:block text-3xl font-bold text-[#3d332e]">Nuevo producto</h1>
        {/* Desktop button */}
        <button
          onClick={guardar}
          disabled={isSaving}
          className="hidden md:flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] disabled:bg-[#3d332e]/50 text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <Save size={15} />
          {isSaving ? "Guardando..." : "Guardar producto"}
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* Imagen */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#3d332e]">Imagen</label>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-[#e8e3dd] rounded-xl cursor-pointer hover:border-[#f15a24]/40 hover:bg-[#f9f4e8]/30 transition-colors overflow-hidden bg-white"
          >
            {imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagen} alt="Producto" className="w-full h-56 object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center py-14 gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f9f4e8] flex items-center justify-center">
                  <ImagePlus size={22} className="text-[#3d332e]/30" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#3d332e]/50">Arrastra una imagen o haz clic para seleccionar</p>
                  <p className="text-xs text-[#3d332e]/25 mt-1">JPG, PNG, WebP — máx. 5 MB</p>
                </div>
              </div>
            )}
          </div>
          {imagen && (
            <button
              onClick={() => setImagen(null)}
              className="text-xs text-[#3d332e]/40 hover:text-[#f15a24] transition-colors self-start"
            >
              Quitar imagen
            </button>
          )}
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#3d332e]">
            Nombre <span className="text-[#f15a24]">*</span>
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Café de especialidad"
            className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
          />
        </div>

        {/* Frase */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#3d332e]">Frase</label>
          <input
            type="text"
            value={frase}
            onChange={(e) => setFrase(e.target.value)}
            placeholder="Ej: El mejor café de la ciudad"
            className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
          />
        </div>

        {/* Precio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#3d332e]">Precio</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#3d332e]/40 font-medium select-none">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={precio}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                setPrecio(raw ? Number(raw).toLocaleString("es-CL") : "");
              }}
              placeholder="0"
              className="w-full pl-8 pr-16 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#3d332e]/30 font-medium select-none">CLP</span>
          </div>
        </div>

        {/* Etiqueta simple */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#3d332e]">Etiqueta</label>
          <input
            type="text"
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
            placeholder="Ej: Nuevo, Popular, Temporada..."
            className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
          />
          <p className="text-xs text-[#3d332e]/35">Se muestra como badge sobre el producto.</p>
        </div>

        {/* Etiquetas múltiples */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#3d332e]">Etiquetas</label>
          <div
            onClick={() => etiquetaInputRef.current?.focus()}
            className="flex flex-wrap items-center gap-2 min-h-[46px] px-3 py-2 rounded-lg border border-[#e8e3dd] bg-white cursor-text focus-within:ring-2 focus-within:ring-[#f15a24]/20 focus-within:border-[#f15a24] transition"
          >
            {etiquetas.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-[#f9f4e8] border border-[#e8e3dd] text-[#3d332e] text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); eliminarEtiqueta(tag); }}
                  className="text-[#3d332e]/30 hover:text-[#f15a24] transition-colors leading-none cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              ref={etiquetaInputRef}
              type="text"
              value={etiquetaInput}
              onChange={(e) => setEtiquetaInput(e.target.value)}
              onKeyDown={handleEtiquetaKeyDown}
              onBlur={() => { if (etiquetaInput.trim()) agregarEtiqueta(etiquetaInput); }}
              placeholder={etiquetas.length === 0 ? "Escribe y presiona Enter o coma..." : ""}
              className="flex-1 min-w-[140px] text-sm text-[#3d332e] placeholder:text-[#3d332e]/30 focus:outline-none bg-transparent"
            />
          </div>
          <p className="text-xs text-[#3d332e]/35">Presiona Enter o coma para agregar. Backspace para eliminar.</p>
        </div>

        {/* Orden + Destacado */}
        <div className="flex gap-4">
          {/* Orden */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm font-medium text-[#3d332e]">Orden</label>
            <input
              type="number"
              min={1}
              value={orden}
              onChange={(e) => setOrden(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-[#e8e3dd] bg-white text-[#3d332e] text-sm focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
            />
            <p className="text-xs text-[#3d332e]/35">Define la posición en el listado.</p>
          </div>

          {/* Destacado */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm font-medium text-[#3d332e]">Destacado</label>
            <div className="flex items-center gap-3 py-1">
              <button
                type="button"
                onClick={() => setDestacado(!destacado)}
                className={`relative rounded-full transition-colors cursor-pointer shrink-0 ${
                  destacado ? "bg-[#f15a24]" : "bg-[#e8e3dd]"
                }`}
                style={{ height: "22px", width: "40px" }}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${
                    destacado ? "translate-x-[18px]" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-[#3d332e]/60">
                {destacado ? "Sí, destacado" : "No destacado"}
              </span>
            </div>
            <p className="text-xs text-[#3d332e]/35">Aparece primero en el catálogo.</p>
          </div>
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
          {isSaving ? "Guardando..." : "Guardar producto"}
        </button>
      </div>
    </div>
  );
}
