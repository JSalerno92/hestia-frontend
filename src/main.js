import './styles/main.css';
import './styles/header.css';
import './styles/components.css';
import './styles/home.css';
import './styles/footer.css';
import './styles/service.css';
import './styles/contact.css';
import './styles/whoweare.css';
import './styles/welcomeoverlay.css';

import { renderLayout } from './utils/dom';
import { renderHome } from './pages/home';
import { bindHeaderEvents } from './components/headerEvents';
import { setActiveNav } from './utils/activeNav';
import { maybeShowWelcome } from './services/welcomeService';
import { fetchServices } from './services/servicesApi';

try {
  await fetchServices();
} catch (e) {
  console.error("Services preload failed", e);
}

const app = document.querySelector('#app');

function renderApp() {

  app.innerHTML = renderLayout(renderHome());

  bindHeaderEvents();

  setActiveNav('homeBtn');
}

maybeShowWelcome(renderApp);

