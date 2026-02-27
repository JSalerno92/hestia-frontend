const NAV_IDS = ['homeBtn', 'whoWeAre', 'contactBtn'];

export function setActiveNav(activeId) {
  NAV_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.toggle('active', id === activeId);
  });
}
