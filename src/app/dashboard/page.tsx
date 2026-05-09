"use client";

import { Eye, Layers, BookOpen, ChevronRight, FileText } from "lucide-react";
import { useBrand } from "@/context/BrandContext";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
  const { brand, loading: brandLoading } = useBrand();
  const [counts, setCounts] = useState({
    articulos: 0,
    productos: 0,
    visitas: 1240, // Placeholder
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient();
      
      const [articulosRes, productosRes] = await Promise.all([
        supabase.from("articulos").select("*", { count: "exact", head: true }),
        supabase.from("productos").select("*", { count: "exact", head: true })
      ]);

      setCounts({
        articulos: articulosRes.count || 0,
        productos: productosRes.count || 0,
        visitas: 1240,
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  if (brandLoading || loading) {
    return (
      <div className="p-5 md:p-10 animate-pulse">
        <div className="h-10 w-64 bg-[#3d332e]/5 rounded-lg mb-4" />
        <div className="h-4 w-96 bg-[#3d332e]/5 rounded-lg mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-xl border border-[#e8e3dd]" />)}
        </div>
      </div>
    );
  }

  const displayName = brand.nombre || "Usuario";

  const stats = [
    {
      label: "PRODUCTOS EN CATÁLOGO",
      value: counts.productos.toString(),
      change: "Gestión total",
      changeLabel: "productos activos",
      changeColor: "text-green-600",
      icon: Layers,
      iconColor: "text-blue-400",
    },
    {
      label: "ARTÍCULOS PUBLICADOS",
      value: counts.articulos.toString(),
      change: "Contenido CMS",
      changeLabel: "entradas de blog",
      changeColor: "text-green-600",
      icon: FileText,
      iconColor: "text-[#f15a24]",
    },
    {
      label: "VISITAS ESTIMADAS",
      value: counts.visitas.toLocaleString(),
      change: "↑ 12%",
      changeLabel: "vs mes anterior",
      changeColor: "text-green-600",
      icon: Eye,
      iconColor: "text-blue-400",
      changeBadge: true,
    },
  ];

  const activity = [
    {
      initials: brand.nombre?.[0] || "U",
      name: displayName,
      action: "ha actualizado el perfil de",
      target: "Brand Identity",
      time: "Recientemente",
    },
    {
      initials: "S",
      name: "Sistema",
      action: "sincronizó los datos con",
      target: "Supabase DB",
      time: "En tiempo real",
    },
  ];

  return (
    <div className="p-5 md:p-10 pb-20 md:pb-10">
      {/* Greeting - desktop only */}
      <div className="hidden md:block mb-10">
        <h1 className="text-xl font-bold text-[#3d332e] mb-2">
          Hola, {displayName} 👋
        </h1>
        <p className="text-[#3d332e]/60 text-base leading-relaxed">
          Aquí tienes un resumen real de tu plataforma. Los datos se actualizan automáticamente
          desde tu base de datos de Supabase.
        </p>
      </div>

      {/* Stats */}
      <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 mb-6 overflow-x-auto pb-2 md:pb-0 no-scrollbar snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex-shrink-0 w-[240px] md:w-full bg-white rounded-xl border border-[#e8e3dd] p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow snap-center"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] md:text-[10px] font-semibold tracking-widest text-[#3d332e]/40 uppercase">
                {stat.label}
              </span>
              <stat.icon size={18} className={stat.iconColor} />
            </div>
            <p className="text-xl md:text-3xl font-bold text-[#3d332e] mb-3">{stat.value}</p>
            <div className="flex items-center gap-2 text-sm">
              {stat.changeBadge ? (
                <span className="bg-[#f9f4e8] text-[#3d332e]/70 text-[10px] md:text-xs px-2 py-0.5 rounded-md font-medium">
                  {stat.change}
                </span>
              ) : (
                <span className={`font-semibold text-[10px] md:text-xs ${stat.changeColor}`}>
                  {stat.change}
                </span>
              )}
              <span className="text-[#3d332e]/40 text-[10px] md:text-xs">{stat.changeLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-[#e8e3dd] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-[#3d332e] text-base">Actividad del sistema</h2>
          <button className="text-sm text-[#3d332e]/40 hover:text-[#f15a24] transition-colors">
            Ver todo
          </button>
        </div>

        <div className="flex flex-col divide-y divide-[#e8e3dd]">
          {activity.map((item) => (
            <div
              key={item.initials + item.time}
              className="flex items-center gap-4 py-4 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#3d332e] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#3d332e]">
                  <span className="font-semibold">{item.name}</span>{" "}
                  {item.action}{" "}
                  <span className="font-semibold">{item.target}</span>
                </p>
                <p className="text-xs text-[#3d332e]/40 mt-0.5">{item.time}</p>
              </div>
              <ChevronRight
                size={16}
                className="text-[#3d332e]/20 group-hover:text-[#3d332e]/50 transition-colors shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
