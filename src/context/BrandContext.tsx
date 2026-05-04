"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface BrandData {
  nombre: string;
  avatar: string | null;
}

interface BrandContextType {
  brand: BrandData;
  actualizarBrand: (data: BrandData) => void;
}

const BrandContext = createContext<BrandContextType>({
  brand: { nombre: "", avatar: null },
  actualizarBrand: () => {},
});

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandData>({ nombre: "", avatar: null });

  useEffect(() => {
    const stored = localStorage.getItem("brand");
    if (stored) setBrand(JSON.parse(stored));
  }, []);

  const actualizarBrand = (data: BrandData) => {
    localStorage.setItem("brand", JSON.stringify(data));
    setBrand(data);
  };

  return (
    <BrandContext.Provider value={{ brand, actualizarBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
