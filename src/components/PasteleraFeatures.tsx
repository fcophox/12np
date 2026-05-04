"use client";

import { Leaf, BookOpen, Coffee } from "lucide-react";
import BlurFadeIn from "./BlurFadeIn";

export default function PasteleraFeatures() {
  const ITEMS = [
    { number: '01', icon: Leaf, title: "INGREDIENTES\nSELECCIONADOS", subtitle: "", desc: "Seleccionamos cada grano y fruta con una exigencia absoluta." },
    { number: '02', icon: BookOpen, title: "RECETAS\nARTESANALES", subtitle: "", desc: "Nuestras recetas son cuidadosamente elaboradas a mano." },
    { number: '03', icon: Coffee, title: "CAFÉ DE\nESPECIALIDAD", subtitle: "", desc: "Seleccionamos granos de calidad para resaltar cada matiz." },
  ];

  return (
    <section className="w-full bg-[#f9f4e8] text-[#3d332e] py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const borderClass = idx > 0 ? "md:pl-8 md:border-l md:border-[#ebe4dd]" : "";
            return (
              <BlurFadeIn key={idx} delay={idx * 0.15} yOffset={20}>
                <div className={`flex items-start gap-4 py-6 ${borderClass}`}>
                  <div className="flex-shrink-0 pt-1">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-2xl md:text-3xl text-[#f15a24] font-bold">{item.number}</span>
                      <div className="text-sm font-bold tracking-[0.12em] uppercase leading-tight font-[family-name:var(--font-fraunces)]">
                        {item.title.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-[#a58d7f] mt-1">{item.subtitle}</div>
                  </div>
                </div>
              </BlurFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
