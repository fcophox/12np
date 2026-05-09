"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

export interface Cotizacion {
  id: string;
  empresa: string;
  contacto: string;
  email: string;
  tel: string;
  productos: {
    seleccionados: string[];
    cantidades: Record<string, string>;
  };
  detalleAdicional: string;
  leido: boolean;
  creadoEn: string;
}

interface CotizacionDB {
  id: string;
  empresa: string;
  contacto: string;
  email: string;
  tel: string;
  productos: any;
  detalle_adicional: string;
  leido: boolean;
  created_at: string;
}

interface CotizacionesContextType {
  cotizaciones: Cotizacion[];
  loading: boolean;
  eliminarCotizacion: (id: string) => Promise<void>;
  marcarComoLeido: (id: string, leido: boolean) => Promise<void>;
  recargarCotizaciones: () => Promise<void>;
}

const CotizacionesContext = createContext<CotizacionesContextType>({
  cotizaciones: [],
  loading: true,
  eliminarCotizacion: async () => {},
  marcarComoLeido: async () => {},
  recargarCotizaciones: async () => {},
});

export function CotizacionesProvider({ children }: { children: ReactNode }) {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCotizaciones = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cotizaciones")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading quotations:", error);
        return;
      }
      
      const mapped = (data as CotizacionDB[] || []).map((c) => ({
        id: c.id,
        empresa: c.empresa,
        contacto: c.contacto,
        email: c.email,
        tel: c.tel,
        productos: c.productos || { seleccionados: [], cantidades: {} },
        detalleAdicional: c.detalle_adicional,
        leido: c.leido || false,
        creadoEn: c.created_at
      }));

      setCotizaciones(mapped);
    } catch (error) {
      console.error("Error loading quotations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCotizaciones();
  }, []);

  const eliminarCotizacion = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("cotizaciones")
      .delete()
      .eq("id", id);

    if (error) throw error;
    setCotizaciones(prev => prev.filter(c => c.id !== id));
  };

  const marcarComoLeido = async (id: string, leido: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("cotizaciones")
      .update({ leido })
      .eq("id", id);

    if (error) throw error;
    setCotizaciones(prev => prev.map(c => c.id === id ? { ...c, leido } : c));
  };

  return (
    <CotizacionesContext.Provider value={{ 
      cotizaciones, 
      loading, 
      eliminarCotizacion, 
      marcarComoLeido,
      recargarCotizaciones: loadCotizaciones 
    }}>
      {children}
    </CotizacionesContext.Provider>
  );
}

export function useCotizaciones() {
  return useContext(CotizacionesContext);
}
