"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, Pencil, ShoppingBag, Star, PauseCircle, PlayCircle, ArrowLeft } from "lucide-react";
import { useProductos, Producto } from "@/context/ProductosContext";

export default function ProductoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { productos, pausarProducto } = useProductos();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const p = productos.find((x) => x.id === id);
    if (p) setProducto(p);
  }, [productos, id]);

  if (!producto) return (
    <div className="p-10 flex items-center gap-3 text-sm text-[#3d332e]/40">
      <div className="w-4 h-4 border-2 border-[#3d332e]/20 border-t-[#f15a24] rounded-full animate-spin" />
      Cargando producto...
    </div>
  );

  return (
    <div className="p-10 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-[#3d332e]/40 mb-6">
        <Link href="/dashboard" className="hover:text-[#3d332e] transition-colors">Dashboard</Link>
        <ChevronRight size={13} />
        <Link href="/dashboard/productos" className="hover:text-[#3d332e] transition-colors">Productos</Link>
        <ChevronRight size={13} />
        <span className="text-[#3d332e]/70 truncate max-w-[200px]">{producto.nombre}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-[#3d332e]/30 hover:text-[#3d332e] transition-colors cursor-pointer">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-3xl font-bold text-[#3d332e]">{producto.nombre}</h1>
          {producto.pausado && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3d332e]/10 text-[#3d332e]/50 uppercase tracking-wide">Pausado</span>
          )}
          {producto.destacado && !producto.pausado && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f15a24]/10 text-[#f15a24]">
              <Star size={9} fill="currentColor" /> Destacado
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => pausarProducto(producto.id)}
            className="flex items-center gap-2 border border-[#e8e3dd] bg-white hover:bg-[#f9f4e8] text-[#3d332e]/70 text-sm font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {producto.pausado ? <PlayCircle size={14} /> : <PauseCircle size={14} />}
            {producto.pausado ? "Reanudar" : "Pausar"}
          </button>
          <Link
            href={`/dashboard/productos/${producto.id}/editar`}
            className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
          >
            <Pencil size={14} />
            Editar
          </Link>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Imagen */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] overflow-hidden">
            {producto.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-64 object-cover" />
            ) : (
              <div className="w-full h-64 bg-[#f9f4e8] flex flex-col items-center justify-center gap-3">
                <ShoppingBag size={36} className="text-[#3d332e]/15" />
                <p className="text-xs text-[#3d332e]/30">Sin imagen</p>
              </div>
            )}
          </div>

          {/* Frase */}
          {producto.frase && (
            <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3d332e]/30 mb-2">Frase</p>
              <p className="text-sm text-[#3d332e]/70 italic">&ldquo;{producto.frase}&rdquo;</p>
            </div>
          )}

          {/* Etiquetas */}
          {(producto.etiqueta || (producto.etiquetas && producto.etiquetas.length > 0)) && (
            <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3d332e]/30 mb-3">Etiquetas</p>
              <div className="flex flex-wrap gap-2">
                {producto.etiqueta && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#3d332e] text-white">{producto.etiqueta}</span>
                )}
                {producto.etiquetas?.map((tag) => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[#f9f4e8] border border-[#e8e3dd] text-[#3d332e]/70">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-[220px] shrink-0 flex flex-col gap-4">
          {/* Precio */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3d332e]/30 mb-2">Precio</p>
            {producto.precio != null ? (
              <p className="text-2xl font-bold text-[#3d332e]">
                ${producto.precio.toLocaleString("es-CL")}
                <span className="text-xs font-normal text-[#3d332e]/30 ml-1">CLP</span>
              </p>
            ) : (
              <p className="text-sm text-[#3d332e]/30">No definido</p>
            )}
          </div>

          {/* Detalles */}
          <div className="bg-white rounded-xl border border-[#e8e3dd] p-5 flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3d332e]/30">Detalles</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3d332e]/50">Orden</span>
              <span className="font-semibold text-[#3d332e]">#{producto.orden}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3d332e]/50">Destacado</span>
              <span className={`font-semibold ${producto.destacado ? "text-[#f15a24]" : "text-[#3d332e]/30"}`}>
                {producto.destacado ? "Sí" : "No"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3d332e]/50">Estado</span>
              <span className={`font-semibold ${producto.pausado ? "text-[#3d332e]/40" : "text-green-600"}`}>
                {producto.pausado ? "Pausado" : "Activo"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3d332e]/50">Creado</span>
              <span className="text-[#3d332e]/50 text-xs">
                {new Date(producto.creadoEn).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
