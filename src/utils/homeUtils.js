import { openServiceModal } from '../components/serviceModal';
import { getCachedServices } from '../services/servicesApi';

/* ---------- CONTENIDO ---------- */

export function getHomeContent() {
  return `
    <section class="home-btn-section">
      <div class="home-btn-group clean" id="group-clean"></div>
      <div class="home-btn-group events" id="group-events"></div>
    </section>
  `
}

function createServiceButton(service) {
  const btn = document.createElement('div');
  btn.className = 'home-btn';
  btn.dataset.id = service.id;

  btn.style.backgroundColor = service.ui_color;

  const title = document.createElement('a');
  title.textContent = service.name;

  const info = document.createElement('div');
  info.className = 'icon-hours';
  info.innerHTML = service.description || '';

  btn.appendChild(title);
  btn.appendChild(info);

  btn.addEventListener('click', () => {
    openServiceModal(service);
  });

  return btn;
}

export async function bindHomeButtons() {

  const cleanContainer = document.querySelector('.home-btn-group.clean');
  const eventsContainer = document.querySelector('.home-btn-group.events');

  cleanContainer.innerHTML = '';
  eventsContainer.innerHTML = '';

   try {
    const services = getCachedServices();

    if (!services) {
      console.error('Services not preloaded');
      return;
    }

    services.forEach(service => {

      const btn = document.createElement('div');
      btn.className = 'home-btn';
      btn.dataset.id = service.id;
      btn.style.backgroundColor = service.ui_color;

      const title = document.createElement('a');
      title.textContent = service.name;

      const info = document.createElement('div');
      info.className = 'icon-hours';

      info.innerHTML = `
        <p>${service.description || ''}</p>
      `;

      btn.appendChild(title);
      btn.appendChild(info);

      btn.addEventListener('click', () => {
        openServiceModal(service);
      });

      if (service.service_group === 'clean') {
        cleanContainer.appendChild(btn);
      } else {
        eventsContainer.appendChild(btn);
      }
    });

  } catch (error) {
    console.error('Error loading services', error);
  }
}