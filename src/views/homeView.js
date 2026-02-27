import { getCachedServices } from '../api/servicesApi';
import { openService } from '../router';

export function bindHomeButtons() {
  const services = getCachedServices();

  const cleanContainer = document.querySelector('.home-btn-group.clean');
  const eventsContainer = document.querySelector('.home-btn-group.events');

  cleanContainer.innerHTML = '';
  eventsContainer.innerHTML = '';

  services.forEach(service => {
    const btn = createServiceButton(service);

    if (service.group === 'events') {
      eventsContainer.appendChild(btn);
    } else {
      cleanContainer.appendChild(btn);
    }
  });
}

function createServiceButton(service) {
  const btn = document.createElement('div');
  btn.className = 'home-btn';
  btn.style.backgroundColor = service.ui_color;

  btn.innerHTML = `
    <a>${service.name}</a>
    <div class="icon-hours">
      ${service.description || ''}
    </div>
  `;

  /* btn.addEventListener('click', () => openService(service)); */
  btn.addEventListener('click', () => {
    navigateTo('service', { serviceId: service.id });
    });
  return btn;
}
