"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Phone, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import B2BBanner from "@/components/B2BBanner";
import { toast } from "sonner";

export default function ContactoClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contactos")
        .insert([{
          nombre: formData.nombre,
          email: formData.email,
          whatsapp: `+56 9 ${formData.whatsapp}`,
          mensaje: formData.mensaje,
          leido: false
        }]);

      if (error) throw error;
      
      setIsSubmitted(true);
      toast.success("Mensaje enviado correctamente");
    } catch (error: any) {
      console.error("Error sending contact form:", error);
      toast.error("Error al enviar el mensaje", {
        description: "Por favor intenta nuevamente o contáctanos por WhatsApp."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "whatsapp") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header centrado — misma estructura que La Carta */}
      <header className="w-full pt-12 md:pt-12 pb-12 px-8 md:px-16 text-center space-y-6">
        <div className="max-w-7xl mx-auto">
          <span className="block text-[#f15a24] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">Experiencia Contacto</span>
          <h1 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-[1.15] text-[#1a1a1a] tracking-tight">
            Estemos en <span className="text-[#f15a24]">contacto.</span>
          </h1>
          <p className="mt-3 sm:mt-8 text-[clamp(0.8rem,2vw,1rem)] text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            ¿Tienes alguna duda, comentario o simplemente quieres saludar? Estamos aquí para escucharte.
          </p>
        </div>
      </header>

      <section className="w-full px-8 md:px-16 pb-16 md:pb-32">
        <div className="max-w-7xl mx-auto w-full space-y-12">

          {/* Formulario */}
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
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {/* Columna izquierda: Nombre, Email, WhatsApp */}
                      <div className="space-y-6 flex flex-col">
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
                          <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#3d332e]/30 select-none">+56 9</span>
                            <input
                              required
                              type="tel"
                              id="whatsapp"
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleChange}
                              inputMode="numeric"
                              maxLength={8}
                              placeholder="1234 5678"
                              className="w-full pl-20 pr-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors placeholder-[#3d332e]/20 text-[#3d332e]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Columna derecha: Mensaje + botón */}
                      <div className="flex flex-col gap-6">
                        <div className="space-y-2 flex-1">
                          <label htmlFor="mensaje" className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Mensaje</label>
                          <textarea
                            required
                            id="mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            placeholder="¿En qué podemos ayudarte?"
                            className="w-full h-[calc(100%-2rem)] min-h-[160px] px-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors placeholder-[#3d332e]/20 text-[#3d332e] resize-none"
                          />
                        </div>

                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#3d332e] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#f15a24] transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Mensaje
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                      </div>
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

          {/* Fila horizontal: WhatsApp + Pyme */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* WhatsApp */}
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group p-6 rounded-2xl border-2 border-[#74865e]/20 bg-[#74865e]/5 hover:border-[#74865e]/60 hover:bg-[#74865e]/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#74865e] flex items-center justify-center text-white shadow-lg shadow-[#74865e]/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#74865e] mb-0.5">Escríbenos directo</span>
                <p className="font-bold text-[#3d332e] text-base group-hover:text-[#74865e] transition-colors font-[family-name:var(--font-fraunces)]">Hablar por WhatsApp</p>
                <p className="text-[#3d332e]/50 text-xs mt-1">Te respondemos a la brevedad.</p>
              </div>
            </a>

            {/* Pyme / Empresa */}
            <a href="/cotizar" className="flex items-center gap-6 group p-6 rounded-2xl border-2 border-[#f15a24]/20 bg-[#f15a24]/5 hover:border-[#f15a24]/60 hover:bg-[#f15a24]/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#f15a24] flex items-center justify-center text-white shadow-lg shadow-[#f15a24]/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <ChevronRight size={20} />
              </div>
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#f15a24] mb-0.5">¿Tienes una Pyme o Empresa?</span>
                <p className="font-bold text-[#3d332e] text-base group-hover:text-[#f15a24] transition-colors font-[family-name:var(--font-fraunces)]">Colaboremos juntos</p>
                <p className="text-[#3d332e]/50 text-xs mt-1">Creamos experiencias dulces para tu equipo o clientes.</p>
              </div>
            </a>
          </motion.div>

        </div>
      </section>

      {/* B2B / Pyme Banner */}
      <B2BBanner />
    </div>
  );
}
