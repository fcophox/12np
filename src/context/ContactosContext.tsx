"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

export interface Contacto {
  id: string;
  nombre: string;
  email: string;
  whatsapp: string;
  mensaje: string;
  leido: boolean;
  creadoEn: string;
}

interface ContactoDB {
  id: string;
  nombre: string;
  email: string;
  whatsapp: string;
  mensaje: string;
  leido: boolean;
  created_at: string;
}

interface ContactosContextType {
  contactos: Contacto[];
  loading: boolean;
  eliminarContacto: (id: string) => Promise<void>;
  marcarComoLeido: (id: string, leido: boolean) => Promise<void>;
  recargarContactos: () => Promise<void>;
}

const ContactosContext = createContext<ContactosContextType>({
  contactos: [],
  loading: true,
  eliminarContacto: async () => {},
  marcarComoLeido: async () => {},
  recargarContactos: async () => {},
});

export function ContactosProvider({ children }: { children: ReactNode }) {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContactos = useCallback(async (isInitial = false) => {
    if (!isInitial) setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("contactos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading contacts:", error);
        return;
      }
      
      const mapped = (data as ContactoDB[] || []).map((c) => ({
        id: c.id,
        nombre: c.nombre,
        email: c.email,
        whatsapp: c.whatsapp,
        mensaje: c.mensaje,
        leido: c.leido || false,
        creadoEn: c.created_at
      }));

      setContactos(mapped);
    } catch (error) {
      console.error("Error loading contacts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContactos(true);
  }, [loadContactos]);

  const eliminarContacto = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("contactos")
      .delete()
      .eq("id", id);

    if (error) throw error;
    setContactos(prev => prev.filter(c => c.id !== id));
  };

  const marcarComoLeido = async (id: string, leido: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("contactos")
      .update({ leido })
      .eq("id", id);

    if (error) throw error;
    setContactos(prev => prev.map(c => c.id === id ? { ...c, leido } : c));
  };

  return (
    <ContactosContext.Provider value={{ 
      contactos, 
      loading, 
      eliminarContacto, 
      marcarComoLeido,
      recargarContactos: () => loadContactos() 
    }}>
      {children}
    </ContactosContext.Provider>
  );
}

export function useContactos() {
  return useContext(ContactosContext);
}
