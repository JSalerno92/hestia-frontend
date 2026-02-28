export function sendBookingToWhatsApp(booking) {

  const phone = '5491141705938';

  const message = `
    Nueva reserva 🔔

    Reserva ID: ${booking.id}

    Servicio: ${booking.service_name}
    Fecha: ${booking.date}
    Hora: ${booking.time}

    Nombre: ${booking.name}
    WhatsApp: ${booking.whatsapp}
    Email: ${booking.email || '-'}
    Comentarios: ${booking.comments || '-'}
    `.trim();

  const encoded = encodeURIComponent(message);

  const url = `https://wa.me/${phone}?text=${encoded}`;

  window.open(url, '_blank');
}