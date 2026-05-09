"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  nombre: string;
  email: string;
  whatsapp: string;
  mensaje: string;
}) {
  console.log("Iniciando envío de correo de contacto...");
  
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no encontrada en las variables de entorno.");
    return { success: false, error: "API Key missing" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: '12enpunto <onboarding@resend.dev>',
      to: ['somos12enpunto@gmail.com'],
      subject: `Nuevo mensaje de contacto: ${formData.nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #f15a24;">Nuevo mensaje de contacto</h2>
          <p>Has recibido un nuevo mensaje desde el sitio web de 12enpunto.</p>
          
          <div style="background: #f9f4e8; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <p><strong>Nombre:</strong> ${formData.nombre}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>WhatsApp:</strong> ${formData.whatsapp}</p>
            <p style="margin-top: 20px;"><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${formData.mensaje}</p>
          </div>
          
          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            Este es un mensaje automático enviado desde el formulario de contacto.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return { success: false, error };
    }

    console.log("Correo enviado exitosamente:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado enviando correo:", error);
    return { success: false, error };
  }
}

export async function sendQuotationEmail(formData: {
  empresa: string;
  contacto: string;
  email: string;
  tel: string;
  productos: {
    seleccionados: string[];
    cantidades: Record<string, string>;
  };
  detalleAdicional: string;
}) {
  console.log("Iniciando envío de correo de cotización...");

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no encontrada.");
    return { success: false, error: "API Key missing" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: '12enpunto <onboarding@resend.dev>',
      to: ['somos12enpunto@gmail.com'],
      subject: `Nueva Solicitud de Cotización: ${formData.empresa}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #74865e;">Nueva Solicitud de Cotización (B2B)</h2>
          <p>Has recibido una nueva solicitud de cotización desde el sitio web.</p>
          
          <div style="background: #fdfbf7; padding: 20px; border-radius: 10px; border: 1px solid #74865e; margin-top: 20px;">
            <h3 style="margin-top: 0;">Datos de la Empresa</h3>
            <p><strong>Empresa:</strong> ${formData.empresa}</p>
            <p><strong>Contacto:</strong> ${formData.contacto}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Teléfono:</strong> ${formData.tel}</p>
          </div>

          <div style="margin-top: 20px;">
            <h3>Productos Solicitados</h3>
            <ul>
              ${formData.productos.seleccionados.map(id => `<li><strong>${id}:</strong> ${formData.productos.cantidades[id] || 0} unidades</li>`).join('')}
            </ul>
          </div>
          
          ${formData.detalleAdicional ? `
          <div style="margin-top: 20px;">
            <h3>Detalle Adicional / Tiempos</h3>
            <p style="white-space: pre-wrap;">${formData.detalleAdicional}</p>
          </div>
          ` : ''}
          
          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            Este es un mensaje automático enviado desde el formulario de cotización.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend (Cotización):", error);
      return { success: false, error };
    }

    console.log("Cotización enviada exitosamente:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado en cotización:", error);
    return { success: false, error };
  }
}
