export function bindContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      mensaje: form.mensaje.value.trim(),
    };

    console.log('Contacto enviado:', data);

    // Placeholder de acción futura
    alert('Gracias por contactarte. Te responderemos a la brevedad.');

    form.reset();
  });
}
