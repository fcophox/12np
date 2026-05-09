"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Home,
  FileText,
  Layers,
  Palette,
  LogOut,
  ChevronLeft,
  ChevronLeft as BackIcon,
  Settings,
  MessageSquare,
  ClipboardList,
  Image as ImageIcon,
} from "lucide-react";
import { ArticulosProvider } from "@/context/ArticulosContext";
import { ProductosProvider } from "@/context/ProductosContext";
import { ContactosProvider } from "@/context/ContactosContext";
import { CotizacionesProvider } from "@/context/CotizacionesContext";
import { GaleriaProvider } from "@/context/GaleriaContext";
import { BrandProvider, useBrand } from "@/context/BrandContext";
import { logout } from "@/app/login/actions";

const primaryNavItems = [
  { label: "Inicio", href: "/dashboard", icon: Home },
  { label: "Brand", href: "/dashboard/brand", icon: Palette },
  { label: "Galería", href: "/dashboard/galeria", icon: ImageIcon },
  { label: "Productos", href: "/dashboard/productos", icon: Layers },
  { label: "Artículos", href: "/dashboard/articulos", icon: FileText },
];

const secondaryNavItems = [
  { label: "Contacto", href: "/dashboard/contacto", icon: MessageSquare },
  { label: "Cotizaciones", href: "/dashboard/cotizaciones", icon: ClipboardList },
];

const navItems = [...primaryNavItems, ...secondaryNavItems];

const pageTitles: Record<string, string> = {
  "/dashboard": "Inicio",
  "/dashboard/brand": "Brand",
  "/dashboard/galeria": "Galería",
  "/dashboard/productos": "Productos",
  "/dashboard/articulos": "Artículos",
  "/dashboard/contacto": "Contacto",
  "/dashboard/cotizaciones": "Cotizaciones",
  "/dashboard/articulos/nuevo": "Nuevo artículo",
  "/dashboard/productos/nuevo": "Nuevo producto",
};

function getMobileTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.includes("/editar")) return "Editar producto";
  if (pathname.match(/\/dashboard\/productos\/[^/]+$/)) return "Producto";
  if (pathname.match(/\/dashboard\/articulos\/[^/]+$/)) return "Artículo";
  return "Dashboard";
}

function isRootSection(pathname: string): boolean {
  return Object.keys(pageTitles).slice(0, 7).includes(pathname);
}

interface DashboardShellProps {
  children: React.ReactNode;
  userEmail: string;
  userName: string;
}

export default function DashboardShell({ children, userEmail, userName: initialUserName }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <BrandProvider>
      <DashboardContent 
        pathname={pathname} 
        router={router} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        userEmail={userEmail}
        initialUserName={initialUserName}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      >
        {children}
      </DashboardContent>
    </BrandProvider>
  );
}

