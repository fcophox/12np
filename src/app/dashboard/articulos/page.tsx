"use client";

import Link from "next/link";
import { FileText, Plus, Search, MoreHorizontal, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useArticulos, Articulo } from "@/context/ArticulosContext";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const estadoBadge: Record<string, string> = {
  publicado: "bg-green-50 text-green-700 border border-green-200",
  borrador: "bg-[#f9f4e8] text-[#3d332e]/60 border border-[#e8e3dd]",
  revision: "bg-blue-50 text-blue-700 border border-blue-200",
  archivado: "bg-gray-100 text-gray-500 border border-gray-200",
};

const estadoLabel: Record<string, string> = {
  publicado: "Publicado",
  borrador: "Borrador",
  revision: "En revisión",
  archivado: "Archivado",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Dropdown({
  anchorRef,
  onClose,
  onEditar,
  onEliminar,
}: {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onEditar: () => void;
  onEliminar: () => void;
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
        onClick={(e) => { e.stopPropagation(); onEditar(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#3d332e]/70 hover:bg-[#f9f4e8] hover:text-[#3d332e] transition-colors cursor-pointer"
      >
        <Pencil size={13} />
        Editar
      </button>
      <div className="my-1 border-t border-[#e8e3dd]" />
      <button
        onClick={(e) => { e.stopPropagation(); onEliminar(); onClose(); }}
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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#3d332e]/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-[#e8e3dd] w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
          <Trash2 className="text-red-500" size={24} />
        </div>
        
        <h3 className="text-xl font-bold text-[#3d332e] mb-2">
          ¿Eliminar artículo?
        </h3>
        <p className="text-sm text-[#3d332e]/60 mb-8 leading-relaxed">
          Esta acción no se puede deshacer. El artículo desaparecerá permanentemente de tu blog.
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

function ArticleCard({ a, onEliminar }: { a: Articulo; onEliminar: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/articulos/${a.id}/editar`)}
      className="flex flex-col gap-4 py-6 border-b border-[#3d332e]/5 hover:bg-[#3d332e]/[0.02] transition-colors cursor-pointer group px-2"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#f9f4e8] flex items-center justify-center shrink-0 mt-0.5 relative">
          {a.coverPreview ? (
            <img src={a.coverPreview} alt="" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <FileText size={16} className="text-[#3d332e]/40" />
          )}
          {a.destacado && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f15a24] rounded-full border-2 border-white shadow-sm animate-pulse" title="Artículo destacado" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#3d332e] truncate group-hover:text-[#f15a24] transition-colors">
            {a.titulo}
          </p>
          <p className="text-[11px] text-[#3d332e]/35 truncate mt-0.5 font-mono">
            /{a.slug}
          </p>
        </div>
        <div className="shrink-0 relative" onClick={(e) => e.stopPropagation()}>
          <button
            ref={btnRef}
            onClick={() => setOpen(!open)}
            className="text-[#3d332e]/25 hover:text-[#3d332e]/60 transition-colors p-1"
          >
            <MoreHorizontal size={16} />
          </button>
          {open && (
            <Dropdown
              anchorRef={btnRef}
              onClose={() => setOpen(false)}
              onEditar={() => router.push(`/dashboard/articulos/${a.id}/editar`)}
              onEliminar={() => onEliminar(a.id)}
            />
          )}
        </div>
      </div>

      {a.descripcion && (
        <p className="text-sm text-[#3d332e]/60 line-clamp-2 leading-relaxed">
          {a.descripcion}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap mt-1">
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${estadoBadge[a.estado]}`}>
          {estadoLabel[a.estado]}
        </span>
        {a.categoria && (
          <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#f9f4e8] text-[#3d332e]/50 border border-[#e8e3dd]">
            {a.categoria}
          </span>
        )}
        <span className="text-[11px] text-[#3d332e]/30 ml-auto font-medium">
          {formatDate(a.creadoEn)}
        </span>
      </div>
    </div>
  );
}

export default function ArticulosPage() {
  const { articulos, loading, eliminarArticulo } = useArticulos();
  const [busqueda, setBusqueda] = useState("");
  const [articuloAEliminar, setArticuloAEliminar] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmEliminar = async () => {
    if (!articuloAEliminar) return;
    
    setIsDeleting(true);
    try {
      await eliminarArticulo(articuloAEliminar);
      toast.success("Artículo eliminado");
    } catch (error) {
      toast.error("Error al eliminar");
    } finally {
      setIsDeleting(false);
      setArticuloAEliminar(null);
    }
  };

  const handleEliminar = (id: string) => {
    setArticuloAEliminar(id);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-44 bg-white rounded-xl border border-[#e8e3dd]" />
          ))}
        </div>
      </div>
    );
  }

  const filtrados = articulos.filter(
    (a) =>
      a.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard" className="md:hidden text-[#3d332e]/40">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-[#3d332e]">Artículos</h1>
            <span className="px-2.5 py-1 bg-[#3d332e]/5 text-[#3d332e]/40 text-xs font-bold rounded-full">
              {articulos.length}
            </span>
          </div>
          <p className="text-[#3d332e]/60 text-sm md:text-base">
            Gestiona y publica el contenido de tu plataforma.
          </p>
        </div>
        <Link
          href="/dashboard/articulos/nuevo"
          className="hidden md:flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#3d332e]/10"
        >
          <Plus size={16} />
          Nuevo artículo
        </Link>
      </div>

      {/* Search - Flat */}
      {articulos.length > 0 && (
        <div className="relative mb-10 max-w-sm">
          <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#3d332e]/30" />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-[#3d332e]/10 text-sm text-[#3d332e] placeholder:text-[#3d332e]/20 focus:outline-none focus:border-[#f15a24] transition-colors"
          />
        </div>
      )}

      {/* Empty state - Flat */}
      {articulos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-[#3d332e]/5 flex items-center justify-center mb-6">
            <FileText size={28} className="text-[#3d332e]/20" />
          </div>
          <h2 className="text-xl font-bold text-[#3d332e] mb-2">
            Aún no hay artículos
          </h2>
          <p className="text-sm text-[#3d332e]/40 max-w-xs mb-10">
            Crea tu primer artículo para empezar a compartir contenido con tu comunidad.
          </p>
          <Link
            href="/dashboard/articulos/nuevo"
            className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-8 py-3.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#3d332e]/10"
          >
            <Plus size={18} />
            Crear primer artículo
          </Link>
        </div>
      )}

      {/* No results */}
      {articulos.length > 0 && filtrados.length === 0 && (
        <p className="text-sm text-[#3d332e]/40 text-center py-16 font-medium">
          No se encontraron artículos para &quot;{busqueda}&quot;.
        </p>
      )}

      {/* Grid */}
      {filtrados.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrados.map((a) => (
            <ArticleCard key={a.id} a={a} onEliminar={handleEliminar} />
          ))}
        </div>
      )}

      {/* Mobile fixed bottom action bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 md:hidden bg-white border-t border-[#e8e3dd] px-5 py-4">
        <Link
          href="/dashboard/articulos/nuevo"
          className="w-full flex items-center justify-center gap-2 bg-[#3d332e] text-[#fdfbf7] text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Nuevo artículo
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!articuloAEliminar}
        onClose={() => setArticuloAEliminar(null)}
        onConfirm={confirmEliminar}
        isDeleting={isDeleting}
      />
    </div>
  );
}
