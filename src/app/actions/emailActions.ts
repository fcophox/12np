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
      from: '12enpunto <hola@12enpunto.cl>',
      to: ['somos12enpunto@gmail.com'],
      subject: `Nuevo mensaje de Contacto: ${formData.nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #f15a24; font-size: 32px; margin-bottom: 10px;">Nuevo mensaje desde la Web</h2>
          <p style="color: #666;">Has recibido un nuevo mensaje desde el sitio web de 12enpunto.</p>
          
          <div style="background: #f9f4e8; padding: 25px; border-radius: 15px; border: 1px solid #f15a24; margin-top: 25px;">
            <h3 style="margin-top: 0; color: #3d332e; border-bottom: 1px solid #f15a2420; padding-bottom: 10px;">Datos del Contacto</h3>
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${formData.nombre}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="margin: 10px 0;"><strong>WhatsApp:</strong> ${formData.whatsapp}</p>
            
            <h3 style="margin-top: 20px; color: #3d332e;">Mensaje:</h3>
            <p style="background: #ffffff; padding: 15px; border-radius: 10px; white-space: pre-wrap; color: #3d332e; border: 1px solid #eee;">${formData.mensaje}</p>
          </div>
          
          <p style="font-size: 11px; color: #999; margin-top: 40px; text-align: center; border-top: 1px solid #eee; pt-20">
            Este es un mensaje automático enviado desde el formulario de contacto de 12enpunto.
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
    nombre: string;
    cantidad: string;
  }[];
  detalleAdicional: string;
}) {
  console.log("Iniciando envío de correo de cotización...");

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no encontrada.");
    return { success: false, error: "API Key missing" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: '12enpunto <hola@12enpunto.cl>',
      to: ['somos12enpunto@gmail.com'],
      subject: `Nueva Solicitud de Cotización: ${formData.empresa}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #74865e; font-size: 32px; margin-bottom: 10px;">Nueva Solicitud B2B</h2>
          <p style="color: #666;">Has recibido una nueva solicitud de cotización desde el sitio web.</p>
          
          <div style="background: #fdfbf7; padding: 25px; border-radius: 15px; border: 1px solid #74865e; margin-top: 25px;">
            <h3 style="margin-top: 0; color: #3d332e; border-bottom: 1px solid #74865e20; padding-bottom: 10px;">Datos de la Empresa</h3>
            <p style="margin: 10px 0;"><strong>Empresa:</strong> ${formData.empresa}</p>
            <p style="margin: 10px 0;"><strong>Contacto:</strong> ${formData.contacto}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${formData.tel}</p>
          </div>

          <div style="margin-top: 25px;">
            <h3 style="color: #3d332e;">Productos Solicitados</h3>
            <div style="background: #ffffff; border: 1px solid #eee; border-radius: 10px; padding: 15px;">
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${formData.productos.map(p => `
                  <li style="padding: 10px 0; border-bottom: 1px solid #f9f9f9; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold; color: #3d332e; font-size: 14px;">${p.nombre}</span>
                    <span style="background: #74865e10; color: #74865e; padding: 4px 12px; rounded-full; font-weight: bold; font-size: 12px; border-radius: 20px;">
                      ${p.cantidad} unidades
                    </span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
          
          ${formData.detalleAdicional ? `
          <div style="margin-top: 25px;">
            <h3 style="color: #3d332e;">Detalle Adicional / Tiempos</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; white-space: pre-wrap; color: #555; font-size: 14px; line-height: 1.5;">${formData.detalleAdicional}</div>
          </div>
          ` : ''}
          
          <p style="font-size: 11px; color: #999; margin-top: 40px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
            Este es un mensaje automático enviado desde el sistema de cotizaciones de 12enpunto.
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
