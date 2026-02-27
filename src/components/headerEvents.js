import { navigateTo } from '../router/router';

/* =========================================================
   NAVEGACIÓN DESKTOP
========================================================= */

function bindDesktopNavigation() {
  const routes = [
    { id: 'homeBtn', route: 'home' },
    { id: 'whoWeAre', route: 'whoweare' },
    { id: 'contactBtn', route: 'contact' }
  ];

  routes.forEach(({ id, route }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('click', () => {
      navigateTo(route);
    });
  });
}

/* =========================================================
   NAVEGACIÓN MOBILE
========================================================= */

function bindMobileNavigation(closeMenu) {
  const routes = [
    { id: 'mobileHomeBtn', route: 'home' },
    { id: 'mobileWhoWeAre', route: 'whoweare' },
    { id: 'mobileContactBtn', route: 'contact' }
  ];

  routes.forEach(({ id, route }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('click', () => {
      closeMenu();
      navigateTo(route);
    });
  });
}

/* =========================================================
   MENÚ MOBILE (HAMBURGUESA + SIDEBAR)
========================================================= */

function bindMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!hamburger || !sidebar || !overlay) return;

  function openMenu() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  bindMobileNavigation(closeMenu);
}

/* =========================================================
   EXPORT PRINCIPAL
========================================================= */

export function bindHeaderEvents() {
  bindDesktopNavigation();
  bindMobileMenu();
}
