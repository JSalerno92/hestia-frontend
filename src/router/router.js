import { updateMainContent } from '../utils/dom';
import { renderHome } from '../pages/home';
import { renderWhoweare } from '../pages/quienessomos';
import { renderContact } from '../pages/contact';
import { setActiveNav } from '../utils/activeNav';
import { bindContactForm } from '../utils/contactUtils';
import { renderService } from '../pages/service.js';
// legales
import { renderPrivacy } from '../pages/privacy';
import { renderTerms } from '../pages/terms';

const routes = {
  home: renderHome,
  whoweare: renderWhoweare,
  contact: renderContact,
  service: renderService,
  privacy: renderPrivacy,
  terms: renderTerms,
};

export function navigateTo(routeName, params = {}) {
  const renderFn = routes[routeName];

  if (!renderFn) {
    console.error(`Ruta no definida: ${routeName}`);
    return;
  }

  updateMainContent(renderFn(params));

  const routeToNavId = {
    home: 'homeBtn',
    whoweare: 'whoWeAre',
    contact: 'contactBtn',
  };

  if (routeToNavId[routeName]) {
    setActiveNav(routeToNavId[routeName]);
  }

  if (routeName === 'contact') {
    setTimeout(bindContactForm, 0);
  }
}
