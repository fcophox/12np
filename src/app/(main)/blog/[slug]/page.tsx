import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata(): Promise<Metadata> {
  // TODO: replace with dynamic data from CMS/context when available
  const title = "El poder silencioso y oculto del ácido en cada plato";
  const description = "Un toque de limón o vinagre puede transformar una preparación plana en una explosión de sabores equilibrados. Descubre el rol del ácido en la pastelería.";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title: `${title} | 12enpunto`,
      description,
      url: "https://12enpunto.cl/blog/el-poder-del-acido",
      images: [{ url: "/images/blog/featured.png", width: 1200, height: 630, alt: title }],
      publishedTime: "2025-05-08T00:00:00Z",
      authors: ["Francisca"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/blog/featured.png"],
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
