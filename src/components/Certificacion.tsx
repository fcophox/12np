"use client";

import AppImage from "@/components/ui/AppImage";
import { Lightbulb, Palette, Handshake, Leaf } from "lucide-react";
import BlurFadeIn from "./BlurFadeIn";

export default function Certificacion() {
  return (
    <section className="w-full py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <BlurFadeIn className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-8 space-y-6">
            <span className="text-[#f15a24] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Nuestra Excelencia</span>
            <h2 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-[1.15] text-[#1a1a1a] tracking-tight">
              Impulsados por la técnica
            </h2>
             <p className="text-[clamp(0.8rem,2vw,1rem)] text-gray-500 leading-relaxed font-medium max-w-[600px]">
              Creemos que la pastelería excepcional nace de un equilibrio perfecto entre la precisión técnica y la creatividad sin límites.
            </p>

          </div>
          
        </BlurFadeIn>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Large Image */}
          <BlurFadeIn delay={0.1} className="lg:col-span-4 relative aspect-[4/5] lg:aspect-auto rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
            <AppImage
              src="/images/team/chita.jpg"
              alt="Proceso de Certificación"
              variant="fill"
              className="object-cover"
            />
          </BlurFadeIn>

          {/* Right: Feature Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-8 h-full">
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8" strokeWidth={1.5} />}
              title="Técnica con Propósito"
              description="Aplicamos conocimientos avanzados para que cada receta tenga una estructura perfecta y un sabor inolvidable."
              delay={0.2}
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8" strokeWidth={1.5} />}
              title="Creatividad con Claridad"
              description="Diseñamos cada postre con una visión clara, uniendo estética, texturas y sabores que inspiran y que llenan el corazón."
              delay={0.3}
            />
            <FeatureCard
              icon={<Handshake className="w-8 h-8" strokeWidth={1.5} />}
              title="Calidad y Confianza"
              description="Construimos relaciones honestas con nuestros clientes a través de la transparencia y excelencia en cada entrega."
              delay={0.4}
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8" strokeWidth={1.5} />}
              title="Crecimiento con Integridad"
              description="Buscamos una mejora continua centrada en la calidad ética, el valor a largo plazo y resultados que fortalecen la confianza."
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <BlurFadeIn delay={delay} className="h-full">
      <div className="bg-white p-10 rounded-[3rem] border border-black/5 flex flex-col justify-between items-start h-full shadow-sm hover:shadow-xl transition-all duration-500 group">
        <div className="w-12 h-12 flex items-center justify-center text-[#1a1a1a] mb-8 group-hover:scale-110 group-hover:text-[#f15a24] transition-all duration-300">
          {icon}
        </div>
        <div>
          <h3 className="text-[clamp(1.1rem,2.5vw,1.4rem)] font-bold text-[#1a1a1a] mb-4 font-[family-name:var(--font-fraunces)]">
            {title}
          </h3>
          <p className="text-[clamp(0.85rem,1.5vw,1rem)] text-gray-500 leading-relaxed max-w-[280px]">
            {description}
          </p>
        </div>
      </div>
    </BlurFadeIn>
  );
}
