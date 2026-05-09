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
  X,
  Send,
  User,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createPortal } from "react-dom";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function ContactoDrawer({ 
  contacto, 
  onClose, 
  onToggleLeido 
}: { 
  contacto: Contacto; 
  onClose: () => void;
  onToggleLeido: (id: string, leido: boolean) => void;
}) {
  if (!contacto) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#3d332e]/40 backdrop-blur-sm"
      />

      {/* Drawer Content */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-[#fdfbf7] h-full shadow-2xl flex flex-col border-l border-[#e8e3dd]"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#e8e3dd] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f9f4e8] flex items-center justify-center text-[#f15a24]">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#3d332e]">Detalle del Contacto</h3>
              <p className="text-[10px] text-[#3d332e]/40 uppercase font-bold tracking-widest">Prospecto Web</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#f9f4e8] rounded-full transition-colors text-[#3d332e]/40"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* User Info Card */}
          <div className="space-y-6">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-bold text-[#3d332e]/30 uppercase tracking-[0.2em]">Nombre</span>
               <p className="text-xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)]">{contacto.nombre}</p>
             </div>

             <div className="grid grid-cols-1 gap-4">
               <div className="bg-white p-4 rounded-2xl border border-[#e8e3dd] shadow-sm">
                 <span className="text-[9px] font-bold text-[#3d332e]/30 uppercase tracking-widest block mb-1">Email</span>
                 <a href={`mailto:${contacto.email}`} className="text-sm font-semibold text-[#f15a24] hover:underline flex items-center gap-2">
                   <Mail size={14} /> {contacto.email}
                 </a>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-[#e8e3dd] shadow-sm">
                 <span className="text-[9px] font-bold text-[#3d332e]/30 uppercase tracking-widest block mb-1">WhatsApp</span>
                 <a href={`https://wa.me/${contacto.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-sm font-semibold text-[#3d332e] flex items-center gap-2">
                   <Phone size={14} className="text-[#25D366]" /> {contacto.whatsapp}
                 </a>
               </div>
             </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
             <span className="text-[10px] font-bold text-[#3d332e]/30 uppercase tracking-[0.2em] flex items-center gap-2">
               <MessageSquare size={12} /> Mensaje Recibido
             </span>
             <div className="bg-white p-6 rounded-[2rem] border border-[#e8e3dd] shadow-sm relative italic leading-relaxed text-[#3d332e]/80 text-sm">
                &quot;{contacto.mensaje}&quot;
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white border border-[#e8e3dd] rotate-45 -z-10" />
             </div>
          </div>

          {/* Metadata */}
          <div className="pt-6 border-t border-[#e8e3dd] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-[#3d332e]/40 font-medium">
              <Calendar size={12} />
              {formatDate(contacto.creadoEn)}
            </div>
            <button 
              onClick={() => onToggleLeido(contacto.id, !contacto.leido)}
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                contacto.leido 
                ? "border-[#3d332e]/10 text-[#3d332e]/40" 
                : "border-[#f15a24]/20 bg-[#f15a24]/5 text-[#f15a24]"
              }`}
            >
              {contacto.leido ? "Marcar como no leído" : "Marcar como leído"}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-[#e8e3dd] flex gap-3">
          <a 
            href={`mailto:${contacto.email}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#3d332e] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#2a2220] transition-all shadow-lg shadow-[#3d332e]/10"
          >
            <Mail size={16} /> Responder
          </a>
          <a 
            href={`https://wa.me/${contacto.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-2xl hover:bg-[#128C7E] transition-all shadow-lg shadow-[#25D366]/20"
          >
            <Phone size={20} />
          </a>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

function ContactoRow({ 
  c, 
  onEliminar, 
  onToggleLeido,
  onClick
}: { 
  c: Contacto; 
  onEliminar: (id: string) => void;
  onToggleLeido: (id: string, leido: boolean) => void;
  onClick: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className={`group border-b border-[#e8e3dd] last:border-0 transition-colors cursor-pointer ${!c.leido ? "bg-[#fdfbf7]" : "bg-white hover:bg-[#fcfaf8]"}`}
    >
      <div className="flex items-center gap-4 px-4 py-4">
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
        <div className="hidden md:block shrink-0 text-right w-32">
          <p className="text-[11px] font-medium text-[#3d332e]/30 flex items-center gap-1 justify-end">
            <Clock size={10} />
            {new Date(c.creadoEn).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
          </p>
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEliminar(c.id);
            }}
            className="p-2 text-[#3d332e]/20 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  const { contactos, loading, eliminarContacto, marcarComoLeido } = useContactos();
  const [selectedContacto, setSelectedContacto] = useState<Contacto | null>(null);

  const handleEliminar = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
      try {
        await eliminarContacto(id);
        toast.success("Mensaje eliminado");
        if (selectedContacto?.id === id) setSelectedContacto(null);
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
          <h1 className="text-xl font-bold text-[#3d332e] mb-2">
            Mensajes de contacto
          </h1>
          <p className="text-[#3d332e]/60 text-base">
            Gestiona las consultas y mensajes recibidos desde el sitio web.
          </p>
        </div>
      </div>

      {contactos.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e8e3dd] flex flex-col items-center justify-center py-24 px-6 text-center shadow-sm">
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
            <div className="w-10 shrink-0" />
          </div>

          {/* List */}
          <div className="flex flex-col">
            {contactos.map((c) => (
              <ContactoRow 
                key={c.id} 
                c={c} 
                onEliminar={handleEliminar} 
                onToggleLeido={marcarComoLeido} 
                onClick={() => setSelectedContacto(c)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {selectedContacto && (
          <ContactoDrawer 
            contacto={selectedContacto} 
            onClose={() => setSelectedContacto(null)} 
            onToggleLeido={marcarComoLeido}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
