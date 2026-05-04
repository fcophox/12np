"use client";

import Image from "next/image";
import { Utensils } from "lucide-react";
import B2BBanner from "@/components/B2BBanner";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MENU_CATEGORIES = ["Todos", "Pâtisserie", "Viennoiserie", "Cafetería"];

const PRODUCTS = [
  {
    id: 1,
    title: "Torta de Chocolate",
    desc: "Un clásico irresistible elaborado con cacao al 70% y ganache suave.",
    caract: "Intenso, suave, artesano",
    category: "Pâtisserie",
    image: "/images/products/products1.webp",
    time: "20 min"
  },
  {
    id: 2,
    title: "Croissant Clásico",
    desc: "Ideal para acompañar con un espresso por la mañana. Mantequilla pura.",
    caract: "Crujiente, aireado, mantequilla",
    category: "Viennoiserie",
    image: "/images/products/products2.webp",
    time: "10 min"
  },
  {
    id: 3,
    title: "Macarons Surtidos",
    desc: "Delicadeza francesa en cada bocado, con rellenos de temporada.",
    caract: "Elegante, variado, dulce",
    category: "Pâtisserie",
    image: "/images/products/products3.webp",
    time: "15 min"
  },
  {
    id: 4,
    title: "Café Especialidad",
    desc: "Grano seleccionado de origen único para una experiencia inigualable.",
    caract: "Origen único, tostado local",
    category: "Cafetería",
    image: "/images/products/products4.webp",
    time: "5 min"
  },
  {
    id: 5,
    title: "Pain au Chocolat",
    desc: "Masa hojaldrada rellena con bastoncitos de chocolate amargo.",
    caract: "Hojaldre, chocolate, clásico",
    category: "Viennoiserie",
    image: "/images/left-1.png",
    time: "12 min"
  },
  {
    id: 6,
    title: "Tarta de Frutos Rojos",
    desc: "Base de masa sablée con crema pastelera y frutos del bosque frescos.",
    caract: "Frescura, color, balance",
    category: "Pâtisserie",
    image: "/images/right-1.png",
    time: "25 min"
  },
  {
    id: 7,
    title: "Eclair de Vainilla",
    desc: "Masa choux rellena de crema de vainilla de Madagascar y glaseado.",
    caract: "Cremosidad, vainilla, ligereza",
    category: "Pâtisserie",
    image: "/images/left-2.png",
    time: "18 min"
  },
  {
    id: 8,
    title: "Cappuccino Italiano",
    desc: "Equilibrio perfecto entre espresso, leche vaporizada y espuma sedosa.",
    caract: "Equilibrio, textura, clásico",
    category: "Cafetería",
    image: "/images/products/products4.webp",
    time: "7 min"
  },
  {
    id: 9,
    title: "Baguette Tradición",
    desc: "Pan de corteza crujiente y miga alveolada, fermentación lenta.",
    caract: "Fermentación, corteza, artesanal",
    category: "Viennoiserie",
    image: "/images/right-2.png",
    time: "30 min"
  }
];

export default function LaCartaClient() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = activeCategory === "Todos"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col w-full bg-[#fdfbf7] min-h-screen">
      {/* Header */}
      <header className="w-full pt-16 md:pt-24 pb-12 px-8 md:px-16 text-center space-y-6">
        <div className="max-w-4xl mx-auto">
          <span className="block text-[#f15a24] text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in-up">Experiencia Galería</span>
          <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a]">
            La Carta
          </h1>
          <p className="mt-8 text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            Una selección curada de nuestras mejores creaciones, preparadas cada día con ingredientes locales y pasión artesanal.
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="w-full flex md:justify-center overflow-x-auto no-scrollbar scroll-smooth px-8 mb-10 md:mb-16 animate-fade-in-up [animation-delay:600ms] snap-x snap-mandatory">
        <div className="flex flex-nowrap gap-3 min-w-max mx-auto md:mx-0">
          {MENU_CATEGORIES.map((cat) => (
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

      {/* Grid Galeria */}
      <section className="w-full px-8 md:px-16 pb-32" aria-label="Productos">
        <h2 className="sr-only">Nuestros productos</h2>
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
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
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest shadow-sm">
                    {product.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a] group-hover:text-[#f15a24] transition-colors leading-tight">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs font-medium leading-relaxed flex-1">
                    {product.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <Utensils size={14} className="text-[#f15a24]" />
                    <span>{product.caract}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <B2BBanner />
    </div>
  );
}
