"use client";

import Link from "next/link";
import { FileText, Plus, Search, MoreHorizontal } from "lucide-react";
import { useArticulos } from "@/context/ArticulosContext";
import { useState } from "react";

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

export default function ArticulosPage() {
  const { articulos } = useArticulos();
  const [busqueda, setBusqueda] = useState("");

  const filtrados = articulos.filter(
    (a) =>
      a.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-10 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#3d332e] mb-2">Artículos</h1>
          <p className="text-[#3d332e]/60 text-base">
            Gestiona y publica el contenido de tu plataforma.
          </p>
        </div>
        <Link
          href="/dashboard/articulos/nuevo"
          className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Nuevo artículo
        </Link>
      </div>

      {/* Search */}
      {articulos.length > 0 && (
        <div className="relative mb-8 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d332e]/30" />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#e8e3dd] bg-white text-sm text-[#3d332e] placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/20 focus:border-[#f15a24] transition"
          />
        </div>
      )}

      {/* Empty state */}
      {articulos.length === 0 && (
        <div className="bg-white rounded-xl border border-[#e8e3dd] flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f9f4e8] flex items-center justify-center mb-6">
            <FileText size={28} className="text-[#f15a24]" />
          </div>
          <h2 className="text-xl font-bold text-[#3d332e] mb-2">
            Aún no hay artículos
          </h2>
          <p className="text-sm text-[#3d332e]/50 max-w-xs mb-8">
            Crea tu primer artículo para empezar a compartir contenido con tu comunidad.
          </p>
          <Link
            href="/dashboard/articulos/nuevo"
            className="flex items-center gap-2 bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Crear primer artículo
          </Link>
        </div>
      )}

      {/* No results */}
      {articulos.length > 0 && filtrados.length === 0 && (
        <p className="text-sm text-[#3d332e]/40 text-center py-16">
          No se encontraron artículos para &quot;{busqueda}&quot;.
        </p>
      )}

      {/* Grid */}
      {filtrados.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrados.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl border border-[#e8e3dd] p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow"
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f9f4e8] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText size={16} className="text-[#3d332e]/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#3d332e] truncate">
                    {a.titulo}
                  </p>
                  <p className="text-[11px] text-[#3d332e]/35 truncate mt-0.5">
                    /{a.slug}
                  </p>
                </div>
                <button className="text-[#3d332e]/25 hover:text-[#3d332e]/60 transition-colors shrink-0">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Description */}
              {a.descripcion && (
                <p className="text-sm text-[#3d332e]/60 line-clamp-2 leading-relaxed">
                  {a.descripcion}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${estadoBadge[a.estado]}`}>
                  {estadoLabel[a.estado]}
                </span>
                {a.categoria && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#f9f4e8] text-[#3d332e]/50 border border-[#e8e3dd]">
                    {a.categoria}
                  </span>
                )}
                <span className="text-[11px] text-[#3d332e]/30 ml-auto">
                  {formatDate(a.creadoEn)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
