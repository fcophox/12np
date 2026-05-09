import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: `${post.titulo} | 12enpunto`,
    description: post.descripcion,
    openGraph: {
      type: "article",
      title: `${post.titulo} | 12enpunto`,
      description: post.descripcion,
      url: `https://12enpunto.com/blog/${post.slug}`,
      images: [{ url: post.cover_url || "/images/blog/featured.png", width: 1200, height: 630, alt: post.titulo }],
      publishedTime: post.created_at,
      authors: [post.autor_nombre || "12enpunto"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.titulo,
      description: post.descripcion,
      images: [post.cover_url || "/images/blog/featured.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
