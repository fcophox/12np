"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { login } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        const result = await login(formData);
        // Next.js handles the redirect automatically if login doesn't throw
      } catch (err: any) {
        // If it's a redirect error (standard Next.js behavior), don't show error
        if (err.message === 'NEXT_REDIRECT') return;
        setError("Credenciales inválidas o error de conexión.");
      }
    });
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Global Loading Overlay */}
      {isPending && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfbf7]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-16 h-16 relative mb-4">
            <div className="absolute inset-0 border-4 border-[#3d332e]/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-[#f15a24] rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="text-[#3d332e] font-medium animate-pulse" style={{ fontFamily: "var(--font-fraunces)" }}>
            Iniciando sesión...
          </p>
        </div>
      )}
      {/* Left Panel - Form */}
      <div className="w-full md:w-[420px] lg:w-[480px] flex flex-col items-center justify-center px-10 py-12 bg-[#fdfbf7] shrink-0">
        {/* Inner content constrained width */}
        <div className="w-full max-w-sm flex flex-col">
          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#3d332e]/60 hover:text-[#3d332e] transition-colors mb-10 w-fit"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          {/* Logo */}
          <div className="mb-10">
            <Image
              src="/images/brand/12np-h.svg"
              alt="12np logo"
              width={120}
              height={40}
              priority
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-[#3d332e] mb-2"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Te damos la bienvenida
            </h1>
            <p className="text-sm text-[#3d332e]/60">
              Ingresa tus credenciales para acceder a tu cuenta.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
                {error}
              </div>
            )}
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#3d332e]/70 font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#3d332e]/20 bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/30 focus:border-[#f15a24] transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#3d332e]/70 font-medium">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#3d332e]/20 bg-white text-[#3d332e] text-sm placeholder:text-[#3d332e]/30 focus:outline-none focus:ring-2 focus:ring-[#f15a24]/30 focus:border-[#f15a24] transition pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d332e]/40 hover:text-[#3d332e]/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link
                  href="/recuperar-contrasena"
                  className="text-sm text-[#3d332e]/50 hover:text-[#f15a24] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#3d332e] hover:bg-[#2a2220] disabled:bg-[#3d332e]/50 text-[#fdfbf7] font-semibold py-3.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          {/* Footer text */}
          <p className="text-center text-sm text-[#3d332e]/50 mt-8">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/contacto"
              className="font-bold text-[#3d332e] hover:text-[#f15a24] transition-colors"
            >
              Contáctanos
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <Image
          src="/images/brand/background.png"
          alt="12np background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#3d332e]/40" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase border border-white/50 text-white px-3 py-1.5 rounded-full mb-6">
            Momentos únicos
          </span>
          <h2
            className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Sabores que cuentan
            <br />
            historias.
          </h2>
          <p className="text-white/70 text-base max-w-md">
            Únete a nuestra plataforma y gestiona tu experiencia con 12np desde un solo lugar.
          </p>
        </div>
      </div>
    </div>
  );
}
