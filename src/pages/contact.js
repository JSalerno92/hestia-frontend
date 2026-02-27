export function renderContact() {
  return `
    <section class="contact-section">
      <div class="contact-container">
        <!--<h3>Contacto</h3>-->

        <form class="contact-form" id="contactForm">

          <div class="contact-group">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div class="contact-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div class="contact-group">
            <label for="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="+54 9 ..."
            />
          </div>

          <div class="contact-group">
            <label for="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="4"
              placeholder="Escribí tu mensaje"
              required
            ></textarea>
          </div>

          <div class="contact-group btn">
            <button type="submit" class="submit-btn">
              Enviar mensaje
            </button>
          </div>

        </form>
      </div>
    </section>
  `;
}
