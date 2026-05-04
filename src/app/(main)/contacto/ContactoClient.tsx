"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import B2BBanner from "@/components/B2BBanner";

export default function ContactoClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <section className="min-h-[80vh] flex items-center w-full">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-32 w-full">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

            {/* Left Side: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <span className="block text-[#f15a24] text-xs font-bold tracking-[0.3em] uppercase mb-4">Experiencia Contacto</span>
                <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-fraunces)] leading-tight text-[#1a1a1a]">
                  Estemos en <br />
                  <span className="text-[#f15a24]">contacto.</span>
                </h1>
                <p className="text-[#3d332e]/70 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                  ¿Tienes alguna duda, comentario o simplemente quieres saludar? Estamos aquí para escucharte.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#f15a24]/10 flex items-center justify-center text-[#f15a24] group-hover:bg-[#f15a24] group-hover:text-white transition-colors duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                     <p className="font-bold text-[#3d332e] text-sm uppercase tracking-wider">Email</p>
                    <p className="text-[#3d332e]/60 text-sm">hola@12enpunto.cl</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#f15a24]/10 flex items-center justify-center text-[#f15a24] group-hover:bg-[#f15a24] group-hover:text-white transition-colors duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                     <p className="font-bold text-[#3d332e] text-sm uppercase tracking-wider">Ubicación</p>
                    <p className="text-[#3d332e]/60 text-sm font-medium">
                      Estamos en Santiago de Chile y pronto con la tienda física
                    </p>
                  </div>
                </div>

                {/* WhatsApp Highlighted Box */}
                <div className="mt-12 p-6 rounded-[1rem] border-2 border-[#74865e]/20 bg-[#74865e]/5 flex items-center gap-6 group hover:border-[#74865e]/60 hover:bg-[#74865e]/10 transition-all duration-500 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#74865e] flex items-center justify-center text-white shadow-xl shadow-[#74865e]/20 group-hover:scale-110 transition-transform duration-500">
                    <Phone size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#74865e] mb-1">Canal para estar conectados</span>
                    <a
                      href="https://wa.me/56912345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl md:text-2xl font-bold text-[#3d332e] hover:text-[#74865e] transition-colors font-[family-name:var(--font-fraunces)]"
                    >
                      Hablar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/[0.03] border border-[#3d332e]/5">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label htmlFor="nombre" className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Nombre Completo</label>
                        <input
                          required
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          className="w-full px-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors placeholder-[#3d332e]/20 text-[#3d332e]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Email</label>
                        <input
                          required
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="hola@ejemplo.com"
                          className="w-full px-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors placeholder-[#3d332e]/20 text-[#3d332e]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="whatsapp" className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">WhatsApp</label>
                        <input
                          required
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="+56 9 ..."
                          className="w-full px-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors placeholder-[#3d332e]/20 text-[#3d332e]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="mensaje" className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Mensaje</label>
                        <textarea
                          required
                          id="mensaje"
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          placeholder="¿En qué podemos ayudarte?"
                          rows={4}
                          className="w-full px-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors placeholder-[#3d332e]/20 text-[#3d332e] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-5 bg-[#3d332e] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#f15a24] transition-all duration-300 flex items-center justify-center gap-3 group"
                      >
                        Enviar Mensaje
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
                        <CheckCircle2 size={40} />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-[#3d332e] font-[family-name:var(--font-fraunces)]">¡Mensaje Recibido!</h2>
                        <p className="text-[#3d332e]/60">Gracias {formData.nombre.split(' ')[0]}. Nos pondremos en contacto contigo a la brevedad.</p>
                      </div>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-[#f15a24] font-bold text-sm uppercase tracking-widest hover:underline"
                      >
                        Enviar otro mensaje
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* B2B / Pyme Banner */}
      <B2BBanner />
    </div>
  );
}
