export function renderFooter() {
  /* return `
    <footer class="main-footer">
      <div class="container">
        <p>© ${new Date().getFullYear()} Aldu & Cata</p>
      </div>
    </footer>
  `; */
  return `
    <footer class="main-footer">
      <div class="container">
      <div class="col">
        <p>Servicio disponible solo para San Miguel</p>
      </div>
      <div class="col logo">
        <img src="/hestia-logo.svg" alt="Hestia logo"/>
      </div>
      <div class="col social">
        <div style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-start;">
          <div class="col-group ig">
            <img src="/instagram-logo.svg" alt="Instagram logo"/>
            <p>Serviciosheastia</p>
          </div>
          <div class="col-group wap">
            <img src="/whatsapp-logo.svg" alt="whatsapp logo"/>
            <p>1141705938</p>
          </div>
          <div class="col-group mail">
            <img src="/email-logo.svg" alt="mail logo"/>
            <p>servicioshestia@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}