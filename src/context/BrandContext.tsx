"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

interface BrandData {
  nombre: string;
  avatar: string | null;
  bio?: string;
  linkedin?: string;
  correo?: string;
  cargo?: string;
}

interface BrandContextType {
  brand: BrandData;
  loading: boolean;
  actualizarBrand: (data: BrandData) => Promise<void>;
}

const BrandContext = createContext<BrandContextType>({
  brand: { nombre: "", avatar: null, bio: "", linkedin: "", correo: "", cargo: "" },
  loading: true,
  actualizarBrand: async () => {},
});

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandData>({ nombre: "", avatar: null, bio: "", linkedin: "", correo: "", cargo: "" });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadBrand = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("full_name, avatar_url, bio, linkedin, correo, cargo")
            .eq("id", user.id)
            .single();

          if (data && !error) {
            setBrand({
              nombre: data.full_name || "",
              avatar: data.avatar_url,
              bio: data.bio || "",
              linkedin: data.linkedin || "",
              correo: data.correo || "",
              cargo: data.cargo || "",
            });
          }
        }
      } catch (error) {
        console.error("Error loading brand data from Supabase:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBrand();
  }, []);

const actualizarBrand = async (data: BrandData) => {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No hay una sesión de usuario activa.");

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: data.nombre,
        avatar_url: data.avatar,
        bio: data.bio,
        linkedin: data.linkedin,
        correo: data.correo,
        cargo: data.cargo,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Supabase error detail:", error);
      throw error;
    }
    
    setBrand(data);
  } catch (error) {
    console.error("Error updating brand data in Supabase:", error);
    throw error;
  }
};

  return (
    <BrandContext.Provider value={{ brand, loading, actualizarBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
