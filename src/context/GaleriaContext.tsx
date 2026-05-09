"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

export interface GaleriaImagen {
  id: string;
  url: string;
  categoria: "hero" | "recuerdos" | "artesanal";
  orden: number;
  creadoEn: string;
}

interface GaleriaContextType {
  imagenes: GaleriaImagen[];
  loading: boolean;
  agregarImagen: (url: string, categoria: "hero" | "recuerdos" | "artesanal") => Promise<void>;
  eliminarImagen: (id: string) => Promise<void>;
  recargarGaleria: () => Promise<void>;
}

const GaleriaContext = createContext<GaleriaContextType>({
  imagenes: [],
  loading: true,
  agregarImagen: async () => {},
  eliminarImagen: async () => {},
  recargarGaleria: async () => {},
});

export function GaleriaProvider({ children }: { children: ReactNode }) {
  const [imagenes, setImagenes] = useState<GaleriaImagen[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGaleria = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("galeria")
        .select("*")
        .order("orden", { ascending: true });

      if (error) {
        console.error("Error loading gallery:", error);
        return;
      }
      
      setImagenes((data || []).map(img => ({
        id: img.id,
        url: img.url,
        categoria: img.categoria,
        orden: img.orden,
        creadoEn: img.created_at
      })));
    } catch (error) {
      console.error("Error loading gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGaleria();
  }, []);

  const agregarImagen = async (url: string, categoria: "hero" | "recuerdos" | "artesanal") => {
    const supabase = createClient();
    
    // Get max order for this category
    const { data: maxData } = await supabase
      .from("galeria")
      .select("orden")
      .eq("categoria", categoria)
      .order("orden", { ascending: false })
      .limit(1);
    
    const nextOrder = (maxData?.[0]?.orden || 0) + 1;

    const { data, error } = await supabase
      .from("galeria")
      .insert([{ url, categoria, orden: nextOrder }])
      .select();

    if (error) throw error;
    if (data) {
      setImagenes(prev => [...prev, {
        id: data[0].id,
        url: data[0].url,
        categoria: data[0].categoria,
        orden: data[0].orden,
        creadoEn: data[0].created_at
      }]);
    }
  };

  const eliminarImagen = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("galeria")
      .delete()
      .eq("id", id);

    if (error) throw error;
    setImagenes(prev => prev.filter(img => img.id !== id));
  };

  return (
    <ContactosProvider>
      <GaleriaContext.Provider value={{ 
        imagenes, 
        loading, 
        agregarImagen, 
        eliminarImagen,
        recargarGaleria: loadGaleria 
      }}>
        {children}
      </GaleriaContext.Provider>
    </ContactosProvider>
  );
}

// Fixed circular dependency / missing provider wrapper in previous turn context management:
// Actually, I'll just keep it clean.
import { ContactosProvider } from "./ContactosContext";

export function useGaleria() {
  return useContext(GaleriaContext);
}
