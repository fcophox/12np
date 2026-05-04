"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Plus, Star, MoreHorizontal, Pencil, Trash2, PauseCircle, PlayCircle } from "lucide-react";
import { useProductos, Producto } from "@/context/ProductosContext";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Dropdown({
  anchorRef,
  onClose,
  onEditar,
  onEliminar,
  onPausar,
  pausado,
}: {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onEditar: () => void;
  onEliminar: () => void;
  onPausar: () => void;
  pausado: boolean;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.right - 140 });
    }

    const handler = (e: MouseEvent) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [anchorRef, onClose]);

  return createPortal(
    <div
      style={{ top: pos.top, left: pos.left }}
      className="fixed z-[9999] bg-white border border-[#e8e3dd] rounded-lg shadow-xl py-1 min-w-[150px]"
    >
      <button
        onClick={() => { onEditar(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#3d332e]/70 hover:bg-[#f9f4e8] hover:text-[#3d332e] transition-colors cursor-pointer"
      >
        <Pencil size={13} />
        Editar
      </button>
      <button
        onClick={() => { onPausar(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#3d332e]/70 hover:bg-[#f9f4e8] hover:text-[#3d332e] transition-colors cursor-pointer"
      >
        {pausado ? <PlayCircle size={13} /> : <PauseCircle size={13} />}
        {pausado ? "Reanudar" : "Pausar"}
      </button>
      <div className="my-1 border-t border-[#e8e3dd]" />
      <button
        onClick={() => { onEliminar(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <Trash2 size={13} />
        Eliminar
      </button>
    </div>,
    document.body
  );
}

function ProductCard({
  p,
  onEliminar,
  onPausar,
}: {
  p: Producto;
  onEliminar: (id: string) => void;
  onPausar: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/productos/${p.id}`)}
      className={`bg-white border-b border-[#e8e3dd] flex items-center gap-4 px-4 py-3 hover:bg-[#fdfbf7] transition-colors cursor-pointer ${p.pausado ? "opacity-50" : ""}`}
    >
      {/* Imagen miniatura */}
      <div className="w-10 h-10 rounded-lg bg-[#f9f4e8] shrink-0 overflow-hidden relative">
        {p.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={14} className="text-[#3d332e]/20" />
          </div>
        )}
      </div>

      {/* Nombre + frase */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-[#3d332e] truncate">{p.nombre}</p>
          {p.pausado && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#3d332e]/10 text-[#3d332e]/50 uppercase tracking-wide">Pausado</span>
          )}
          {p.destacado && !p.pausado && (
            <span className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#f15a24]/10 text-[#f15a24]">
              <Star size={7} fill="currentColor" />Top
            </span>
          )}
        </div>
        {p.frase && <p className="text-xs text-[#3d332e]/40 truncate mt-0.5">{p.frase}</p>}
      </div>

      {/* Etiquetas */}
      <div className="hidden md:flex items-center gap-1.5 shrink-0">
        {p.etiqueta && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#3d332e] text-white">{p.etiqueta}</span>
        )}
        {p.etiquetas?.slice(0, 2).map((tag) => (
          <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#f9f4e8] border border-[#e8e3dd] text-[#3d332e]/60">{tag}</span>
        ))}
      </div>

      {/* Precio */}
      <div className="shrink-0 text-right min-w-[80px]">
        {p.precio != null ? (
          <p className="text-sm font-bold text-[#3d332e]">${p.precio.toLocaleString("es-CL")}<span className="text-[10px] font-normal text-[#3d332e]/30 ml-0.5">CLP</span></p>
        ) : (
          <p className="text-xs text-[#3d332e]/20">—</p>
        )}
      </div>

      {/* Orden */}
      <span className="text-[10px] text-[#3d332e]/30 shrink-0 w-6 text-center">#{p.orden}</span>

      {/* Menú */}
      <div className="shrink-0 relative" onClick={(e) => e.stopPropagation()}>
        <button
          ref={btnRef}
          onClick={() => setOpen((v) => !v)}
          className="text-[#3d332e]/25 hover:text-[#3d332e]/60 transition-colors cursor-pointer p-1"
        >
          <MoreHorizontal size={16} />
        </button>
        {open && (
          <Dropdown
            anchorRef={btnRef}
            onClose={() => setOpen(false)}
            onEditar={() => router.push(`/dashboard/productos/${p.id}/editar`)}
            onEliminar={() => onEliminar(p.id)}
            onPausar={() => onPausar(p.id)}
            pausado={p.pausado}
          />
        )}
      </div>
    </div>
  );
}

export default function ProductosPage() {
  const { productos, eliminarProducto, pausarProducto } = useProductos();

  return (
    <div className="p-10 max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#3d332e] mb-2">Productos</h1>
          <p className="text-[#3d332e]/60 text-base">Administra el catálogo de productos de tu plataforma.</p>
        </div>
        <Link
          href="/dashboard/productos/nuevo"
          className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Nuevo producto
        </Link>
      </div>

      {productos.length === 0 && (
        <div className="bg-white rounded-xl border border-[#e8e3dd] flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f9f4e8] flex items-center justify-center mb-6">
            <ShoppingBag size={28} className="text-[#f15a24]" />
          </div>
          <h2 className="text-xl font-bold text-[#3d332e] mb-2">Aún no hay productos</h2>
          <p className="text-sm text-[#3d332e]/50 max-w-xs mb-8">Agrega tu primer producto para comenzar a construir tu catálogo.</p>
          <Link
            href="/dashboard/productos/nuevo"
            className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Agregar primer producto
          </Link>
        </div>
      )}

      {productos.length > 0 && (
        <div className="bg-white rounded-xl border border-[#e8e3dd] overflow-hidden">
          {/* Header row */}
          <div className="flex items-center gap-4 px-4 py-2.5 border-b border-[#e8e3dd] bg-[#fdfbf7]">
            <div className="w-10 shrink-0" />
            <p className="flex-1 text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30">Producto</p>
            <p className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30 shrink-0">Etiquetas</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30 shrink-0 min-w-[80px] text-right">Precio</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30 shrink-0 w-6 text-center">Ord.</p>
            <div className="w-8 shrink-0" />
          </div>
          {productos.map((p) => (
            <ProductCard key={p.id} p={p} onEliminar={eliminarProducto} onPausar={pausarProducto} />
          ))}
        </div>
      )}
    </div>
  );
}
