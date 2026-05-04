"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, Building2, Package, Send, Cookie, ClipboardList, Pencil } from "lucide-react";
import Image from "next/image";

const PRODUCTS = [
  {
    id: "torta",
    title: "Torta de Chocolate",
    image: "/images/products/products1.webp",
  },
  {
    id: "croissant",
    title: "Croissant Clásico",
    image: "/images/products/products2.webp",
  },
  {
    id: "macarons",
    title: "Macarons Surtidos",
    image: "/images/products/products3.webp",
  },
  {
    id: "cafe",
    title: "Café Especialidad",
    image: "/images/products/products4.webp",
  }
];

export default function CotizarClient() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Selección
    productosSeleccionados: [] as string[],
    cantidades: {} as Record<string, string>,
    // Step 2: Requerimientos
    productosPersonalizados: "",
    // Step 3: Empresa
    empresa: "",
    contacto: "",
    email: "",
    tel: "",
    // Step 4: Envío
    fecha: "",
    direccion: "",
    comentarios: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (productId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      cantidades: { ...prev.cantidades, [productId]: value }
    }));
  };

  const toggleProduct = (productId: string) => {
    setFormData(prev => {
      const isSelected = prev.productosSeleccionados.includes(productId);
      const selected = isSelected
        ? prev.productosSeleccionados.filter(id => id !== productId)
        : [...prev.productosSeleccionados, productId];

      const newCantidades = { ...prev.cantidades };
      if (isSelected) {
        delete newCantidades[productId];
      } else {
        newCantidades[productId] = "100"; // Default quantity
      }

      return {
        ...prev,
        productosSeleccionados: selected,
        cantidades: newCantidades
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSubmitted(true), 1500);
  };

  const steps = [
    { id: 1, title: "Productos", icon: Cookie },
    { id: 2, title: "Requerimientos", icon: Package },
    { id: 3, title: "Empresa", icon: Building2 },
    { id: 4, title: "Revisión", icon: ClipboardList },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-8 relative overflow-hidden">
        {/* Background Image Top Half */}
        <div className="absolute top-0 left-0 w-full h-[50vh] z-0">
          <Image
            src="/images/brand/background.png"
            alt="Success Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#fdfbf7]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center space-y-8 shadow-2xl shadow-black/10 border border-[#3d332e]/5 relative z-10"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto shadow-inner">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a]">¡Solicitud Recibida!</h2>
            <p className="text-gray-500 leading-relaxed">
              Gracias por interesarte en trabajar con nosotras. Revisaremos tu solicitud de cotización y te contactaremos en menos de 24 horas hábiles.
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-5 bg-[#3d332e] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#f15a24] transition-all duration-300 shadow-lg shadow-[#3d332e]/20"
          >
            Volver al Inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-5xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a] tracking-tight">
            Cotización para <span className="text-[#f15a24]"> Pymes & Empresas</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Ayúdanos a entender las necesidades de tu negocio para ofrecerte los mejores sabores.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="relative max-w-3xl mx-auto">
          <div className="flex justify-between items-center relative z-10">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${step >= s.id ? 'bg-[#3d332e] text-white border-[#3d332e]' : 'bg-white text-gray-300 border-gray-100'
                    } ${step === s.id ? 'ring-4 ring-[#3d332e]/10 scale-110' : ''}`}
                >
                  <s.icon size={16} className="md:w-5 md:h-5" />
                </div>
                <span className={`text-[9px] uppercase font-bold tracking-[0.1em] transition-colors ${step >= s.id ? 'text-[#3d332e]' : 'text-gray-300'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-5 md:top-6 left-0 w-full h-0.5 bg-gray-100 -z-10" />
          <motion.div
            className="absolute top-5 md:top-6 left-0 h-0.5 bg-[#3d332e] -z-10"
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-black/[0.03] border border-[#3d332e]/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.form
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-center md:text-left space-y-2">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Selecciona tus productos</h3>
                    <p className="text-gray-400 text-sm">Elige los productos básicos que te interesan para tu negocio.</p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {PRODUCTS.map((p) => (
                      <motion.div
                        key={p.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleProduct(p.id)}
                        className={`cursor-pointer group relative rounded-3xl overflow-hidden border-2 transition-all duration-300 ${formData.productosSeleccionados.includes(p.id)
                          ? 'border-[#f15a24] shadow-xl shadow-orange-500/10'
                          : 'border-transparent bg-gray-50'
                          }`}
                      >
                        <div className="aspect-square relative">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${formData.productosSeleccionados.includes(p.id) ? 'opacity-90' : 'opacity-100'
                              }`}
                          />
                          <div className={`absolute inset-0 bg-[#f15a24]/10 transition-opacity duration-300 ${formData.productosSeleccionados.includes(p.id) ? 'opacity-100' : 'opacity-0'
                            }`} />

                          {formData.productosSeleccionados.includes(p.id) && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-[#f15a24] rounded-full flex items-center justify-center text-white shadow-lg">
                              <CheckCircle2 size={14} />
                            </div>
                          )}
                        </div>
                        <div className="p-4 bg-white">
                          <h4 className={`text-xs font-bold uppercase tracking-tight text-center ${formData.productosSeleccionados.includes(p.id) ? 'text-[#f15a24]' : 'text-[#3d332e]'
                            }`}>
                            {p.title}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-center md:text-left space-y-2">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Cantidades</h3>
                    <p className="text-gray-400 text-sm">Define cuánto necesitas de cada producto seleccionado.</p>
                  </div>

                  {formData.productosSeleccionados.length > 0 ? (
                    <div className="space-y-4">
                      {formData.productosSeleccionados.map((id) => {
                        const product = PRODUCTS.find(p => p.id === id);
                        if (!product) return null;
                        return (
                          <div key={id} className="flex items-center justify-between p-4 bg-[#fdfbf7] rounded-2xl border border-[#3d332e]/5 group hover:border-[#f15a24]/30 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                                <Image src={product.image} alt={product.title} fill className="object-cover" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-[#3d332e] uppercase tracking-tight">{product.title}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Empresarial</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/30">Unidades:</label>
                              <input
                                required
                                type="number"
                                min="1"
                                value={formData.cantidades[id] || ""}
                                onChange={(e) => handleQuantityChange(id, e.target.value)}
                                className="w-24 px-4 py-3 bg-white border border-[#3d332e]/10 rounded-xl focus:outline-none focus:border-[#f15a24] text-center font-bold text-[#3d332e] transition-colors"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-[#fdfbf7] rounded-3xl border-2 border-dashed border-gray-100">
                      <p className="text-gray-400 text-sm font-medium">No has seleccionado productos en el paso anterior.</p>
                      <button type="button" onClick={() => setStep(1)} className="mt-2 text-[#f15a24] font-bold text-xs uppercase tracking-widest hover:underline">
                        Volver a productos
                      </button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">¿Tienes alguna estimación de tiempo para este requerimiento?</label>
                    <textarea
                      name="productosPersonalizados"
                      value={formData.productosPersonalizados}
                      onChange={handleChange}
                      placeholder="Ej: Lo necesito para fines de mes, o en 2 semanas..."
                      rows={4}
                      className="w-full px-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center md:text-left space-y-2 mb-8">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Datos de tu Empresa</h3>
                    <p className="text-gray-400 text-sm">Cuéntanos sobre tu negocio para personalizar tu propuesta.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Nombre de la Empresa / Pyme</label>
                    <input
                      required
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Ej: Café y Aroma S.A."
                      className="w-full px-4 py-3 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Persona de Contacto</label>
                      <input
                        required
                        name="contacto"
                        value={formData.contacto}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Teléfono</label>
                      <input
                        required
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        placeholder="+56 9 ..."
                        className="w-full px-4 py-3 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">Email Corporativo</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="empresa@correo.com"
                      className="w-full px-4 py-3 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Revisa tu solicitud</h3>
                    <p className="text-gray-400 text-sm">Confirma que todo esté correcto antes de enviar.</p>
                  </div>

                  {/* 2 columnas: Empresa | Productos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

                    {/* Empresa */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between  pb-4 ">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40">Datos de la empresa</span>
                        <button type="button" onClick={() => setStep(3)} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#f15a24] hover:underline"><Pencil size={11} />Editar</button>
                      </div>
                      <div className="space-y-8">
                        {[
                          { label: "Empresa", value: formData.empresa },
                          { label: "Contacto", value: formData.contacto },
                          { label: "Email", value: formData.email },
                          { label: "Teléfono", value: formData.tel },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-[#3d332e]/30 mb-0.5">{label}</p>
                            <p className="text-sm font-semibold text-[#3d332e] truncate">{value || "—"}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Productos */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between  pb-4 ">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40">Productos seleccionados</span>
                        <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#f15a24] hover:underline"><Pencil size={11} />Editar</button>
                      </div>
                      {formData.productosSeleccionados.length > 0 ? (
                        <div className="divide-y divide-[#3d332e]/5 border border-[#3d332e]/5 rounded-2xl overflow-hidden">
                          {formData.productosSeleccionados.map((id) => {
                            const product = PRODUCTS.find(p => p.id === id);
                            if (!product) return null;
                            return (
                              <div key={id} className="flex items-center justify-between px-4 py-3 bg-[#fdfbf7]">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image src={product.image} alt={product.title} fill className="object-cover" />
                                  </div>
                                  <span className="text-sm font-bold text-[#3d332e]">{product.title}</span>
                                </div>
                                <span className="text-sm font-bold text-[#f15a24]">{formData.cantidades[id] || "—"} uds.</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">Sin productos seleccionados.</p>
                      )}
                      {/* Requerimientos */}
                      {formData.productosPersonalizados && (
                        <div className="space-y-1 mt-2">
                          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40">Detalle adicional</span>
                          <p className="text-sm text-[#3d332e]">{formData.productosPersonalizados}</p>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Aviso */}
                  <p className="text-xs text-gray-400 leading-relaxed border-t border-[#3d332e]/5 pt-4">
                    Al confirmar, enviarás esta solicitud a <span className="font-bold text-[#3d332e]">12 en Punto</span>. Nos pondremos en contacto contigo en menos de 24 horas hábiles.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3.5 bg-white text-[#3d332e] border border-[#3d332e]/10 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                  >
                    <ChevronLeft size={18} />
                    Atrás
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (step === 1 && formData.productosSeleccionados.length === 0) ||
                      (step === 2 && (formData.productosSeleccionados.length === 0 || !formData.productosSeleccionados.every(id => formData.cantidades[id] && parseInt(formData.cantidades[id]) > 0))) ||
                      (step === 3 && (!formData.empresa || !formData.contacto || !formData.tel || !formData.email))
                    }
                    className={`flex-[2] py-3.5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                      ((step === 1 && formData.productosSeleccionados.length > 0) ||
                      (step === 2 && formData.productosSeleccionados.length > 0 && formData.productosSeleccionados.every(id => formData.cantidades[id] && parseInt(formData.cantidades[id]) > 0)) ||
                      (step === 3 && formData.empresa && formData.contacto && formData.tel && formData.email))
                        ? "bg-[#3d332e] text-white hover:bg-[#f15a24]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Siguiente Paso
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-[2] py-3.5 bg-[#74865e] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#3d332e] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#74865e]/20"
                  >
                    Enviar Solicitud
                    <Send size={18} />
                  </button>
                )}
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
