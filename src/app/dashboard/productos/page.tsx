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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.right - 140 });
    }

    const handler = (e: MouseEvent) => {
      if (
        anchorRef.current && anchorRef.current.contains(e.target as Node) ||
        contentRef.current && contentRef.current.contains(e.target as Node)
      ) {
        return;
      }
      onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [anchorRef, onClose]);

  return createPortal(
    <div
      ref={contentRef}
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

function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  isDeleting: boolean;
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#3d332e]/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-[#e8e3dd] w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
          <Trash2 className="text-red-500" size={24} />
        </div>
        <h3 className="text-xl font-bold text-[#3d332e] mb-2">
          ¿Eliminar producto?
        </h3>
        <p className="text-sm text-[#3d332e]/60 mb-8 leading-relaxed">
          Esta acción no se puede deshacer. El producto desaparecerá de tu catálogo permanentemente.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#e8e3dd] text-sm font-semibold text-[#3d332e]/60 hover:bg-[#f9f4e8] transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Eliminar"}
          </button>
        </div>
      </div>
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
  const { productos, loading, eliminarProducto, pausarProducto } = useProductos();
  const [productoAEliminar, setProductoAEliminar] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEliminarClick = (id: string) => {
    setProductoAEliminar(id);
  };

  const confirmEliminar = async () => {
    if (!productoAEliminar) return;
    setIsDeleting(true);
    try {
      await eliminarProducto(productoAEliminar);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setProductoAEliminar(null);
    }
  };

  if (loading) {
    return (
      <div className="p-5 md:p-10 animate-pulse">
        <div className="flex justify-between mb-10">
          <div className="space-y-3">
            <div className="h-10 w-48 bg-[#3d332e]/5 rounded-lg" />
            <div className="h-4 w-80 bg-[#3d332e]/5 rounded-lg" />
          </div>
          <div className="h-11 w-36 bg-[#3d332e]/5 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl border border-[#e8e3dd] overflow-hidden">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 border-b border-[#e8e3dd] last:border-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      <div className="flex items-start justify-between mb-8 md:mb-10 gap-4">
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-[#3d332e] mb-2">Productos</h1>
          <p className="text-[#3d332e]/60 text-base">Administra el catálogo de productos de tu plataforma.</p>
        </div>
        <Link
          href="/dashboard/productos/nuevo"
          className="hidden md:flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
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
            <ProductCard key={p.id} p={p} onEliminar={handleEliminarClick} onPausar={pausarProducto} />
          ))}
        </div>
      )}

      {/* Mobile fixed bottom action bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 md:hidden bg-white border-t border-[#e8e3dd] px-5 py-4">
        <Link
          href="/dashboard/productos/nuevo"
          className="w-full flex items-center justify-center gap-2 bg-[#3d332e] text-[#fdfbf7] text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Nuevo producto
        </Link>
      </div>

      <DeleteModal
        isOpen={!!productoAEliminar}
        onClose={() => setProductoAEliminar(null)}
        onConfirm={confirmEliminar}
        isDeleting={isDeleting}
      />
    </div>
  );
}
