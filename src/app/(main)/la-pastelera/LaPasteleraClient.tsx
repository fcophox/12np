"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import Certificacion from "@/components/Certificacion";
import PasteleraFeatures from "@/components/PasteleraFeatures";
import BlurFadeIn from "@/components/BlurFadeIn";

import B2BBanner from "@/components/B2BBanner";

interface GalleryImage {
  src: string;
  w: number;
  h: number;
  alt: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/products/products1.webp", w: 500, h: 700, alt: "Torta artesanal elaborada en el taller de 12enpunto" },
  { src: "/images/left-1.png", w: 500, h: 400, alt: "Preparación de pastelería artesanal en 12enpunto" },
  { src: "/images/right-2.png", w: 500, h: 600, alt: "Detalle de repostería artesanal de 12enpunto" },
  { src: "/images/products/products4.webp", w: 500, h: 500, alt: "Café de especialidad servido en 12enpunto" },
  { src: "/images/left-2.png", w: 500, h: 800, alt: "Proceso creativo en la pastelería 12enpunto" },
  { src: "/images/products/products2.webp", w: 500, h: 450, alt: "Croissant artesanal recién horneado en 12enpunto" },
  { src: "/images/right-1.png", w: 500, h: 650, alt: "Tarta de frutos rojos elaborada con ingredientes locales" },
  { src: "/images/blog/featured.png", w: 500, h: 400, alt: "Ingredientes y técnica en la cocina de 12enpunto" },
  { src: "/images/products/products3.webp", w: 500, h: 600, alt: "Macarons surtidos de temporada en 12enpunto" },
];

export default function LaPasteleraClient() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const maxSpeed = 0.5;

  const [author, setAuthor] = useState<{
    full_name?: string;
    avatar_url?: string;
    cargo?: string;
  } | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    // Author Loading logic
    const loadAuthor = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, cargo")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (!error && data) {
          setAuthor(data);
        }
      } catch (err) {
        console.error("Error loading author:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const loadArtesanalImages = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("galeria")
          .select("url")
          .eq("categoria", "artesanal")
          .order("orden", { ascending: true });

        if (!error && data && data.length > 0) {
          const heights = [700, 400, 600, 500, 800, 450, 650, 400, 600];
          setImages(data.map((img, i) => ({
            src: img.url,
            w: 500,
            h: heights[i % heights.length],
            alt: "Momento artesanal 12enpunto"
          })));
        } else {
          setImages(GALLERY_IMAGES);
        }
      } catch (err) {
        console.error("Error loading artesanal images:", err);
        setImages(GALLERY_IMAGES);
      } finally {
        setImagesLoading(false);
      }
    };

    loadAuthor();
    loadArtesanalImages();

    // Carousel Logic
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId: number;
    const animate = () => {
      if (track) {
        posRef.current += maxSpeed;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Header centrado — mismo patrón que La Carta y Contacto */}
      <header className="w-full pt-12 md:pt-12 pb-12 px-8 md:px-16 text-center space-y-6">
        <div className="max-w-7xl mx-auto">
          <span className="block text-[#f15a24] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">Somos 12enpunto</span>
          <h1 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-[1.15] text-[#1a1a1a] tracking-tight">
            Todo empezó con <span className="text-[#f15a24]">cariño y compañía</span>
          </h1>
          <p className="mt-3 sm:mt-8 text-[clamp(0.8rem,2vw,1rem)] text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            12enpunto no nació solo como una pastelería. Nació como un momento.
          </p>
        </div>
      </header>

      {/* Contenido: imagen izquierda + textos derecha */}
      <section className="relative w-full px-8 md:px-16 pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">

          {/* Left: Imagen cuadrada */}
          <BlurFadeIn className="w-full md:w-1/2">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10">
              <Image
                src="/images/team/bettypanchita.jpg"
                alt="Betty y la pastelera"
                fill
                className="object-cover"
                priority
              />
            </div>
          </BlurFadeIn>

          {/* Right: Textos */}
          <BlurFadeIn delay={0.2} className="w-full md:w-1/2 flex flex-col justify-center gap-10">
            <div className="space-y-6 text-[clamp(0.8rem,2vw,1rem)] text-gray-600 leading-relaxed font-medium">
              <p>
                Un momento de pausa, de conexión y de compañía. Un momento donde el tiempo se detiene… <span className="text-[#3d332e] font-bold italic">justo a las 12 en punto.</span>
              </p>
              <p>
                Detrás de esta historia estamos nosotras: <span className="text-[#f15a24] italic">yo, amante de la pastelería, y Betty, mi compañera de vida 🐶.</span>
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-[clamp(0.8rem,2vw,1rem)] text-[#1a1a1a] leading-relaxed font-base italic">
                &ldquo;Entre recetas, pruebas, errores y pequeños logros, fuimos construyendo algo más que preparaciones dulces: fuimos creando un espacio lleno de dedicación, paciencia y mucho amor.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                {isLoading ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse border-2 border-orange-50 shrink-0" />
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 w-48 bg-gray-100 animate-pulse rounded" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-100 shadow-sm shrink-0">
                      <Image
                        src={author?.avatar_url || "/images/team/francisca.png"}
                        alt={author?.full_name || "Francisca"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1a1a1a]">{author?.full_name || "Francisca"}</span>
                      <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">
                        {author?.cargo || "Fundadora & Pastelera de 12enpunto"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </BlurFadeIn>

        </div>
      </section>

      <PasteleraFeatures />

      <Certificacion />

      {/* Gallery Section */}
      <section className="w-full py-24 md:py-32 px-8 md:px-16 bg-[#fdfbf7] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <BlurFadeIn className="flex flex-col items-center text-center space-y-4">
            <span className="text-[#f15a24] text-xs font-bold tracking-[0.3em] uppercase">Galería Artesanal</span>
            <h2 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a]">Momentos en el taller</h2>
            <p className="text-gray-500 max-w-lg font-medium">Capturas de nuestra dedicación diaria y los resultados que tanto amamos compartir.</p>
          </BlurFadeIn>

          {/* Desktop: Masonry */}
          <div className="hidden md:block columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {imagesLoading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="break-inside-avoid relative rounded-[2rem] overflow-hidden bg-gray-100 animate-pulse" style={{ height: `${[300, 450, 350, 500, 400, 300][i % 6]}px` }} />
              ))
            ) : (
              images.map((img, i) => (
                <BlurFadeIn key={i} delay={(i % 3) * 0.1} yOffset={16}>
                  <div className="break-inside-avoid group relative rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </BlurFadeIn>
              ))
            )}
          </div>

          {/* Mobile: Infinite Carousel */}
          <div className="md:hidden w-screen -mx-8 overflow-hidden">
            <div ref={trackRef} className="flex gap-6 items-center w-max px-[10vw]">
              {imagesLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-shrink-0 w-[280px] h-[280px] relative rounded-[2.5rem] overflow-hidden bg-gray-100 animate-pulse" />
                ))
              ) : (
                [...images, ...images].map((img, i) => (
                  <div key={i} className="flex-shrink-0 w-[280px] h-[280px] relative rounded-[2.5rem] overflow-hidden shadow-lg">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <B2BBanner />
    </div>
  );
}
