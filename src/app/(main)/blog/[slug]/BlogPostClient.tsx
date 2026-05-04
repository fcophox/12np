"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Globe, Mail } from "lucide-react";

const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "El poder silencioso y oculto del ácido en cada plato",
  description: "Un toque de limón o vinagre puede transformar una preparación plana en una explosión de sabores equilibrados.",
  image: "https://12enpunto.cl/images/blog/featured.png",
  datePublished: "2025-05-08T00:00:00Z",
  dateModified: "2025-05-08T00:00:00Z",
  author: {
    "@type": "Person",
    name: "Francisca",
    jobTitle: "Fundadora",
    worksFor: { "@type": "Organization", name: "12enpunto" },
  },
  publisher: {
    "@type": "Organization",
    name: "12enpunto",
    logo: { "@type": "ImageObject", url: "https://12enpunto.cl/images/brand/12np-v.svg" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://12enpunto.cl/blog/el-poder-del-acido" },
  keywords: ["ácido", "pastelería", "técnica", "ingredientes", "sabores"],
};

export default function BlogPostClient() {
  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      {/* Article Header */}
      <header className="w-full pt-16 md:pt-24 pb-12 px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#f15a24] text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-orange-50 text-[#f15a24] text-[10px] font-bold rounded-full tracking-[0.1em] uppercase">
              Cocinando Secretos
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-fraunces)] leading-[1.1] text-[#1a1a1a] tracking-tight">
              El poder silencioso y oculto del ácido en cada plato
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed italic border-l-4 border-orange-200 pl-6">
              &ldquo;Un toque de limón o vinagre puede transformar una preparación plana en una explosión de sabores equilibrados.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src="/images/team/francisca.png" alt="Francisca, fundadora de 12enpunto" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1a1a1a]">PC Francisca</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Fundadora</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Calendar size={18} className="text-[#f15a24]/60" />
              <span>8 de mayo de 2025</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Clock size={18} className="text-[#f15a24]/60" />
              <span>6 min de lectura</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="w-full px-8 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl shadow-orange-900/5">
            <Image 
              src="/images/blog/featured.png" 
              alt="Ácido en la cocina" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full px-8 md:px-16 pb-32">
        <div className="max-w-3xl mx-auto relative">
          {/* Social Share Floating (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4 absolute -left-24 top-0 pt-2">
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-50 transition-colors text-gray-400 hover:text-[#f15a24]">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-50 transition-colors text-gray-400 hover:text-[#f15a24]">
              <Globe size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-50 transition-colors text-gray-400 hover:text-[#f15a24]">
              <Mail size={18} />
            </button>
          </div>

          <article className="prose prose-lg md:prose-xl max-w-none space-y-8 text-gray-600 leading-relaxed font-medium">
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-[#f15a24] first-letter:mr-3 first-letter:float-left first-letter:font-[family-name:var(--font-fraunces)]">
              La cocina es, en su esencia, una danza constante entre equilibrios. A menudo hablamos de la sal como el potenciador definitivo, del azúcar como el alma de lo dulce, o de las grasas como el vehículo de la saciedad. Sin embargo, existe un ingrediente que suele actuar en las sombras, pero que es capaz de cambiarlo todo en un segundo: el ácido.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a] pt-8">
              ¿Por qué el ácido es vital?
            </h2>

            <p>
              El ácido cumple una función química y sensorial indispensable. En boca, ayuda a &ldquo;cortar&rdquo; la pesadez de las grasas, limpia el paladar y realza los matices sutiles que otros ingredientes podrían ocultar. No se trata de que el plato sepa &ldquo;ácido&rdquo;, se trata de vitalidad.
            </p>

            <div className="bg-[#fdfbf7] p-8 md:p-12 rounded-[2.5rem] border border-orange-100 my-12">
              <h3 className="text-xl font-bold mb-4 text-[#3d332e]">Tip de la Pastelera:</h3>
              <p className="text-gray-500 italic">
                &ldquo;En la pastelería, una pizca de ralladura de cítricos o una gota de vinagre de manzana en un merengue no solo estabiliza la estructura, sino que hace que el dulzor no sea empalagoso. Es el secreto para comer un trozo más.&rdquo;
              </p>
            </div>

            <p>
              Cuando preparamos una salsa de moras para una tarta de chocolate, el azúcar ayuda a caramelizar y dar cuerpo, pero es el ácido natural de la fruta (en ocasiones potenciado con un toque de limón) el que hace que el chocolate &ldquo;brille&rdquo;. Sin esa acidez, el chocolate se sentiría pesado y monótono.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a] pt-8">
              Fuentes de brillo en tu despensa
            </h2>

            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-[#f15a24] flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                <span><strong className="text-[#1a1a1a]">Cítricos:</strong> La fuente más fresca y volátil. Ideal para terminaciones y matices vivos.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-[#f15a24] flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                <span><strong className="text-[#1a1a1a]">Vinagres:</strong> Ofrecen perfiles más complejos y terrosos. El vinagre de Jerez o de manzana son mis favoritos.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-[#f15a24] flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                <span><strong className="text-[#1a1a1a]">Lácteos Cultivados:</strong> El yogur o el buttermilk aportan una acidez cremosa que es magia pura en masas.</span>
              </li>
            </ul>

            <p className="pt-8">
              La próxima vez que sientas que a tu preparación &ldquo;le falta algo&rdquo; y ya has ajustado la sal, prueba agregando unas gotas de ácido. Observa cómo los sabores se despiertan, cómo los aromas se intensifican y cómo el plato cobra una nueva vida.
            </p>
          </article>

          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-2 pt-16">
            {['Técnica', 'Ingredientes', 'Pastelería', 'Secretos', '12enpunto'].map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-orange-50 hover:text-[#f15a24] transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio Bottom */}
          <div className="mt-20 p-10 bg-gray-50 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 border border-gray-100">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              <Image src="/images/team/francisca.png" alt="Francisca Bio" fill className="object-cover" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a]">Francisca</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-medium">
                Fundadora de 12enpunto y apasionada por la alquimia de los sabores. Cree que la mejor pastelería es la que cuenta una historia honesta.
              </p>
              <div className="flex justify-center md:justify-start gap-4 text-gray-400">
                <Globe size={20} className="hover:text-[#f15a24] transition-colors cursor-pointer" />
                <Mail size={20} className="hover:text-[#f15a24] transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Articles */}
      <section className="w-full bg-[#fdfbf7] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a]">Lecturas sugeridas</h2>
            <Link href="/" className="text-[#f15a24] text-sm font-bold border-b-2 border-orange-200 hover:opacity-70 transition-opacity">
              Ver todos los artículos
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="group cursor-pointer space-y-6 bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden">
                  <Image src={`/images/blog/post-${i}.png`} alt={`Artículo relacionado sobre gastronomía y pastelería ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="space-y-3">
                  <span className="text-[#f15a24] text-[10px] font-bold tracking-widest uppercase">Gastronomía</span>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-[#f15a24] transition-colors">Recetas y secretos de la cocina moderna...</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
