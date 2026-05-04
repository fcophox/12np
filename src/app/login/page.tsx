"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex overflow-hidden">
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
              Bienvenido de nuevo
            </h1>
            <p className="text-sm text-[#3d332e]/60">
              Ingresa tus credenciales para acceder a tu cuenta.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }}>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#3d332e]/70 font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
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
              className="w-full bg-[#3d332e] hover:bg-[#2a2220] text-[#fdfbf7] font-semibold py-3.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer"
            >
              Iniciar sesión
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
