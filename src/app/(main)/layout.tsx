"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const SHOW_COMING_SOON = false;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  if (SHOW_COMING_SOON && isRoot) {
    return (
      <main className="min-h-screen flex flex-col">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
