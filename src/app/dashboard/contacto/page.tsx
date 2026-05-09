"use client";

import { useContactos, Contacto } from "@/context/ContactosContext";
import { 
  Inbox, 
  MessageSquare, 
  Trash2, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  Circle,
  MoreHorizontal,
  ExternalLink
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function ContactoRow({ 
  c, 
  onEliminar, 
  onToggleLeido 
}: { 
  c: Contacto; 
  onEliminar: (id: string) => void;
  onToggleLeido: (id: string, leido: boolean) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`group border-b border-[#e8e3dd] last:border-0 transition-colors ${!c.leido ? "bg-[#fdfbf7]" : "bg-white hover:bg-[#fcfaf8]"}`}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-4 px-4 py-4 cursor-pointer"
      >
        {/* Status Icon */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleLeido(c.id, !c.leido);
          }}
          className="shrink-0 transition-colors"
        >
          {c.leido ? (
            <CheckCircle size={18} className="text-[#3d332e]/20 hover:text-[#f15a24]" />
          ) : (
            <Circle size={18} className="text-[#f15a24] fill-[#f15a24]/10" />
          )}
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className={`text-sm font-bold truncate ${!c.leido ? "text-[#3d332e]" : "text-[#3d332e]/60"}`}>
              {c.nombre}
            </p>
            {!c.leido && (
              <span className="text-[9px] font-bold bg-[#f15a24] text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Nuevo</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-[#3d332e]/40">
            <span className="flex items-center gap-1"><Mail size={10} /> {c.email}</span>
            <span className="hidden sm:flex items-center gap-1"><Phone size={10} /> {c.whatsapp}</span>
          </div>
        </div>

        {/* Date */}
        <div className="hidden md:block shrink-0 text-right">
          <p className="text-[11px] font-medium text-[#3d332e]/30 flex items-center gap-1 justify-end">
            <Clock size={10} />
            {formatDate(c.creadoEn)}
          </p>
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEliminar(c.id);
            }}
            className="p-2 text-[#3d332e]/20 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Expanded Message */}
      {isExpanded && (
        <div className="px-14 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="bg-[#f9f4e8]/50 rounded-2xl p-5 border border-[#e8e3dd]/50">
            <p className="text-xs font-bold text-[#3d332e]/40 uppercase tracking-widest mb-3 flex items-center gap-2">
              <MessageSquare size={12} /> Mensaje
            </p>
            <p className="text-sm text-[#3d332e] leading-relaxed whitespace-pre-wrap italic">
              &quot;{c.mensaje}&quot;
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a 
                href={`mailto:${c.email}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#3d332e] text-white text-[11px] font-bold rounded-full hover:bg-[#2a2220] transition-colors"
              >
                Responder por Email
              </a>
              <a 
                href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#25D366] text-white text-[11px] font-bold rounded-full hover:bg-[#128C7E] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactoPage() {
  const { contactos, loading, eliminarContacto, marcarComoLeido } = useContactos();
  const [articuloAEliminar, setArticuloAEliminar] = useState<string | null>(null);

  const handleEliminar = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
      try {
        await eliminarContacto(id);
        toast.success("Mensaje eliminado");
      } catch (e) {
        toast.error("Error al eliminar");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-5 md:p-10 animate-pulse">
        <div className="hidden md:block mb-10">
          <div className="h-10 w-64 bg-[#3d332e]/5 rounded-lg mb-2" />
          <div className="h-4 w-96 bg-[#3d332e]/5 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl border border-[#e8e3dd] h-96" />
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 md:mb-10 gap-4">
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-[#3d332e] mb-2">
            Mensajes de Contacto
          </h1>
          <p className="text-[#3d332e]/60 text-base">
            Gestiona las consultas y mensajes recibidos desde el sitio web.
          </p>
        </div>
      </div>

      {contactos.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e8e3dd] flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f9f4e8] flex items-center justify-center mb-6">
            <Inbox size={28} className="text-[#3d332e]/20" />
          </div>
          
          <div className="max-w-xs space-y-3">
            <h2 className="text-xl font-bold text-[#3d332e]">
              No hay mensajes aún
            </h2>
            <p className="text-sm text-[#3d332e]/50 leading-relaxed">
              Aquí aparecerán las consultas de tus clientes cuando completen el formulario de contacto.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e8e3dd] overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="hidden md:flex items-center gap-4 px-4 py-3 bg-[#fdfbf7] border-b border-[#e8e3dd]">
            <div className="w-[18px] shrink-0" />
            <p className="flex-1 text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30">Contacto / Cliente</p>
            <p className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30 w-32 text-right">Fecha</p>
            <div className="w-8 shrink-0" />
          </div>

          {/* List */}
          <div className="flex flex-col">
            {contactos.map((c) => (
              <ContactoRow 
                key={c.id} 
                c={c} 
                onEliminar={handleEliminar} 
                onToggleLeido={marcarComoLeido} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
