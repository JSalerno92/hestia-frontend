/* export function sendBookingToWhatsApp(booking) {

  const phone = '5491141705938';

  const {
    id,
    date,
    time_slot,
    customer_data = {}
  } = booking;

  const {
    name,
    whatsapp,
    email,
    comments
  } = customer_data;

  // Formatear fecha (evitar ISO feo)
  const formattedDate = new Date(date).toLocaleDateString('es-AR');

  let message = `
    Nueva reserva 🔔

    ID de reserva : ${id}
    Servicio: ${booking.service_name}
    Fecha: ${formattedDate}
    Hora: ${time_slot}

    Nombre: ${name}
    WhatsApp: ${whatsapp}
    `.trim();

    // Solo incluir si existen
    if (email) {
        message += `\nEmail: ${email}`;
    }

    if (comments) {
        message += `\nComentarios: ${comments}`;
    }

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;

  window.open(url, '_blank');
} */
function openWhatsApp(message) {
  const phone = '5491141705938';
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;
  window.open(url, '_blank');
}

/* ==============================
   BOOKING
============================== */

export function sendBookingToWhatsApp(booking) {

  const {
    id,
    date,
    time_slot,
    service_name,
    customer_data = {}
  } = booking;

  const {
    name,
    whatsapp,
    email,
    comments
  } = customer_data;

  const formattedDate = new Date(date).toLocaleDateString('es-AR');

  let message = `
    Nueva reserva 🔔

    Servicio: ${service_name}
    Fecha: ${formattedDate}
    Hora: ${time_slot}

    Nombre: ${name}
    WhatsApp: ${whatsapp}
    `.trim();

  if (email) message += `\nEmail: ${email}`;
  if (comments) message += `\nComentarios: ${comments}`;

  openWhatsApp(message);
}

/* ==============================
   GENERIC FORM
============================== */

export function sendFormToWhatsApp(serviceName, formData) {

  let message = `Nueva consulta - ${serviceName}\n\n`;

  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      message += `${key}: ${value}\n`;
    }
  });

  openWhatsApp(message.trim());
}