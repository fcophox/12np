"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Calendar, Clock, ArrowLeft, Globe, Mail, User, Share2 } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getReadingTime(html: string) {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>?/gm, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPostClient({ post }: { post: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.descripcion,
    image: post.cover_url || "https://12enpunto.cl/images/blog/featured.png",
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: {
      "@type": "Person",
      name: post.autor_nombre || "Francisca",
      jobTitle: post.autor_cargo || "Fundadora",
      worksFor: { "@type": "Organization", name: "12enpunto" },
    },
    publisher: {
      "@type": "Organization",
      name: "12enpunto",
      logo: { "@type": "ImageObject", url: "https://12enpunto.cl/images/brand/12np-v.svg" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://12enpunto.cl/blog/${post.slug}` },
    keywords: post.etiquetas?.split(",").map((s: string) => s.trim()) || [],
  };

  const readingTime = getReadingTime(post.contenido);

  const [authorProfile, setAuthorProfile] = useState<{
    full_name?: string;
    avatar_url?: string;
    bio?: string;
    linkedin?: string;
    correo?: string;
  } | null>(null);

  useEffect(() => {
    async function loadAuthorProfile() {
      if (!post.user_id) return;
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, bio, linkedin, correo")
          .eq("id", post.user_id)
          .single();
        if (data && !error) {
          setAuthorProfile(data);
        }
      } catch (err) {
        console.error("No se pudo cargar el perfil del autor", err);
      }
    }
    loadAuthorProfile();
  }, [post.user_id]);

  return (
    <div className="flex flex-col w-full bg-[#fdfbf7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Article Header */}
      <header className="w-full pt-16 md:pt-24 pb-12 px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#f15a24] text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} /> Volver al blog
          </Link>
          
          <div className="space-y-6">
            {post.categoria && (
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-[#f15a24] text-[10px] font-bold rounded-full tracking-[0.1em] uppercase">
                {post.categoria}
              </span>
            )}
            <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold font-[family-name:var(--font-fraunces)] leading-[1.1] text-[#1a1a1a] tracking-tight">
              {post.titulo}
            </h1>
            {post.descripcion && (
              <p className="text-[clamp(1.1rem,2.5vw,1.4rem)] text-gray-500 font-medium leading-relaxed">
                {post.descripcion}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                {authorProfile?.avatar_url || post.autor_url ? (
                  <Image src={authorProfile?.avatar_url || post.autor_url} alt={authorProfile?.full_name || post.autor_nombre} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <User size={20} />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1a1a1a]">{authorProfile?.full_name || post.autor_nombre || "Francisca"}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.autor_cargo || "Fundadora"}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-[#f15a24]/60" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-[#f15a24]/60" />
                <span>{readingTime} min de lectura</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.cover_url && (
        <section className="w-full px-8 md:px-16 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-900/5">
              <Image 
                src={post.cover_url} 
                alt={post.titulo} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="w-full px-8 md:px-16 pb-32">
        <div className="max-w-3xl mx-auto relative">


          <article 
            className="prose prose-lg md:prose-xl max-w-none text-gray-600 leading-relaxed font-medium 
              prose-headings:font-[family-name:var(--font-fraunces)] prose-headings:text-[#1a1a1a] 
              prose-a:text-[#f15a24] prose-strong:text-[#1a1a1a] prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: post.contenido }}
          />

          {/* Tag Cloud */}
          {post.etiquetas && (
            <div className="flex flex-wrap gap-2 pt-16">
              {post.etiquetas.split(",").map((tag: string) => (
                <span key={tag} className="px-4 py-1.5 bg-white border border-gray-100 text-gray-400 text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-orange-50 hover:text-[#f15a24] transition-colors cursor-pointer">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio Card */}
          <div className="mt-20 p-8 md:p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/20 flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 bg-gray-50 ring-4 ring-white shadow-lg">
              {authorProfile?.avatar_url || post.autor_url ? (
                <Image src={authorProfile?.avatar_url || post.autor_url} alt={authorProfile?.full_name || post.autor_nombre} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <User size={40} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a]">
                {authorProfile?.full_name || post.autor_nombre || "Francisca"}
              </h3>
              <p className="text-gray-500 leading-relaxed max-w-xl">
                {authorProfile?.bio || "Fundadora de 12enpunto y apasionada por la alquimia de los sabores. Cree que la mejor pastelería es la que cuenta una historia honesta."}
              </p>
              
              <div className="flex items-center gap-4 mt-2">
                {authorProfile?.linkedin && (
                  <a href={authorProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
                {authorProfile?.correo && (
                  <a href={`mailto:${authorProfile.correo}`} className="text-gray-400 hover:text-[#f15a24] transition-colors" title="Enviar correo">
                    <Mail size={20} />
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
