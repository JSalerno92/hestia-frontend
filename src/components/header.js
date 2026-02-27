export function renderHeader() {
  return `
    <header class="main-header">
      <div class="container">
        
        <div class="logo">
          <img src="/hestia-logo.svg" alt="Hestia logo"/>
        </div>

        <!-- NAV DESKTOP -->
        <nav class="nav-desktop">
          <div class="nav-btn" id="homeBtn">
            <a>Inicio</a>
          </div>
          <div class="nav-btn" id="whoWeAre">
            <a>Quienes somos</a>
          </div>
          <div class="nav-btn" id="contactBtn">
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <!-- HAMBURGUESA MOBILE -->
        <button class="hamburger" id="hamburgerBtn" aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      <!-- SIDEBAR MOBILE -->
      <div class="mobile-sidebar" id="mobileSidebar">
        <div class="mobile-nav">
          <div class="nav-btn" id="mobileHomeBtn">Inicio</div>
          <div class="nav-btn" id="mobileWhoWeAre">Quienes somos</div>
          <div class="nav-btn" id="mobileContactBtn">Contacto</div>
        </div>
        <div class="copy-container">
          <p>© ${new Date().getFullYear()} Aldu & Cata</p>
        </div>
      </div>

      <div class="sidebar-overlay" id="sidebarOverlay"></div>
    </header>
  `;
}
