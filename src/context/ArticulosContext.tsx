"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  creadoEn: string;
}

interface ArticulosContextType {
  articulos: Articulo[];
  agregarArticulo: (a: Articulo) => void;
}

const ArticulosContext = createContext<ArticulosContextType>({
  articulos: [],
  agregarArticulo: () => {},
});

export function ArticulosProvider({ children }: { children: ReactNode }) {
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("articulos");
    if (stored) setArticulos(JSON.parse(stored));
  }, []);

  const agregarArticulo = (a: Articulo) => {
    setArticulos((prev) => {
      const next = [a, ...prev];
      localStorage.setItem("articulos", JSON.stringify(next));
      return next;
    });
  };

  return (
    <ArticulosContext.Provider value={{ articulos, agregarArticulo }}>
      {children}
    </ArticulosContext.Provider>
  );
}

export function useArticulos() {
  return useContext(ArticulosContext);
}
