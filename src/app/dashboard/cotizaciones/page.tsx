"use client";

import { useCotizaciones, Cotizacion } from "@/context/CotizacionesContext";
import { useProductos } from "@/context/ProductosContext";
import { 
  Inbox, 
  Building2, 
  Trash2, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  Circle,
  Package,
  X,
  User,
  Calendar,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import Image from "next/image";
import DeleteModal from "@/components/DeleteModal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function CotizacionDrawer({ 
  cotizacion, 
  onClose, 
  onToggleLeido 
}: { 
  cotizacion: Cotizacion; 
  onClose: () => void;
  onToggleLeido: (id: string, leido: boolean) => void;
}) {
  const { productos: allProducts } = useProductos();
  if (!cotizacion) return null;

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
        className="relative w-full max-w-lg bg-[#fdfbf7] h-full shadow-2xl flex flex-col border-l border-[#e8e3dd]"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#e8e3dd] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f9f4e8] flex items-center justify-center text-[#74865e]">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#3d332e]">Detalle de Cotización</h3>
              <p className="text-[10px] text-[#3d332e]/40 uppercase font-bold tracking-widest">Empresa / Pyme</p>
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
          {/* Header Info */}
          <div className="space-y-6">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-bold text-[#3d332e]/30 uppercase tracking-[0.2em]">Empresa</span>
               <p className="text-2xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)] leading-tight">{cotizacion.empresa}</p>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-[#e8e3dd] shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#3d332e] flex items-center justify-center text-white text-xs font-bold">
                     {cotizacion.contacto[0]}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-[#3d332e]">{cotizacion.contacto}</p>
                     <p className="text-[10px] text-[#3d332e]/40 font-bold uppercase tracking-widest">Persona de contacto</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#e8e3dd]/50">
                  <a href={`mailto:${cotizacion.email}`} className="text-xs font-semibold text-[#f15a24] hover:underline flex items-center gap-2">
                    <Mail size={12} /> {cotizacion.email}
                  </a>
                  <a href={`https://wa.me/${cotizacion.tel.replace(/\D/g, '')}`} target="_blank" className="text-xs font-semibold text-[#3d332e] flex items-center gap-2">
                    <Phone size={12} className="text-[#25D366]" /> {cotizacion.tel}
                  </a>
                </div>
             </div>
          </div>

          {/* Products List */}
          <div className="space-y-4">
             <h4 className="text-[10px] font-bold text-[#3d332e]/40 uppercase tracking-[0.2em] flex items-center gap-2">
               <Package size={12} /> Productos Solicitados
             </h4>
             <div className="bg-white rounded-2xl border border-[#e8e3dd] overflow-hidden shadow-sm">
                {cotizacion.productos.seleccionados.map((pid) => {
                  const product = allProducts.find(p => p.id === pid);
                  return (
                    <div key={pid} className="flex items-center justify-between px-4 py-3 border-b border-[#e8e3dd] last:border-0 group/item">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#fdfbf7] border border-[#e8e3dd]/50 overflow-hidden relative flex-shrink-0">
                          {product?.imagen ? (
                            <Image src={product.imagen} alt="" fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#3d332e]/20 text-[10px]">IMG</div>
                          )}
                        </div>
                        <span className="text-sm font-bold text-[#3d332e]">{product?.nombre || 'Producto eliminado'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#74865e] bg-[#74865e]/5 px-3 py-1 rounded-full border border-[#74865e]/10">
                          {cotizacion.productos.cantidades[pid] || '0'} uds.
                        </span>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* Additional Details */}
          {cotizacion.detalleAdicional && (
            <div className="space-y-3">
               <span className="text-[10px] font-bold text-[#3d332e]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                 <MessageSquare size={12} /> Comentarios adicionales
               </span>
               <div className="bg-[#f9f4e8]/50 p-6 rounded-[2rem] border border-[#e8e3dd] italic text-[#3d332e]/80 text-sm leading-relaxed">
                  &quot;{cotizacion.detalleAdicional}&quot;
               </div>
            </div>
          )}

          {/* Footer Metadata */}
          <div className="pt-6 border-t border-[#e8e3dd] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-[#3d332e]/40 font-medium">
              <Calendar size={12} />
              Solicitado el {formatDate(cotizacion.creadoEn)}
            </div>
            <button 
              onClick={() => onToggleLeido(cotizacion.id, !cotizacion.leido)}
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                cotizacion.leido 
                ? "border-[#3d332e]/10 text-[#3d332e]/40" 
                : "border-[#74865e]/20 bg-[#74865e]/5 text-[#74865e]"
              }`}
            >
              {cotizacion.leido ? "Marcar pendiente" : "Marcar gestionado"}
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-6 bg-white border-t border-[#e8e3dd] flex gap-3">
          <a 
            href={`mailto:${cotizacion.email}?subject=Cotización 12 en Punto - ${cotizacion.empresa}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#3d332e] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#2a2220] transition-all shadow-lg shadow-[#3d332e]/10"
          >
             Enviar Propuesta
          </a>
          <a 
            href={`https://wa.me/${cotizacion.tel.replace(/\D/g, '')}`}
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

function CotizacionRow({ 
  c, 
  onEliminar, 
  onToggleLeido,
  onClick
}: { 
  c: Cotizacion; 
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
            <CheckCircle size={18} className="text-[#3d332e]/20 hover:text-[#74865e]" />
          ) : (
            <Circle size={18} className="text-[#74865e] fill-[#74865e]/10" />
          )}
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className={`text-sm font-bold truncate ${!c.leido ? "text-[#3d332e]" : "text-[#3d332e]/60"}`}>
              {c.empresa}
            </p>
            {!c.leido && (
              <span className="text-[9px] font-bold bg-[#74865e] text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Nueva</span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-[#3d332e]/40">
            <span className="font-semibold text-[#3d332e]/60">{c.contacto}</span>
            <span className="hidden lg:flex items-center gap-1"><Package size={10} /> {c.productos.seleccionados.length} items</span>
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
          <ChevronRight size={16} className="text-[#3d332e]/10 group-hover:text-[#3d332e]/30 transition-colors" />
        </div>
      </div>
    </div>
  );
}

export default function CotizacionesPage() {
  const { cotizaciones, loading, eliminarCotizacion, marcarComoLeido } = useCotizaciones();
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });

  const handleEliminar = async () => {
    if (!deleteModal.id) return;
    try {
      await eliminarCotizacion(deleteModal.id);
      toast.success("Cotización eliminada");
      if (selectedCotizacion?.id === deleteModal.id) setSelectedCotizacion(null);
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      toast.error("Error al eliminar");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-5 md:p-10 animate-pulse">
        <div className="hidden md:block mb-10">
          <div className="h-10 w-72 bg-[#3d332e]/5 rounded-lg mb-2" />
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
            Cotizaciones Pymes & Empresas
          </h1>
          <p className="text-[#3d332e]/60 text-base">
            Gestiona las solicitudes de cotización para Pymes y Empresas.
          </p>
        </div>
      </div>

      {cotizaciones.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e8e3dd] flex flex-col items-center justify-center py-24 px-6 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#f9f4e8] flex items-center justify-center mb-6">
            <Building2 size={28} className="text-[#3d332e]/20" />
          </div>
          
          <div className="max-w-xs space-y-3">
            <h2 className="text-xl font-bold text-[#3d332e]">
              Sin solicitudes aún
            </h2>
            <p className="text-sm text-[#3d332e]/50 leading-relaxed">
              Las cotizaciones que envíen las empresas desde el portal corporativo aparecerán aquí.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e8e3dd] overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="hidden md:flex items-center gap-4 px-4 py-3 bg-[#fdfbf7] border-b border-[#e8e3dd]">
            <div className="w-[18px] shrink-0" />
            <p className="flex-1 text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30">Empresa / Contacto</p>
            <p className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#3d332e]/30 w-32 text-right">Fecha Solicitud</p>
            <div className="w-14 shrink-0" />
          </div>

          {/* List */}
          <div className="flex flex-col">
            {cotizaciones.map((c) => (
              <CotizacionRow 
                key={c.id} 
                c={c} 
                onEliminar={(id) => setDeleteModal({ isOpen: true, id })} 
                onToggleLeido={marcarComoLeido} 
                onClick={() => setSelectedCotizacion(c)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {selectedCotizacion && (
          <CotizacionDrawer 
            cotizacion={selectedCotizacion} 
            onClose={() => setSelectedCotizacion(null)} 
            onToggleLeido={marcarComoLeido}
          />
        )}
      </AnimatePresence>

      <DeleteModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleEliminar}
        title="¿Eliminar cotización?"
        description="Esta acción no se puede deshacer. La solicitud de cotización se borrará permanentemente."
      />
    </div>
  );
}
