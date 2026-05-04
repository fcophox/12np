import { Eye, Users, BookOpen, ChevronRight } from "lucide-react";

const stats = [
  {
    label: "VISITAS DEL MES",
    value: "24,592",
    change: "↑ 12%",
    changeLabel: "vs mes anterior",
    changeColor: "text-green-600",
    icon: Eye,
    iconColor: "text-blue-400",
  },
  {
    label: "USUARIOS ACTIVOS",
    value: "8,249",
    change: "↑ 5%",
    changeLabel: "vs mes anterior",
    changeColor: "text-green-600",
    icon: Users,
    iconColor: "text-blue-400",
  },
  {
    label: "PEDIDOS DEL MES",
    value: "142",
    change: "3 en proceso",
    changeLabel: "pendientes",
    changeColor: "text-[#3d332e]/50",
    icon: BookOpen,
    iconColor: "text-[#f15a24]",
    changeBadge: true,
  },
];

const activity = [
  {
    initials: "CA",
    name: "Carlos A.",
    action: "ha editado el artículo",
    target: "'Novedades Q3'",
    time: "Hace 2 horas",
  },
  {
    initials: "MJ",
    name: "María J.",
    action: "ha subido una nueva imagen a",
    target: "'Galería Principal'",
    time: "Hace 5 horas",
  },
  {
    initials: "SP",
    name: "Sistema",
    action: "creó una copia de seguridad de",
    target: "Base de Datos",
    time: "Ayer a las 23:00",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-10 max-w-5xl">
      {/* Greeting */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#3d332e] mb-2">
          Hola, Francisco 👋
        </h1>
        <p className="text-[#3d332e]/60 text-base leading-relaxed">
          Aquí tienes un resumen de la actividad más reciente en tu plataforma.
          <br />
          Administra tus recursos eficientemente.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[#e8e3dd] p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold tracking-widest text-[#3d332e]/40 uppercase">
                {stat.label}
              </span>
              <stat.icon size={20} className={stat.iconColor} />
            </div>
            <p className="text-3xl font-bold text-[#3d332e] mb-3">{stat.value}</p>
            <div className="flex items-center gap-2 text-sm">
              {stat.changeBadge ? (
                <span className="bg-[#f9f4e8] text-[#3d332e]/70 text-xs px-2 py-0.5 rounded-md font-medium">
                  {stat.change}
                </span>
              ) : (
                <span className={`font-semibold text-xs ${stat.changeColor}`}>
                  {stat.change}
                </span>
              )}
              <span className="text-[#3d332e]/40 text-xs">{stat.changeLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-[#e8e3dd] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-[#3d332e] text-base">Actividad reciente</h2>
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
