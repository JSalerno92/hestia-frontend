export function renderFooter() {
  return `
    <footer class="main-footer">
      <div class="container">
      <div class="col">
        <p>Servicio disponible solo para San Miguel, Muñiz y Bella Vista</p>
      </div>
      <div class="col logo">
        <img src="/hestia-logo.svg" alt="Hestia logo"/>
      </div>
      <div class="col social">
        <div style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-start;">
          <div class="col-group ig">
            <img src="/instagram-logo.svg" alt="Instagram logo"/>
            <a 
              href="https://www.instagram.com/servicioshestia?igsh=d3ptbW8xbGhlNDRx"
              target="_blank"
              rel="noopener noreferrer"
            >
              servicioshestia
            </a>
          </div>
          <div class="col-group wap">
            <img src="/whatsapp-logo.svg" alt="WhatsApp logo"/>
            <a 
              href="https://wa.me/5491141705938"
              target="_blank"
              rel="noopener noreferrer"
            >
              1141705938
            </a>
          </div>
          <div class="col-group mail">
            <img src="/email-logo.svg" alt="Email logo"/>
            <a 
              href="mailto:servicioshestia@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              servicioshestia@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
    <!-- Franja legal para "politicas de privacidad" y "terminos y condiciones" -->
    <div class="footer-legal">
      <span>© ${new Date().getFullYear()} Hestia</span>
      <div class="footer-legal-links">
        <a data-route="privacy">Política de privacidad</a>
        <span>|</span>
        <a data-route="terms">Términos y condiciones</a>
      </div>
    </div>
  `;
}