interface DashboardContentProps {
  children: React.ReactNode;
  pathname: string;
  router: any;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
  initialUserName: string;
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function DashboardContent({ 
  children, 
  pathname, 
  router, 
  collapsed, 
  setCollapsed, 
  userEmail, 
  initialUserName,
  showMobileMenu,
  setShowMobileMenu
}: DashboardContentProps) {
  const { brand } = useBrand();
  
  const title = getMobileTitle(pathname);
  const isRoot = isRootSection(pathname);

  const displayName = brand.nombre || initialUserName || "Usuario";
  const avatar = brand.avatar;

  // Initial for avatar
  const initial = displayName ? displayName[0].toUpperCase() : "U";

  return (
    <div className="h-screen flex overflow-hidden bg-[#f5f5f5]">

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex shrink-0 bg-white border-r border-[#e8e3dd] flex-col h-full transition-all duration-300 ${
          collapsed ? "w-[60px]" : "w-[210px]"
        }`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#e8e3dd]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-md bg-[#f9f4e8] flex items-center justify-center shrink-0 overflow-hidden">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Image src="/images/brand/12np-v.svg" alt="12np" width={18} height={18} style={{ height: 'auto' }} />
              )}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#3d332e] leading-tight truncate">{displayName}</p>
                <p className="text-[10px] text-[#3d332e]/50 leading-tight">Administrador</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed((v: boolean) => !v)}
            className="text-[#3d332e]/30 hover:text-[#3d332e] transition-colors shrink-0"
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          >
            <ChevronLeft
              size={14}
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5 overflow-y-auto no-scrollbar">
          {primaryNavItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[#f9f4e8] text-[#3d332e] font-semibold"
                    : "text-[#3d332e]/60 hover:bg-[#f9f4e8]/60 hover:text-[#3d332e]"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}

          {/* Separator Section */}
          <div className="mt-6 mb-2 px-3">
            <div className="border-t border-[#e8e3dd] mb-4" />
            {!collapsed && (
              <p className="text-[10px] font-bold text-[#3d332e]/30 uppercase tracking-[0.15em] ml-1">
                Gestión de clientes
              </p>
            )}
          </div>

          {secondaryNavItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[#f9f4e8] text-[#3d332e] font-semibold"
                    : "text-[#3d332e]/60 hover:bg-[#f9f4e8]/60 hover:text-[#3d332e]"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className={`border-t border-[#e8e3dd] px-4 py-4 flex items-center gap-3 ${collapsed ? "justify-center px-2" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-[#3d332e] flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#3d332e] truncate">{displayName}</p>
                <p className="text-[10px] text-[#3d332e]/40 truncate">{userEmail}</p>
              </div>
              <button 
                onClick={async () => await logout()} 
                className="text-[#3d332e]/30 hover:text-[#f15a24] transition-colors cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut size={15} />
              </button>
            </>
          )}
          {collapsed && (
            <button 
              onClick={async () => await logout()} 
              title="Cerrar sesión" 
              className="text-[#3d332e]/30 hover:text-[#f15a24] transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto flex flex-col">

        {/* Mobile top header — app style */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-[#e8e3dd] flex items-center justify-between px-4 h-14 shrink-0">
          {/* Left: back button or logo */}
          {isRoot ? (
            <div className="w-8 h-8 rounded-md bg-[#f9f4e8] flex items-center justify-center overflow-hidden">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Image src="/images/brand/12np-v.svg" alt="12np" width={16} height={16} style={{ height: 'auto' }} />
              )}
            </div>
          ) : (
            <button
              onClick={() => router.back()}
              className="w-8 h-8 flex items-center justify-center text-[#3d332e] -ml-1"
              aria-label="Volver"
            >
              <BackIcon size={20} />
            </button>
          )}

          {/* Center: page title */}
          <p className="text-sm font-semibold text-[#3d332e] absolute left-1/2 -translate-x-1/2">
            {title}
          </p>

          {/* Right: settings icon with dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${showMobileMenu ? 'text-[#f15a24]' : 'text-[#3d332e]/40'}`}
            >
              <Settings size={18} />
            </button>

            {showMobileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-black/5" 
                  onClick={() => setShowMobileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#e8e3dd] shadow-xl z-50 overflow-hidden animate-fade-in-up [animation-duration:200ms]">
                  <Link 
                    href="/dashboard/cotizaciones" 
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#3d332e] hover:bg-[#f9f4e8] transition-colors"
                  >
                    <ClipboardList size={16} className="text-[#3d332e]/40" />
                    <span>Cotizaciones</span>
                  </Link>
                  <Link 
                    href="/dashboard/contacto" 
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#3d332e] hover:bg-[#f9f4e8] transition-colors border-t border-[#f5f5f5]"
                  >
                    <MessageSquare size={16} className="text-[#3d332e]/40" />
                    <span>Contacto</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 w-full max-w-5xl mx-auto">
          <ArticulosProvider>
            <ProductosProvider>
              <ContactosProvider>
                <CotizacionesProvider>
                  <GaleriaProvider>
                    {children}
                  </GaleriaProvider>
                </CotizacionesProvider>
              </ContactosProvider>
            </ProductosProvider>
          </ArticulosProvider>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e8e3dd] flex items-center justify-around px-2 h-16 safe-area-pb">
        {primaryNavItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
            >
              <Icon
                size={22}
                className={`transition-colors ${active ? "text-[#3d332e]" : "text-[#3d332e]/30"}`}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span className={`text-[10px] font-medium transition-colors ${active ? "text-[#3d332e]" : "text-[#3d332e]/30"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
