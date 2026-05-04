"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FeatureGrid from "@/components/FeatureGrid";
import HeroB from "@/components/HeroB";
import B2BBanner from "@/components/B2BBanner";
import BlurFadeIn from "@/components/BlurFadeIn";

const PRODUCTS = [
  {
    title: "Torta de Chocolate",
    desc: "Un clásico irresistible elaborado con cacao al 70% y ganache suave.",
    image: "/images/products/products1.webp",
  },
  {
    title: "Croissant Clásico",
    desc: "Ideal para acompañar con un espresso por la mañana. Mantequilla pura.",
    image: "/images/products/products2.webp",
  },
  {
    title: "Macarons Surtidos",
    desc: "Delicadeza francesa en cada bocado, con rellenos de temporada.",
    image: "/images/products/products3.webp",
  },
  {
    title: "Café Especialidad",
    desc: "Grano seleccionado de origen único para una experiencia inigualable.",
    image: "/images/products/products4.webp",
  }
];

function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-8 md:py-32 px-8 md:px-16">
      <BlurFadeIn className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Mobile Header */}
        <div className="md:hidden space-y-4 mb-4">
          <div>
            <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Nuestras estrellas</span>
            <h2 className="mt-2 text-4xl font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Los favoritos que no puedes perderte</h2>
            <p className="mt-2 text-gray-500 text-base leading-relaxed">
              Descubre lo que más enamora de nuestra pastelería.
            </p>
          </div>
          <div className="w-12 h-px bg-[#c6bfb7]" />
        </div>

        {/* Left: Scrolling Images */}
        <div className="flex flex-col md:gap-32 gap-10 py-0 md:py-20">
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              data-index={i}
              className="product-item relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              {/* Mobile Overlay & Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:hidden" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white md:hidden scale-90 origin-bottom-left">
                <h3 className="text-4xl font-bold font-[family-name:var(--font-fraunces)] mb-2 leading-none">
                  {product.title}
                </h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  {product.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Sticky Text + Indicator */}
        <div className="sticky top-1/2 -translate-y-1/2 h-fit self-start py-20 hidden md:flex items-center gap-16 justify-between">
          <div className="max-w-md space-y-6">
            {/* Static intro header */}
            <div>
              <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Nuestras estrellas</span>
              <p className="mt-2 text-gray-400 text-sm max-w-lg leading-relaxed">
                Los favoritos que no puedes perderte. Descubre lo que más enamora de nuestra pastelería.
              </p>
            </div>
            <div className="w-8 h-px bg-[#c6bfb7]" />
            {/* Animated product text */}
            <div
              key={activeProduct}
              className="animate-text-fade"
            >
              <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-fraunces)] tracking-tight text-[#3d332e]">
                {PRODUCTS[activeProduct].title}
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-sm leading-relaxed mt-4">
                {PRODUCTS[activeProduct].desc}
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

          {/* Indicator Dots Right of Text */}
          <div className="flex flex-col gap-3 pr-4">
            {PRODUCTS.map((_, i) => (
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

const CAROUSEL_IMAGES = [
  "/images/left-2.png",
  "/images/left-1.png",
  "/images/products/products2.webp", // Croissant
  "/images/right-1.png",
  "/images/right-2.png",
  "/images/products/products1.webp",
  "/images/products/products4.webp",
];

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlaying]);
  const getIndex = (offset: number) => {
    return (activeIndex + offset + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div
      className="relative w-full overflow-hidden animate-fade-in-up [animation-delay:800ms] mb-12 md:mb-24 py-8 md:py-12 group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex items-center justify-center h-[600px] md:h-[700px] px-4 md:px-0 relative">

        {/* Slot -2 (Desktop Only) */}
        <CarouselSlot
          image={CAROUSEL_IMAGES[getIndex(-2)]}
          className="hidden lg:block w-64 h-[22rem] rounded-[1rem] opacity-5 grayscale blur-[6px] scale-90"
          direction={direction}
          activeIndex={activeIndex}
        />

        {/* Slot -1 (Side Left) */}
        <CarouselSlot
          image={CAROUSEL_IMAGES[getIndex(-1)]}
          className="w-32 sm:w-64 md:w-80 h-[26rem] md:h-[32rem] rounded-[2.5rem] md:rounded-[3rem] opacity-40 md:opacity-30 grayscale-[30%] blur-[1px] md:blur-[2px] scale-[0.8] md:scale-[0.85] cursor-pointer -mr-16 md:mr-0 z-10"
          onClick={prevSlide}
          direction={direction}
          activeIndex={activeIndex}
        />

        {/* Main Center Image */}
        <div className="relative w-[85%] xs:w-[22rem] sm:w-[26rem] md:w-[32rem] h-[35rem] md:h-[42rem] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] z-20">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute inset-0"
            >
              <Image
                src={CAROUSEL_IMAGES[activeIndex]}
                alt="Producto Principal"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all cursor-pointer z-30"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all cursor-pointer z-30"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Slot +1 (Side Right) */}
        <CarouselSlot
          image={CAROUSEL_IMAGES[getIndex(1)]}
          className="w-32 sm:w-64 md:w-80 h-[26rem] md:h-[32rem] rounded-[2.5rem] md:rounded-[3rem] opacity-40 md:opacity-30 grayscale-[30%] blur-[1px] md:blur-[2px] scale-[0.8] md:scale-[0.85] cursor-pointer -ml-16 md:ml-0 z-10"
          onClick={nextSlide}
          direction={direction}
          activeIndex={activeIndex}
        />

        {/* Slot +2 (Desktop Only) */}
        <CarouselSlot
          image={CAROUSEL_IMAGES[getIndex(2)]}
          className="hidden lg:block w-64 h-[22rem] rounded-[3rem] opacity-5 grayscale blur-[6px] scale-90"
          direction={direction}
          activeIndex={activeIndex}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
    </div>
  );
}

interface CarouselSlotProps {
  image: string;
  className: string;
  onClick?: () => void;
  direction: number;
  activeIndex: number;
}

function CarouselSlot({ image, className, onClick, direction }: CarouselSlotProps) {
  return (
    <div className={`relative flex-shrink-0 transition-all duration-700 overflow-hidden ${className}`} onClick={onClick}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={image}
          custom={direction}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src={image} alt="Pastelería Slot" fill className="object-cover" />
        </motion.div>
      </AnimatePresence>
    </div>
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

    // Start with a gentle ease-in
    targetSpeedRef.current = maxSpeed;

    const animate = () => {
      if (track) {
        // Lerp current speed toward target speed for smooth ease in/out
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.03;

        posRef.current += currentSpeedRef.current;
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
    <section className="w-full py-24 space-y-8 overflow-hidden px-8 md:px-16">
      <BlurFadeIn className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-6 max-w-2xl">
          <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Creado con amor • desde 2001</span>
          <h2 className="text-4xl md:text-4xl font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a]">Sabores intensos, ingredientes locales, creado con amor</h2>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button className="px-8 py-3 bg-transparent text-[#74865e] border-2 border-[#74865e] rounded-full font-bold text-sm hover:bg-[#74865e] hover:text-white transition-all inline-flex items-center gap-2">Nuestra historia <ArrowUpRight size={16} /></button>
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
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero B at top (full screen) */}
      <HeroB />

      {/* Feature grid (ingredients, recipes, coffee, inspiration) */}
      <FeatureGrid />

      {/* Hero Header - hidden, using HeroB instead */}
      {/* <div className="w-full px-8 md:px-16">
        <div className="flex flex-col items-center pt-16 pb-12 max-w-7xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9f4e8] text-sm font-medium mb-8 animate-fade-in-up [animation-delay:200ms]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="black" stroke="black" />
              ))}
            </div>
            <span className="font-semibold">(4.9)</span>
          </div>

          <div className="space-y-6 max-w-2xl mb-12 animate-fade-in-up [animation-delay:400ms]">
            <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-fraunces)] tracking-tight text-[#3d332e]">
              Todo el sabor, en un solo lugar
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium tracking-tight">
              Tu lugar ideal para café, pasteles y mucho más.
            </p>
          </div>

          <Link 
            href="/la-carta"
            className="px-10 py-4 bg-black text-white rounded-full font-bold text-sm hover:scale-[1.02] transition-transform mb-16 shadow-lg shadow-black/10 animate-fade-in-up [animation-delay:600ms] inline-block"
          >
            Explorar menú
          </Link>
        </div>
      </div> */}

      {/* Hero Carousel Component - hidden, using HeroB instead */}
      {/* <HeroCarousel /> */}

      {/* Hero B removed from here (now displayed at top) */}

      <div className="w-full flex flex-col items-center ">
        <ProductsSection />

        {/* Blog Section */}
        <section className="w-full bg-[#f9f4e8] py-24 px-8 md:px-16 space-y-16">
          <BlurFadeIn className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-6 max-w-2xl">
              <span className="text-[#f15a24] text-[10px] font-bold tracking-[0.2em] uppercase">Consejos y novedades recientes</span>
              <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a]">Historias y blogs sobre comida</h2>
              <p className="text-gray-500 max-w-lg text-sm md:text-base leading-relaxed">Mantente al día con las últimas tendencias en gastronomía, noticias y más.</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button className="px-8 py-3 bg-transparent text-[#74865e] border-2 border-[#74865e] rounded-full font-bold text-sm hover:bg-[#74865e] hover:text-white transition-all inline-flex items-center gap-2">Leer más <ArrowUpRight size={16} /></button>
            </div>
          </BlurFadeIn>

          <BlurFadeIn delay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 max-w-7xl mx-auto">
            <Link href="/blog/el-poder-del-acido" className="lg:col-span-2 space-y-6 group cursor-pointer block">
              <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image src="/images/blog/featured.png" alt="Featured" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#f15a24] text-white text-xs font-bold rounded-full">Cocinando</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium"><Calendar size={16} /><span>8 de mayo de 2025</span></div>
                <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-fraunces)] leading-tight group-hover:text-[#f15a24] transition-colors">El poder silencioso y oculto del ácido en cada plato</h3>
              </div>
            </Link>
            <div className="flex flex-col gap-10">
              {[1, 2, 3].map((id) => (
                <Link key={id} href={`/blog/post-${id}`} className="flex gap-6 group cursor-pointer items-start">
                  <div className="relative w-32 h-32 md:w-36 md:h-24 flex-shrink-0 rounded-3xl overflow-hidden shadow-lg"><Image src={`/images/blog/post-${id}.png`} alt="Post" fill className="object-cover transition-transform group-hover:scale-110" /></div>
                  <div className="space-y-3 pt-1">
                    <span className="inline-block px-3 py-1 bg-[#f15a24] text-white text-[10px] font-bold rounded-full">Cocinando</span>
                    <h4 className="text-lg font-bold leading-snug group-hover:text-[#f15a24] transition-colors line-clamp-2">Recetas y secretos de la cocina moderna.</h4>
                  </div>
                </Link>
              ))}
            </div>
          </BlurFadeIn>
        </section>

        {/* News Section Component */}
        <NewsCarousel />

        {/* B2B Banner */}
        <B2BBanner />
      </div>
    </div>
  );
}
