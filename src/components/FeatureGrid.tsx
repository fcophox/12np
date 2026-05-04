"use client";

import { Leaf, BookOpen, Coffee, Flower } from "lucide-react";
import BlurFadeIn from "./BlurFadeIn";

export default function FeatureGrid() {
  const ITEMS = [
    { icon: Leaf, title: "Ingredientes\nSeleccionados", subtitle: "" },
    { icon: BookOpen, title: "Recetas\nArtesanales", subtitle: "" },
    { icon: Coffee, title: "Café de\nEspecialidad", subtitle: "" },
    { icon: Flower, title: "Inspiración\nJaponesa", subtitle: "" },
  ];

  return (
    <section className="w-full pt-16 pb-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-6 gap-y-0 md:gap-y-6 items-start text-[#3d332e]">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            const borderClass = i > 0 ? "md:pl-8 md:border-l md:border-[#ebe4dd]" : "";
            const mobileBottomBorder = i < 2 ? "border-b border-[#ebe4dd]" : "";
            return (
              <BlurFadeIn key={i} delay={i * 0.1} yOffset={16}>
                <div className={`flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4 py-8 md:py-6 text-center md:text-left ${borderClass} ${mobileBottomBorder} md:border-b-0`}>
                  <div className="flex-shrink-0">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="">
                    <div className="text-[10px] md:text-sm font-bold tracking-[0.12em] uppercase font-[family-name:var(--font-fraunces)] leading-tight">
                      {item.title.split('\n').map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>
                    <div className="mt-1 text-[10px] text-[#a58d7f]">{item.subtitle}</div>
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
