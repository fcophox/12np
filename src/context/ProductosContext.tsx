"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

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

interface ProductoDB {
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
  created_at: string;
}

interface ProductosContextType {
  productos: Producto[];
  loading: boolean;
  agregarProducto: (p: Omit<Producto, "id" | "creadoEn">) => Promise<void>;
  eliminarProducto: (id: string) => Promise<void>;
  actualizarProducto: (p: Producto) => Promise<void>;
  pausarProducto: (id: string) => Promise<void>;
  recargarProductos: () => Promise<void>;
}

const ProductosContext = createContext<ProductosContextType>({
  productos: [],
  loading: true,
  agregarProducto: async () => {},
  eliminarProducto: async () => {},
  actualizarProducto: async () => {},
  pausarProducto: async () => {},
  recargarProductos: async () => {},
});

export function ProductosProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);


  const loadProductos = useCallback(async (isInitial = false) => {
    if (!isInitial) setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("orden", { ascending: true });

      if (error) throw error;
      
      const mapped = (data as ProductoDB[] || []).map((p) => ({
        id: p.id,
        nombre: p.nombre,
        frase: p.frase,
        etiqueta: p.etiqueta,
        etiquetas: p.etiquetas || [],
        orden: p.orden,
        precio: p.precio,
        destacado: p.destacado,
        pausado: p.pausado,
        imagen: p.imagen,
        creadoEn: p.created_at
      }));

      setProductos(mapped);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductos(true);
  }, [loadProductos]);

  const agregarProducto = async (p: Omit<Producto, "id" | "creadoEn">) => {
    const supabase = createClient();
    // 1. Fetch current products to calculate new positions
    const { data: actuales } = await supabase
      .from("productos")
      .select("*")
      .order("orden", { ascending: true });

    const lista = (actuales as ProductoDB[] || []);
    
    // 2. Prepare new product (temporary ID for positioning)
    const nuevoTemp = { ...p, id: 'temp' };
    
    // 3. Insert at desired position
    const desiredIndex = Math.max(0, p.orden - 1);
    lista.splice(desiredIndex, 0, nuevoTemp);

    // 4. Calculate all new orders
    const updates = lista
      .map((item, index) => {
        // We need to handle both Producto and ProductoDB types here
        const base = {
          id: item.id,
          nombre: item.nombre,
          frase: item.frase,
          etiqueta: item.etiqueta,
          etiquetas: item.etiquetas,
          precio: item.precio,
          destacado: item.destacado,
          pausado: item.pausado,
          imagen: item.imagen,
          orden: index + 1
        };
        return base;
      })
      .filter((item) => item.id !== 'temp');

    // 5. Insert new product and update others
    const { error: insertError } = await supabase
      .from("productos")
      .insert([{ ...p, orden: desiredIndex + 1 }]);

    if (insertError) throw insertError;

    if (updates.length > 0) {
      const { error: updateError } = await supabase
        .from("productos")
        .upsert(updates);
      if (updateError) console.error("Error updating others:", updateError);
    }

    await loadProductos();
  };

  const eliminarProducto = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("productos")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    // After delete, normalize orders to close the gap
    const { data: restantes } = await supabase
      .from("productos")
      .select("*")
      .order("orden", { ascending: true });
    
    if (restantes) {
      const updates = (restantes as ProductoDB[]).map((p, i) => ({
        id: p.id,
        nombre: p.nombre,
        frase: p.frase,
        etiqueta: p.etiqueta,
        etiquetas: p.etiquetas,
        orden: i + 1,
        precio: p.precio,
        destacado: p.destacado,
        pausado: p.pausado,
        imagen: p.imagen
      }));
      await supabase.from("productos").upsert(updates);
    }
    
    await loadProductos();
  };

  const actualizarProducto = async (p: Producto) => {
    const supabase = createClient();
    // 1. Fetch all except the one being updated
    const { data: actuales } = await supabase
      .from("productos")
      .select("*")
      .neq("id", p.id)
      .order("orden", { ascending: true });

    const lista = (actuales as ProductoDB[] || []);
    
    // 2. Insert the updated product at its new desired position
    const desiredIndex = Math.max(0, p.orden - 1);
    lista.splice(desiredIndex, 0, p);

    // 3. Normalize all orders
    const updates = lista.map((item, index) => ({
      id: item.id,
      nombre: item.nombre,
      frase: item.frase,
      etiqueta: item.etiqueta,
      etiquetas: item.etiquetas,
      orden: index + 1,
      precio: item.precio,
      destacado: item.destacado,
      pausado: item.pausado,
      imagen: item.imagen
    }));

    // 4. Batch update using upsert
    const { error } = await supabase
      .from("productos")
      .upsert(updates);

    if (error) throw error;
    await loadProductos();
  };

  const pausarProducto = async (id: string) => {
    const supabase = createClient();
    const p = productos.find(x => x.id === id);
    if (!p) return;

    const { error } = await supabase
      .from("productos")
      .update({ pausado: !p.pausado })
      .eq("id", id);

    if (error) throw error;
    setProductos(prev => prev.map(x => x.id === id ? { ...x, pausado: !x.pausado } : x));
  };

  return (
    <ProductosContext.Provider value={{ 
      productos, 
      loading, 
      agregarProducto, 
      eliminarProducto, 
      actualizarProducto, 
      pausarProducto,
      recargarProductos: () => loadProductos() 
    }}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}
