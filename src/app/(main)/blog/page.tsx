"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const supabase = createClient();
    async function loadArticles() {
      try {
        const { data, error } = await supabase
          .from("articulos")
          .select("*")
          .eq("estado", "publicado")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full bg-[#fdfbf7] min-h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#3d332e]/10 border-t-[#f15a24] rounded-full animate-spin mb-4" />
        <p className="text-[#3d332e]/40 font-medium font-[family-name:var(--font-fraunces)]">Cargando historias...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#fdfbf7] min-h-screen">
      {/* Header */}
      <header className="w-full pt-24 md:pt-32 pb-16 px-8 md:px-16 text-center">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="block text-[#f15a24] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">Cocinando Historias</span>
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold font-[family-name:var(--font-fraunces)] leading-[0.9] text-[#1a1a1a] tracking-tighter">
            Blog & <br className="md:hidden" /> Secretos
          </h1>
          <p className="mt-8 text-[clamp(1rem,2vw,1.2rem)] text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Explora el mundo de la pastelería artesanal, técnicas profesionales y el alma detrás de cada creación de 12enpunto.
          </p>
        </div>
      </header>

      {/* Articles Grid */}
      <section className="w-full px-8 md:px-16 pb-32">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <BookOpen size={48} className="text-[#3d332e]/10 mb-6" />
              <p className="text-xl font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]/40">
                Pronto publicaremos nuevas historias.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/50"
                >
                  <Link href={`/blog/${article.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                    {article.cover_url ? (
                      <Image
                        src={article.cover_url}
                        alt={article.titulo}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f9f4e8] flex items-center justify-center">
                        <BookOpen size={40} className="text-[#3d332e]/10" />
                      </div>
                    )}
                    {article.categoria && (
                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest shadow-sm">
                        {article.categoria}
                      </div>
                    )}
                  </Link>

                  <div className="p-8 flex flex-col flex-1 space-y-5">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#f15a24]/60" />
                        <span>{formatDate(article.created_at)}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${article.slug}`} className="block group-hover:text-[#f15a24] transition-colors">
                      <h2 className="text-2xl font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a] transition-colors">
                        {article.titulo}
                      </h2>
                    </Link>

                    <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3 flex-1">
                      {article.descripcion}
                    </p>

                    <Link 
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-[#f15a24] text-xs font-bold uppercase tracking-widest pt-4 border-t border-gray-50 group-hover:gap-4 transition-all"
                    >
                      Leer artículo <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
