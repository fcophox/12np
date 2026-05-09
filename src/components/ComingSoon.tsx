import Image from "next/image";
import { Clock, Sparkles, UtensilsCrossed } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen w-full bg-[#f2ebe1] flex flex-col items-center justify-center px-6 py-20 text-[#3d332e] font-[family-name:var(--font-inter)] overflow-hidden">
      <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-10">

        {/* Logo Section */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="animate-fade-in">
            <Image
              src="/images/brand/12np-v.svg"
              alt="12enpunto Logo"
              width={224}
              height={224}
              style={{ height: 'auto' }}
              priority
            />
          </div>
          <div className="space-y-1 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-fraunces)] tracking-tight">
              12 EN PUNTO
            </h1>
            <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase opacity-60">
              CAFÉ & PASTELERÍA
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-3 text-[#f15a24] font-bold tracking-[0.2em] uppercase text-xs md:text-sm animate-fade-in-up [animation-delay:200ms]">
          <Clock size={18} />
          <span>ARTESANAL & FRESCO</span>
        </div>

        {/* Heading */}
        <div className="space-y-6 animate-fade-in-up [animation-delay:400ms]">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-fraunces)] uppercase tracking-tight">
            PRONTO INAUGURAREMOS
          </h2>
          <p className="text-[#3d332e]/70 text-base md:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            Estamos horneando algo increíble. Muy pronto podrás disfrutar de una nueva
            selección de sabores, texturas y momentos dulces diseñados para deleitar tus sentidos.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full pt-10 animate-fade-in-up [animation-delay:600ms]">
          <FeatureItem
            icon={<UtensilsCrossed size={28} className="text-[#f15a24]" />}
            title="Nuevos Sabores"
            desc={"Recetas únicas y\nartesanales"}
          />
          <FeatureItem
            icon={<Sparkles size={28} className="text-[#f15a24]" />}
            title="Calidad Premium"
            desc={"Ingredientes\nseleccionados"}
          />
          <FeatureItem
            icon={<Clock size={28} className="text-[#f15a24]" />}
            title="Siempre a tiempo"
            desc={"Rico, fresco y cercanos\ntodos los días"}
          />
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center space-y-4 group">
      <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-sm uppercase tracking-widest">{title}</h3>
        <p className="text-[10px] text-[#3d332e]/40 font-bold uppercase tracking-wider leading-relaxed whitespace-pre-line">{desc}</p>
      </div>
    </div>
  )
}
