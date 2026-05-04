"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Certificacion from "@/components/Certificacion";
import PasteleraFeatures from "@/components/PasteleraFeatures";
import BlurFadeIn from "@/components/BlurFadeIn";

import B2BBanner from "@/components/B2BBanner";

const GALLERY_IMAGES = [
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

  useEffect(() => {
    // Only run carousel logic on mobile (if needed, but simple enough to run always and use CSS to hide)
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (track) {
        posRef.current += maxSpeed;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] pt-20 pb-32 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
          {/* Left: Content */}
          <BlurFadeIn className="w-full md:w-1/2 space-y-10">
            <div className="space-y-2">
              <span className="text-[#f15a24] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Somos 12enpunto</span>
              <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a]">
                Todo empezó con <br />
                <span className="text-[#3d332e]">cariño y compañía</span>
              </h1>
              <p className="text-[#f15a24] text-xl md:text-2xl font-bold italic pt-6 font-[family-name:var(--font-fraunces)]">
              &ldquo;y algo dulce a las 12 en punto&rdquo; 🐾
              </p>
            </div>

            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
              <p>
                12enpunto no nació solo como una pastelería. <span className="text-[#1a1a1a] font-bold">Nació como un momento.</span>
              </p>
              <p>
                Un momento de pausa, de conexión y de compañía. Un momento donde el tiempo se detiene… <span className="text-[#3d332e] font-bold italic">justo a las 12 en punto.</span>
              </p>
              <p>
                Detrás de esta historia estamos nosotras: <span className="text-[#f15a24] italic">yo, amante de la pastelería, y Betty, mi compañera de vida 🐶.</span>
              </p>
            </div>
          </BlurFadeIn>

          {/* Right: Image & Quote */}
          <BlurFadeIn delay={0.2} className="w-full md:w-1/2 flex flex-col gap-12">
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl shadow-black/10">
              <Image
                src="/images/team/bettypanchita.jpg"
                alt="Betty y la pastelera"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-8 md:pl-8 lg:pl-12">
              <p className="text-md md:text-lg text-[#3d332e] leading-relaxed font-light italic">
              &ldquo;Entre recetas, pruebas, errores y pequeños logros, fuimos construyendo algo más que preparaciones dulces: fuimos creando un espacio lleno de dedicación, paciencia y mucho amor.&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-100 shadow-sm">
                  <Image
                    src="/images/team/francisca.png"
                    alt="Francisca"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#1a1a1a] text-lg">Francisca</span>
                  <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Fundadora & Pastelera de 12enpunto</span>
                </div>
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
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a]">Momentos en el taller</h2>
            <p className="text-gray-500 max-w-lg font-medium">Capturas de nuestra dedicación diaria y los resultados que tanto amamos compartir.</p>
          </BlurFadeIn>

          {/* Desktop: Masonry */}
          <div className="hidden md:block columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY_IMAGES.map((img, i) => (
              <BlurFadeIn key={i} delay={(i % 3) * 0.1} yOffset={16}>
                <div className="break-inside-avoid group relative rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </BlurFadeIn>
            ))}
          </div>

          {/* Mobile: Infinite Carousel */}
          <div className="md:hidden w-screen -mx-8 overflow-hidden">
            <div ref={trackRef} className="flex gap-6 items-center w-max px-[10vw]">
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] h-[280px] relative rounded-[2.5rem] overflow-hidden shadow-lg">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <B2BBanner />
    </div>
  );
}
