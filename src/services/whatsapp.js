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

  let message = 
`🔔 *Nueva reserva*

*Servicio:* ${service_name}
*Fecha:* ${formattedDate}
*Hora:* ${time_slot}

👤 *Cliente*
• *Nombre:* ${name}
• *WhatsApp:* ${whatsapp}`;

  if (email) message += `\n• *Email:* ${email}`;
  if (comments) message += `\n• *Comentarios:* ${comments}`;

  openWhatsApp(message);
}

/* ==============================
   GENERIC FORM
============================== */

export function sendFormToWhatsApp(serviceName, formData) {

  let message = 
`📩 *Nueva consulta*
*Servicio:* ${serviceName}

📝 *Detalle de la solicitud*
`;

  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      message += `• *${key}:* ${value}\n`;
    }
  });

  openWhatsApp(message.trim());
}