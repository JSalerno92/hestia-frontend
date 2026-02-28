export function sendBookingToWhatsApp(booking) {

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

    Reserva ID: ${id}
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
}