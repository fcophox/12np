import { ClipboardList, Archive } from "lucide-react";

export default function CotizacionesPage() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f8f7f5]">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-[#e8e3dd] px-6 py-6 md:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)]">
              Cotizaciones
            </h1>
            <p className="text-sm text-[#3d332e]/50 mt-1">
              Revisa las solicitudes de cotización para Pymes & Empresas.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content / Empty State */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-5xl mx-auto h-full flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-[#e8e3dd] flex items-center justify-center mb-8 animate-fade-in-up">
            <Archive size={40} className="text-[#3d332e]/20" />
          </div>
          
          <div className="text-center max-w-sm space-y-4 animate-fade-in-up [animation-delay:100ms]">
            <h2 className="text-xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)]">
              Sin solicitudes pendientes
            </h2>
            <p className="text-sm text-[#3d332e]/50 leading-relaxed">
              Las solicitudes de cotización mayorista y para empresas aparecerán en este panel una vez que los clientes completen el flujo en la sección "Pymes & Empresas".
            </p>
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f9f4e8] rounded-full text-[#3d332e]/40 text-xs font-bold uppercase tracking-widest border border-[#e8e3dd]">
                <ClipboardList size={14} />
                Historial de cotizaciones vacío
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
