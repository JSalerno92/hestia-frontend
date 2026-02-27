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

const isLocalhost = window.location.hostname === 'localhost';

export const devBackendUrl = isLocalhost
  ? 'http://localhost:3000'
  : 'http://192.168.1.40:3000';


await fetchServices();

const app = document.querySelector('#app');

function renderApp() {

  app.innerHTML = renderLayout(renderHome());

  bindHeaderEvents();

  setActiveNav('homeBtn');
}

maybeShowWelcome(renderApp);

