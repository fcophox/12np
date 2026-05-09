"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

export interface Articulo {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  contenido: string;
  estado: "borrador" | "revision" | "publicado" | "archivado";
  categoria: string;
  etiquetas: string;
  autorNombre: string;
  autorCargo: string;
  coverPreview: string | null;
  autorPreview: string | null;
  destacado: boolean;
  creadoEn: string;
}

interface ArticuloDB {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  contenido: string;
  estado: string;
  categoria: string;
  etiquetas: string;
  autor_nombre: string;
  autor_cargo: string;
  cover_url: string | null;
  autor_url: string | null;
  destacado: boolean;
  created_at: string;
}

interface ArticulosContextType {
  articulos: Articulo[];
  loading: boolean;
  agregarArticulo: (a: Omit<Articulo, "id" | "creadoEn">) => Promise<void>;
  eliminarArticulo: (id: string) => Promise<void>;
  actualizarArticulo: (a: Articulo) => Promise<void>;
  recargarArticulos: () => Promise<void>;
}

const ArticulosContext = createContext<ArticulosContextType>({
  articulos: [],
  loading: true,
  agregarArticulo: async () => {},
  eliminarArticulo: async () => {},
  actualizarArticulo: async () => {},
  recargarArticulos: async () => {},
});

export function ArticulosProvider({ children }: { children: ReactNode }) {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);


  const loadArticulos = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("articulos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const mapped = (data as ArticuloDB[] || []).map((a) => ({
        id: a.id,
        titulo: a.titulo,
        slug: a.slug,
        descripcion: a.descripcion,
        contenido: a.contenido,
        estado: a.estado as any,
        categoria: a.categoria,
        etiquetas: a.etiquetas,
        autorNombre: a.autor_nombre,
        autorCargo: a.autor_cargo,
        coverPreview: a.cover_url,
        autorPreview: a.autor_url,
        destacado: a.destacado || false,
        creadoEn: a.created_at
      }));

      setArticulos(mapped);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticulos();
  }, []);

  const agregarArticulo = async (a: Omit<Articulo, "id" | "creadoEn">) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (a.destacado) {
      await supabase.from("articulos").update({ destacado: false }).eq("destacado", true);
    }

    const { error } = await supabase
      .from("articulos")
      .insert([{
        titulo: a.titulo,
        slug: a.slug,
        descripcion: a.descripcion,
        contenido: a.contenido,
        estado: a.estado,
        categoria: a.categoria,
        etiquetas: a.etiquetas,
        autor_nombre: a.autorNombre,
        autor_cargo: a.autorCargo,
        cover_url: a.coverPreview,
        autor_url: a.autorPreview,
        destacado: a.destacado,
        user_id: user?.id
      }]);

    if (error) throw error;
    await loadArticulos();
  };

  const eliminarArticulo = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("articulos")
      .delete()
      .eq("id", id);

    if (error) throw error;
    setArticulos(prev => prev.filter(a => a.id !== id));
  };

  const actualizarArticulo = async (a: Articulo) => {
    const supabase = createClient();
    if (a.destacado) {
      await supabase.from("articulos").update({ destacado: false }).eq("destacado", true);
    }

    const { error } = await supabase
      .from("articulos")
      .update({
        titulo: a.titulo,
        slug: a.slug,
        descripcion: a.descripcion,
        contenido: a.contenido,
        estado: a.estado,
        categoria: a.categoria,
        etiquetas: a.etiquetas,
        autor_nombre: a.autorNombre,
        autor_cargo: a.autorCargo,
        cover_url: a.coverPreview,
        autor_url: a.autorPreview,
        destacado: a.destacado
      })
      .eq("id", a.id);

    if (error) throw error;
    await loadArticulos();
  };

  return (
    <ArticulosContext.Provider value={{ 
      articulos, 
      loading, 
      agregarArticulo, 
      eliminarArticulo, 
      actualizarArticulo,
      recargarArticulos: loadArticulos 
    }}>
      {children}
    </ArticulosContext.Provider>
  );
}

export function useArticulos() {
  return useContext(ArticulosContext);
}
