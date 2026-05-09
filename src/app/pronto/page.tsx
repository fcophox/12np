import AppImage from "@/components/ui/AppImage";
import { Clock, Sparkles, UtensilsCrossed } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen w-full bg-[#f2ebe1] flex flex-col items-center justify-center px-6 py-20 text-[#3d332e]">
      <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-12">

        {/* Logo Section */}
        <div className="space-y-6 flex flex-col items-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-80">
            {/* Using a placeholder for the Shiba logo, user can replace this with their SVG/PNG */}
            <AppImage
              src="/images/brand/12np-v.svg"
              alt="Logo"
              variant="fill"
              className="object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-fraunces)] tracking-tight uppercase">
              12 EN PUNTO
            </h1>
            <p className="text-sm md:text-base font-bold tracking-[0.4em] uppercase opacity-60">
              CAFÉ & PASTELERÍA
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3 text-[#f15a24] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
          <Clock size={18} />
          <span>ARTESANAL & FRESCO</span>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-fraunces)] uppercase tracking-tight">
            PRONTO INAUGURAREMOS
          </h2>
          <p className="text-[#3d332e]/70 text-base md:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            Estamos horneando algo increíble. Muy pronto podrás disfrutar de una nueva
            selección de sabores, texturas y momentos dulces diseñados para deleitar tus sentidos.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center space-y-4 group">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-black/5 group-hover:scale-110 transition-transform duration-500">
              <UtensilsCrossed size={32} className="text-[#f15a24]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-widest">Nuevos Sabores</h3>
              <p className="text-xs text-[#3d332e]/50 font-medium leading-relaxed">Recetas únicas y<br />artesanales</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center space-y-4 group">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-black/5 group-hover:scale-110 transition-transform duration-500">
              <Sparkles size={32} className="text-[#f15a24]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-widest">Calidad Premium</h3>
              <p className="text-xs text-[#3d332e]/50 font-medium leading-relaxed">Ingredientes<br />seleccionados</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center space-y-4 group">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-black/5 group-hover:scale-110 transition-transform duration-500">
              <Clock size={32} className="text-[#f15a24]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-widest">Siempre a tiempo</h3>
              <p className="text-xs text-[#3d332e]/50 font-medium leading-relaxed">Rico, fresco y cercanos<br />todos los días</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
