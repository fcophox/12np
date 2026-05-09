import { MessageSquare, Inbox } from "lucide-react";

export default function ContactoPage() {
  return (
    <div className="p-5 md:p-10 pb-36 md:pb-10">
      {/* Header - Hidden on mobile as DashboardShell handles it */}
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

      {/* Empty State */}
      <div className="bg-white rounded-xl border border-[#e8e3dd] flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#f9f4e8] flex items-center justify-center mb-6">
          <Inbox size={28} className="text-[#3d332e]/20" />
        </div>
        
        <div className="max-w-xs space-y-3">
          <h2 className="text-xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)]">
            No hay mensajes aún
          </h2>
          <p className="text-sm text-[#3d332e]/50 leading-relaxed">
            Aquí aparecerán las consultas de tus clientes cuando completen el formulario de contacto.
          </p>
        </div>
        
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f9f4e8] rounded-full text-[#3d332e]/40 text-[10px] font-bold uppercase tracking-widest border border-[#e8e3dd]">
            <MessageSquare size={12} />
            Bandeja de entrada vacía
          </div>
        </div>
      </div>
    </div>
  );
}
