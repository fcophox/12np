"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, Building2, Package, Send, Cookie, ClipboardList, Pencil, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { sendQuotationEmail } from "@/app/actions/emailActions";

const FALLBACK_PRODUCTS = [
  {
    id: "torta",
    nombre: "Torta de Chocolate",
    imagen: "/images/products/products1.webp",
  },
  {
    id: "croissant",
    nombre: "Croissant Clásico",
    imagen: "/images/products/products2.webp",
  },
  {
    id: "macarons",
    nombre: "Macarons Surtidos",
    imagen: "/images/products/products3.webp",
  },
  {
    id: "cafe",
    nombre: "Café Especialidad",
    imagen: "/images/products/products4.webp",
  }
];

export default function CotizarClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
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

  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .eq("pausado", false)
          .order("orden", { ascending: true });

        if (error) throw error;
        setProducts(data && data.length > 0 ? data : FALLBACK_PRODUCTS);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoadingProducts(false);
      }
    }
    loadProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "tel") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

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

  const resetForm = () => {
    setFormData({
      productosSeleccionados: [],
      cantidades: {},
      productosPersonalizados: "",
      empresa: "",
      contacto: "",
      email: "",
      tel: "",
      fecha: "",
      direccion: "",
      comentarios: "",
    });
    setStep(1);
    setIsSubmitted(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("cotizaciones")
        .insert([{
          empresa: formData.empresa,
          contacto: formData.contacto,
          email: formData.email,
          tel: `+56 9 ${formData.tel}`,
          productos: {
            seleccionados: formData.productosSeleccionados,
            cantidades: formData.cantidades
          },
          detalle_adicional: formData.productosPersonalizados,
          leido: false
        }]);

      if (error) throw error;

      // Enviar copia por correo
      try {
        await sendQuotationEmail({
          empresa: formData.empresa,
          contacto: formData.contacto,
          email: formData.email,
          tel: `+56 9 ${formData.tel}`,
          productos: {
            seleccionados: formData.productosSeleccionados,
            cantidades: formData.cantidades
          },
          detalleAdicional: formData.productosPersonalizados
        });
      } catch (emailErr) {
        console.error("Error sending email notification:", emailErr);
      }
      
      setIsSubmitted(true);
      toast.success("Solicitud enviada correctamente");
    } catch (error: any) {
      console.error("Error sending quotation:", error);
      toast.error("Error al enviar la solicitud", {
        description: "Por favor intenta nuevamente o contáctanos por WhatsApp."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: "Productos", icon: Cookie },
    { id: 2, title: "Requerimientos", icon: Package },
    { id: 3, title: "Empresa", icon: Building2 },
    { id: 4, title: "Revisión", icon: ClipboardList },
  ];


  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* Header centrado — mismo patrón que páginas internas */}
      <header className="w-full pt-12 md:pt-12 pb-12 px-8 md:px-16 text-center space-y-6">
        <div className="max-w-4xl mx-auto">
          <span className="block text-[#f15a24] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">Pymes & Empresas</span>
          <h1 className="text-[clamp(1.6rem,5vw,3rem)] font-bold font-[family-name:var(--font-fraunces)] leading-[1.15] text-[#1a1a1a] tracking-tight">
            Cotización para <span className="text-[#f15a24]">tu negocio</span>
          </h1>
          <p className="mt-8 text-[clamp(0.8rem,2vw,1rem)] text-[#3d332e]/70 max-w-3xl mx-auto font-medium leading-relaxed">
            Ayúdanos a entender las necesidades de tu negocio para ofrecerte los mejores sabores.
          </p>
        </div>
      </header>

      <div className="w-full px-8 md:px-16 pb-16">
        <div className="max-w-5xl mx-auto relative pt-1">
          
          {/* Stepper Indicator - Solapado sobre la card */}
          <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-30 px-8">
            <div className="flex justify-between items-center relative">
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
                      step >= s.id 
                        ? 'bg-[#3d332e] text-white border-[#fdfbf7]' 
                        : 'bg-white text-gray-300 border-gray-50'
                    } ${step === s.id ? 'ring-8 ring-[#3d332e]/5 scale-110 shadow-xl' : 'shadow-lg shadow-black/5'}`}
                  >
                    <s.icon size={18} className="md:w-6 md:h-6" />
                  </div>
                </div>
              ))}
              
              {/* Connecting Lines */}
              <div className="absolute top-5 md:top-7 left-0 w-full h-0.5 bg-gray-100 -z-10" />
              <motion.div
                className="absolute top-5 md:top-7 left-0 h-0.5 bg-[#3d332e] -z-10"
                initial={{ width: "0%" }}
                animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-[3rem] p-8 md:p-16 pt-16 md:pt-24 shadow-2xl shadow-black/[0.03] border border-[#3d332e]/5 relative overflow-hidden z-10">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center space-y-8 py-10"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold font-[family-name:var(--font-fraunces)] text-[#1a1a1a]">¡Solicitud Recibida!</h2>
                  <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Gracias por interesarte en trabajar con nosotras. Revisaremos tu solicitud de cotización y te contactaremos en menos de 24 horas hábiles.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <button
                    onClick={resetForm}
                    className="flex-1 py-4 bg-[#3d332e] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#f15a24] transition-all duration-300 shadow-lg shadow-[#3d332e]/10"
                  >
                    Cotizar nuevamente
                  </button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="flex-1 py-4 bg-white text-[#3d332e] border border-[#e8e3dd] rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all duration-300"
                  >
                    Volver al Inicio
                  </button>
                </div>
              </motion.div>
            ) : (
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
                  <div className="text-center space-y-2">
                    <h3 className="text-[clamp(1rem,5vw,1.2rem)] font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Selecciona productos que deseas</h3>
                    <p className="text-gray-400 text-sm">Elige los productos que te interesan para tu negocio.</p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {loadingProducts ? (
                      <div className="col-span-2 lg:col-span-4 flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-[#3d332e]/10 border-t-[#f15a24] rounded-full animate-spin" />
                      </div>
                    ) : (
                      products.map((p) => (
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
                              src={p.imagen || "/images/products/products1.webp"}
                              alt={p.nombre}
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
                              {p.nombre}
                            </h4>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-[clamp(1rem,5vw,1.2rem)] font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Cantidad por producto</h3>
                    <p className="text-gray-400 text-sm">Indica las unidades deseadas para cada producto y comentanos si tienes alguna fecha especial.</p>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Columna Izquierda: Lista de Productos */}
                    <div className="space-y-4">
                      {formData.productosSeleccionados.length > 0 ? (
                        formData.productosSeleccionados.map((id) => {
                          const product = products.find(p => p.id === id);
                          if (!product) return null;
                          return (
                            <div key={id} className="flex items-center justify-between p-4 bg-[#fdfbf7] rounded-2xl border border-[#3d332e]/5 group hover:border-[#f15a24]/30 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                                  <Image src={product.imagen || "/images/products/products1.webp"} alt={product.nombre} fill className="object-cover" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#3d332e] uppercase tracking-tight">{product.nombre}</h4>
                                  {/* <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Empresarial</p> */}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1.5">
                                <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 mr-1">Unidades</label>
                                <input
                                  required
                                  type="number"
                                  min="1"
                                  value={formData.cantidades[id] || ""}
                                  onChange={(e) => handleQuantityChange(id, e.target.value)}
                                  className="w-20 px-3 py-2 bg-white border border-[#3d332e]/10 rounded-xl focus:outline-none focus:border-[#f15a24] text-right font-bold text-[#3d332e] transition-colors"
                                />
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-8 text-center bg-[#fdfbf7] rounded-3xl border-2 border-dashed border-gray-100">
                          <p className="text-gray-400 text-sm font-medium">No has seleccionado productos en el paso anterior.</p>
                          <button type="button" onClick={() => setStep(1)} className="mt-2 text-[#f15a24] font-bold text-xs uppercase tracking-widest hover:underline">
                            Volver a productos
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Columna Derecha: Estimación de tiempo */}
                    <div className="space-y-4 h-full flex flex-col">
                      <div className="space-y-2 flex-1">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3d332e]/40 ml-1">¿Tienes alguna estimación de tiempo en mente?</label>
                        <textarea
                          name="productosPersonalizados"
                          value={formData.productosPersonalizados}
                          onChange={handleChange}
                          placeholder="Ej: Lo necesito para fines de mes, o en 2 semanas..."
                          className="w-full h-[200px] md:h-[calc(100%-2rem)] px-5 py-4 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2 mb-8">
                    <h3 className="text-[clamp(1rem,5vw,1.2rem)] font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Datos de tu Pyme o Empresa</h3>
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
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#3d332e]/30 select-none">+56 9</span>
                        <input
                          required
                          name="tel"
                          value={formData.tel}
                          onChange={handleChange}
                          inputMode="numeric"
                          maxLength={8}
                          placeholder="1234 5678"
                          className="w-full pl-16 pr-4 py-3 bg-[#fdfbf7] border border-[#3d332e]/5 rounded-2xl focus:outline-none focus:border-[#f15a24] transition-colors text-[#3d332e]"
                        />
                      </div>
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
                  <div className="space-y-1 text-center">
                    <h3 className="text-[clamp(1rem,5vw,1.2rem)] font-bold font-[family-name:var(--font-fraunces)] text-[#3d332e]">Revisemos tu solicitud</h3>
                    <p className="text-gray-400 text-sm">Puedes confirmar que todo esté correcto antes de enviar o bien, puede editar algo si lo deseas.</p>
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
                            const product = products.find(p => p.id === id);
                            if (!product) return null;
                            return (
                              <div key={id} className="flex items-center justify-between px-4 py-3 bg-[#fdfbf7]">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image src={product.imagen || "/images/products/products1.webp"} alt={product.nombre} fill className="object-cover" />
                                  </div>
                                  <span className="text-sm font-bold text-[#3d332e]">{product.nombre}</span>
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
                    Al confirmar, enviarás esta solicitud al equipo de <span className="font-bold text-[#3d332e]">12 en Punto</span>. Nos pondremos en contacto contigo en menos de 24 horas hábiles.
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
                    disabled={isSubmitting}
                    className="flex-[2] py-3.5 bg-[#74865e] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#3d332e] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#74865e]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Send size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>
);
}
