"use client";

import Image from "next/image";
import { Utensils, ShoppingBag } from "lucide-react";
import B2BBanner from "@/components/B2BBanner";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LaCartaClient() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const supabase = createClient();
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .eq("pausado", false)
          .order("orden", { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Obtener categorías únicas de los productos
  const categories = ["Todos", ...Array.from(new Set(products.map(p => p.etiqueta).filter(Boolean)))];

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter(p => p.etiqueta === activeCategory);

  if (loading) {
    return (
      <div className="flex flex-col w-full bg-[#fdfbf7] min-h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#3d332e]/10 border-t-[#f15a24] rounded-full animate-spin mb-4" />
        <p className="text-[#3d332e]/40 font-medium">Cargando nuestra carta...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#fdfbf7] min-h-screen">
      {/* Header */}
      <header className="w-full pt-12 md:pt-12 pb-12 px-8 md:px-16 text-center space-y-6">
        <div className="max-w-7xl mx-auto">
          <span className="block text-[#f15a24] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in-up">Experiencia Galería</span>
          <h1 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a] tracking-tight">
            La Carta
          </h1>
          <p className="mt-3 sm:mt-8 text-[clamp(0.8rem,2vw,1rem)] text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            Una selección curada de nuestras mejores creaciones, preparadas cada día con ingredientes locales y pasión artesanal.
          </p>
        </div>
      </header>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="w-full flex md:justify-center overflow-x-auto no-scrollbar scroll-smooth px-8 mb-10 md:mb-16 animate-fade-in-up [animation-delay:600ms] snap-x snap-mandatory">
          <div className="flex flex-nowrap gap-3 min-w-max mx-auto md:mx-0">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-shrink-0 snap-center ${activeCategory === cat ? 'bg-[#3d332e] text-white shadow-xl shadow-[#3d332e]/20 scale-105' : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid Galeria */}
      <section className="w-full px-8 md:px-16 pb-32" aria-label="Productos">
        <h2 className="sr-only">Nuestros productos</h2>
        
        {filteredProducts.length === 0 ? (
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag size={40} className="text-[#3d332e]/10 mb-4" />
            <p className="text-[#3d332e]/40 font-medium font-[family-name:var(--font-fraunces)] text-xl">Pronto tendremos novedades en esta categoría</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout="position"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{
                    opacity: { duration: 0.3 },
                    filter: { duration: 0.3 },
                    layout: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
                  }}
                  className="group bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f9f4e8]">
                    {product.imagen ? (
                      <Image
                        src={product.imagen}
                        alt={product.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={40} className="text-[#3d332e]/5" />
                      </div>
                    )}
                    {product.etiqueta && (
                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest shadow-sm">
                        {product.etiqueta}
                      </div>
                    )}
                    {product.destacado && (
                      <div className="absolute top-6 right-6 px-3 py-1.5 bg-[#f15a24] text-white rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                        Destacado
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a] group-hover:text-[#f15a24] transition-colors leading-tight">
                        {product.nombre}
                      </h3>
                      {product.precio && (
                        <span className="text-sm font-bold text-[#3d332e]">${product.precio.toLocaleString("es-CL")}</span>
                      )}
                    </div>

                    <p className="text-gray-400 text-xs font-medium leading-relaxed flex-1">
                      {product.frase}
                    </p>

                    {(product.etiquetas?.length > 0) && (
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <Utensils size={14} className="text-[#f15a24]" />
                        <span>{product.etiquetas.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <B2BBanner />
    </div>
  );
}
