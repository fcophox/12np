"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Layers,
  Palette,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { ArticulosProvider } from "@/context/ArticulosContext";
import { ProductosProvider } from "@/context/ProductosContext";
import { BrandProvider } from "@/context/BrandContext";

const navItems = [
  { label: "Inicio", href: "/dashboard", icon: Home },
  { label: "Brand", href: "/dashboard/brand", icon: Palette },
  { label: "Artículos", href: "/dashboard/articulos", icon: FileText },
  { label: "Productos", href: "/dashboard/productos", icon: Layers },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="h-screen flex overflow-hidden bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside className="w-[210px] shrink-0 bg-white border-r border-[#e8e3dd] flex flex-col h-full">
        {/* Brand header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#e8e3dd]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#3d332e] flex items-center justify-center">
              <Image
                src="/images/brand/12np-v.svg"
                alt="12np"
                width={18}
                height={18}
                className="invert"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-[#3d332e] leading-tight">12enpunto</p>
              <p className="text-[10px] text-[#3d332e]/50 leading-tight">Plataforma</p>
            </div>
          </div>
          <ChevronLeft size={14} className="text-[#3d332e]/30" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[#f9f4e8] text-[#3d332e] font-semibold"
                    : "text-[#3d332e]/60 hover:bg-[#f9f4e8]/60 hover:text-[#3d332e]"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="border-t border-[#e8e3dd] px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#3d332e] flex items-center justify-center text-white text-xs font-bold shrink-0">
            N
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#3d332e] truncate">Francisco</p>
            <p className="text-[10px] text-[#3d332e]/40 truncate">fcojhormazabalh@gmai...</p>
          </div>
          <Link href="/login" className="text-[#3d332e]/30 hover:text-[#f15a24] transition-colors">
            <LogOut size={15} />
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <BrandProvider>
        <ArticulosProvider>
          <ProductosProvider>
            {children}
          </ProductosProvider>
        </ArticulosProvider>
        </BrandProvider>
      </main>
    </div>
  );
}
