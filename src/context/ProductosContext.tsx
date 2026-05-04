"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Producto {
  id: string;
  nombre: string;
  frase: string;
  etiqueta: string;
  etiquetas: string[];
  orden: number;
  precio: number | null;
  destacado: boolean;
  pausado: boolean;
  imagen: string | null;
  creadoEn: string;
}

interface ProductosContextType {
  productos: Producto[];
  agregarProducto: (p: Producto) => void;
  eliminarProducto: (id: string) => void;
  actualizarProducto: (p: Producto) => void;
  pausarProducto: (id: string) => void;
}

const ProductosContext = createContext<ProductosContextType>({
  productos: [],
  agregarProducto: () => {},
  eliminarProducto: () => {},
  actualizarProducto: () => {},
  pausarProducto: () => {},
});

export function ProductosProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("productos");
    if (stored) setProductos(JSON.parse(stored));
  }, []);

  const save = (next: Producto[]) => {
    localStorage.setItem("productos", JSON.stringify(next));
    return next;
  };

  const agregarProducto = (p: Producto) => {
    setProductos((prev) => save([...prev, p].sort((a, b) => a.orden - b.orden)));
  };

  const eliminarProducto = (id: string) => {
    setProductos((prev) => save(prev.filter((p) => p.id !== id)));
  };

  const actualizarProducto = (p: Producto) => {
    setProductos((prev) => save(prev.map((x) => x.id === p.id ? p : x).sort((a, b) => a.orden - b.orden)));
  };

  const pausarProducto = (id: string) => {
    setProductos((prev) => save(prev.map((x) => x.id === id ? { ...x, pausado: !x.pausado } : x)));
  };

  return (
    <ProductosContext.Provider value={{ productos, agregarProducto, eliminarProducto, actualizarProducto, pausarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}
