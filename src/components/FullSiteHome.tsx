"use client";

import AppImage from "@/components/ui/AppImage";
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FeatureGrid from "@/components/FeatureGrid";
import HeroB from "@/components/HeroB";
import B2BBanner from "@/components/B2BBanner";
import BlurFadeIn from "@/components/BlurFadeIn";
import { createClient } from "@/utils/supabase/client";

const FALLBACK_PRODUCTS = [
  {
    nombre: "Torta de Chocolate",
    frase: "Un clásico irresistible elaborado con cacao al 70% y ganache suave.",
    imagen: "/images/products/products1.webp",
  },
  {
    nombre: "Croissant Clásico",
    frase: "Ideal para acompañar con un espresso por la mañana. Mantequilla pura.",
    imagen: "/images/products/products2.webp",
  },
  {
    nombre: "Macarons Surtidos",
    frase: "Delicadeza francesa en cada bocado, con rellenos de temporada.",
    imagen: "/images/products/products3.webp",
  },
  {
    nombre: "Café Especialidad",
    frase: "Grano seleccionado de origen único para una experiencia inigualable.",
    imagen: "/images/products/products4.webp",
  }
];

function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadFeaturedProducts() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .eq("destacado", true)
          .eq("pausado", false)
          .order("orden", { ascending: true })
          .limit(5);

        if (error) throw error;
        setProducts(data && data.length > 0 ? data : FALLBACK_PRODUCTS);
      } catch (error) {
        console.error("Error loading featured products:", error);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedProducts();
  }, []);

  useEffect(() => {
    if (loading || products.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveProduct(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    const items = containerRef.current?.querySelectorAll(".product-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [loading, products.length]);

  if (loading) return null; // Or a skeleton if preferred
  if (products.length === 0) return null;

  return (
    <section ref={containerRef} className="relative w-full py-8 md:py-32 px-8 md:px-16">
      <BlurFadeIn className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="md:hidden space-y-4 mb-4">
          <div>
            <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Nuestras estrellas</span>
            <h2 className="mt-2 text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Los favoritos que no puedes perderte</h2>
            <p className="mt-2 text-gray-500 text-base leading-relaxed">
              Descubre lo que más enamora de nuestra pastelería.
            </p>
          </div>
          <div className="w-12 h-px bg-[#c6bfb7]" />
        </div>

        <div className="flex flex-col md:gap-32 gap-10 py-0 md:py-20">
          {products.map((product, i) => (
            <div
              key={i}
              data-index={i}
              className="product-item relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5"
            >
              <AppImage src={product.imagen || "/images/products/products1.webp"} alt={product.nombre} variant="fill" sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:hidden" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white md:hidden scale-90 origin-bottom-left">
                <h3 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] mb-2 leading-none">{product.nombre}</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">{product.frase}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-1/2 -translate-y-1/2 h-fit self-start py-20 hidden md:flex items-center gap-16 justify-between">
          <div className="max-w-md space-y-6">
            <div>
              <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Nuestras estrellas</span>
              <p className="mt-2 text-gray-400 text-sm max-w-lg leading-relaxed">
                Los favoritos que no puedes perderte. Descubre lo que más enamora de nuestra pastelería.
              </p>
            </div>
            <div className="w-8 h-px bg-[#c6bfb7]" />
            <div key={activeProduct} className="animate-text-fade">
              <h2 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] tracking-tight text-[#3d332e]">
                {products[activeProduct]?.nombre}
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-sm leading-relaxed mt-4">
                {products[activeProduct]?.frase}
              </p>
              <Link
                href="/la-carta"
                className="inline-flex items-center gap-2 mt-6 px-7 py-3 border-2 border-[#74865e] text-[#74865e] rounded-full font-bold text-sm hover:bg-[#74865e] hover:text-white transition-all"
              >
                Ver la carta
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 pr-4">
            {products.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${i === activeProduct ? "w-1.5 h-8 bg-[#f15a24]" : "w-1.5 h-1.5 bg-gray-300"} rounded-full`}
              />
            ))}
          </div>
        </div>
      </BlurFadeIn>
    </section>
  );
}

const NEWS_ITEMS = [
  { src: "/images/news/cafe.png", alt: "Cafe", width: "w-[280px] md:w-[320px]", label: "", aspect: "aspect-square" },
  { src: "/images/news/ingredients.png", alt: "Ingredientes", width: "w-[280px] md:w-[320px]", label: "Ingredientes frescos", aspect: "aspect-square" },
  { src: "/images/news/team.png", alt: "Equipo", width: "w-[280px] md:w-[320px]", label: "Conoce a nuestro equipo", aspect: "aspect-square" },
  { src: "/images/news/laptop.png", alt: "Laptop", width: "w-[280px] md:w-[320px]", label: "Tu experiencia", aspect: "aspect-square" },
];

function NewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const currentSpeedRef = useRef(0);
  const targetSpeedRef = useRef(0.5);
  const maxSpeed = 0.5;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    targetSpeedRef.current = maxSpeed;
    const animate = () => {
      if (track) {
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.03;
        posRef.current += currentSpeedRef.current;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <section className="w-full py-24 space-y-8 overflow-hidden px-8 md:px-16">
      <BlurFadeIn className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-6 max-w-2xl">
          <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Creado con amor • desde 2001</span>
          <h2 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a]">Sabores intensos, ingredientes locales, creado con amor</h2>
        </div>
      </BlurFadeIn>
      <div className="w-screen -mx-8 md:-mx-16 overflow-hidden">
        <div ref={trackRef} className="flex gap-12 items-center w-max px-[10vw]">
          {[...NEWS_ITEMS, ...NEWS_ITEMS, ...NEWS_ITEMS, ...NEWS_ITEMS].map((item, i) => {
            const rotations = [2, -1.5, 1, -2.5, 1.8, -1, 2.2, -1.8, 1.2, -2];
            const rot = rotations[i % rotations.length];
            return (
              <div
                key={i}
                onMouseEnter={() => { targetSpeedRef.current = 0; }}
                onMouseLeave={() => { targetSpeedRef.current = maxSpeed; }}
                className={`flex-shrink-0 ${item.width} group cursor-pointer`}
                style={{ transform: `rotate(${rot}deg)`, transformOrigin: 'center center' }}
              >
                <div className={`relative ${item.aspect} rounded-[2.5rem] overflow-hidden mb-6`}>
                  <AppImage src={item.src} alt={item.alt} variant="fill" draggable={false} className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      const supabase = createClient();
      try {
        let { data: featured, error: fError } = await supabase
          .from("articulos")
          .select("*")
          .eq("estado", "publicado")
          .eq("destacado", true)
          .limit(1)
          .maybeSingle();

        if (!featured || fError) {
          const { data: latest } = await supabase
            .from("articulos")
            .select("*")
            .eq("estado", "publicado")
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();
          featured = latest;
        }

        let query = supabase
          .from("articulos")
          .select("*")
          .eq("estado", "publicado")
          .order("created_at", { ascending: false })
          .limit(3);

        if (featured?.id) {
          query = query.neq("id", featured.id);
        }

        const { data: recent } = await query;
        
        setFeaturedPost(featured);
        setRecentPosts(recent || []);
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, []);

  if (loading || (!featuredPost && recentPosts.length === 0)) return null;

  return (
    <section className="w-full bg-[#f9f4e8] py-24 px-8 md:px-16 space-y-16">
      <BlurFadeIn className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-6 max-w-2xl">
          <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Consejos y novedades recientes</span>
          <h2 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a]">Historias y blogs sobre comida</h2>
          <p className="text-gray-500 max-w-lg text-sm md:text-base leading-relaxed">Mantente al día con las últimas tendencias en gastronomía, noticias y más.</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/blog" className="px-8 py-3 bg-transparent text-[#74865e] border-2 border-[#74865e] rounded-full font-bold text-sm hover:bg-[#74865e] hover:text-white transition-all inline-flex items-center gap-2">
            Leer más <ArrowUpRight size={16} />
          </Link>
        </div>
      </BlurFadeIn>
      <BlurFadeIn delay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 max-w-7xl mx-auto">
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="lg:col-span-2 space-y-6 group cursor-pointer block">
            <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
              <AppImage src={featuredPost.cover_url || "/images/blog/featured.png"} alt={featuredPost.titulo} variant="fill" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              {featuredPost.categoria && (
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#f15a24] text-white text-xs font-bold rounded-full uppercase tracking-widest">{featuredPost.categoria}</div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <Calendar size={16} />
                <span>{new Date(featuredPost.created_at).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <h3 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-tight group-hover:text-[#f15a24] transition-colors">{featuredPost.titulo}</h3>
              {featuredPost.descripcion && (
                <p className="text-gray-500 text-lg leading-relaxed line-clamp-2">{featuredPost.descripcion}</p>
              )}
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-10">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-6 group cursor-pointer items-start">
              <div className="relative w-32 h-32 md:w-36 md:h-24 flex-shrink-0 rounded-3xl overflow-hidden shadow-lg">
                <AppImage src={post.cover_url || "/images/blog/post-1.png"} alt={post.titulo} variant="fill" className="object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="space-y-3 pt-1">
                {post.categoria && (
                  <span className="inline-block px-3 py-1 bg-[#f15a24] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">{post.categoria}</span>
                )}
                <h4 className="text-lg font-bold leading-snug group-hover:text-[#f15a24] transition-colors line-clamp-2">{post.titulo}</h4>
              </div>
            </Link>
          ))}
        </div>
      </BlurFadeIn>
    </section>
  );
}

export default function FullSiteHome() {
  return (
    <div className="flex flex-col w-full">
      <HeroB />
      <FeatureGrid />
      <div className="w-full flex flex-col items-center">
        <ProductsSection />
        <BlogSection />
        <NewsCarousel />
        <B2BBanner />
      </div>
    </div>
  );
}
