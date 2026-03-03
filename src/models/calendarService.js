import { backendUrl } from '../../config';
// import { devBackendUrl } from '../main';
import { formatReadableDate, formatInfo, addMinutesToTime } from '../utils/formatUtils';
import { sendBookingToWhatsApp } from '../services/whatsapp';

let selectedBooking = null;
let currentServiceId = null;
let currentContainer = null;
let currentServiceName = null;

export function renderCalendarService(service) {
  currentServiceId = service.id;
  currentServiceName = service.name;
  const section = document.createElement('section');
  section.className = 'calendar-service';

  section.innerHTML = `
    <div class="calendar-col left" style="background: ${service.ui_color}">
      <h2>${service.name}</h2>
      <p>${service.description}</p>
      <div class="service-info">
        ${formatInfo(service.info)}
      </div>
    </div>

    <div class="calendar-col center"></div>

    <div class="calendar-col right">
      <h3>Selecciona primero el día y luego elegí el bloque horario que se adapte a tu necesidad</h3>
      <div class="calendar-day-slider"></div>
      <div class="calendar-slots-container"></div>
    </div>
  `;

  // 🔥 Carga configuración dinámica del servicio
  loadServiceConfig(service.id, section);

  // 🔥 Carga disponibilidad rolling
  loadAvailability(service.id, section);

  currentContainer = section;

  return section;
}

/* ============================================================
   AVAILABILITY
============================================================ */

async function loadAvailability(serviceId, container) {
  const daysContainer = container.querySelector('.calendar-day-slider');
  const slotsContainer = container.querySelector('.calendar-slots-container');

  daysContainer.innerHTML = `<p>Cargando disponibilidad...</p>`;
  slotsContainer.innerHTML = '';

  try {
    const res = await fetch(
      `${backendUrl}/api/services/${serviceId}/availability`
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    renderDays(data.days || [], serviceId, container, data.duration_minutes);

  } catch (err) {
    daysContainer.innerHTML = `<p>Error cargando disponibilidad</p>`;
  }
}

function renderDays(days, serviceId, container, duration) {
  const slider = container.querySelector('.calendar-day-slider');
  const slotsContainer = container.querySelector('.calendar-slots-container');

  slider.innerHTML = '';
  slotsContainer.innerHTML = '';

  if (!days.length) {
    slider.innerHTML = '<p>No hay disponibilidad próximamente</p>';
    return;
  }

  const availableDays = days.filter(d =>
    d.slots?.some(s => s.available)
  );

  if (!availableDays.length) {
    slider.innerHTML = '<p>No hay disponibilidad próximamente</p>';
    return;
  }

  availableDays.forEach((day, index) => {
    const dayBtn = document.createElement('button');
    dayBtn.className = 'calendar-day-btn';
    dayBtn.textContent = formatReadableDate(day.date);

    dayBtn.addEventListener('click', () => {
      renderSlots(day, serviceId, slotsContainer, container, duration);

      // Scoped removal (evita interferencias)
      container.querySelectorAll('.calendar-day-btn')
        .forEach(b => b.classList.remove('active'));

      dayBtn.classList.add('active');
    });

    slider.appendChild(dayBtn);

    // Auto seleccionar primer día disponible
    if (index === 0) {
      dayBtn.click();
    }
  });
}

function renderSlots(day, serviceId, slotsContainer, container, duration) {
  slotsContainer.innerHTML = '';

  const availableSlots = day.slots.filter(slot => slot.available);

  if (!availableSlots.length) {
    slotsContainer.innerHTML = '<p>No hay horarios disponibles</p>';
    return;
  }

  availableSlots.forEach(slot => {
    const init_time = slot.time;
    const end_time = addMinutesToTime(slot.time, duration);
    const timeRange = `${init_time} a ${end_time}`

    const btn = document.createElement('button');
    btn.className = 'calendar-slot';      

    btn.innerHTML = `
      <span class="slot-time">${timeRange}</span>
      <!--<span class="slot-capacity">
        ${slot.capacity_remaining}
      </span>-->
    `;

    btn.addEventListener('click', () => {
      selectedBooking = {
        serviceId,
        date: day.date,
        time: slot.time
      };

      openBookingModal();
    });

    slotsContainer.appendChild(btn);
  });
}

/* ============================================================
   BOOKING
============================================================ */

function openBookingModal() {
  if (!selectedBooking) return;

  const modalHtml = `
    <div class="modal-overlay" id="booking-modal">
      <div class="modal">
        <h3>Confirmar reserva</h3>

        <p>
          <strong>Fecha:</strong> ${selectedBooking.date}<br>
          <strong>Hora:</strong> ${selectedBooking.time}
        </p>

        <form id="booking-form" class="contact-form">
          <div class="contact-group">
            <label>Nombre *</label>
            <input type="text" name="name" required />
          </div>

          <div class="contact-group">
            <label>WhatsApp *</label>
            <input type="tel" name="whatsapp" required />
          </div>

          <div class="contact-group">
            <label>Email</label>
            <input type="email" name="email" />
          </div>

          <div class="contact-group">
            <label>Comentarios</label>
            <textarea name="comments"></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" id="cancel-booking" class="cancel-btn">X</button>
            <button type="submit" class="submit-btn">
              Confirmar reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  bindBookingModalEvents();
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.remove();
}

function bindBookingModalEvents() {
    const modal = document.getElementById('booking-modal');
    const form = document.getElementById('booking-form');
    const cancelBtn = document.getElementById('cancel-booking');

    cancelBtn.addEventListener('click', closeBookingModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeBookingModal();
    });

    form.addEventListener('submit', handleBookingSubmit);
}

async function handleBookingSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const bookingData = {
    service_id: selectedBooking.service_id,
    date: selectedBooking.date,
    time: selectedBooking.time,
    name: formData.get('name'),
    whatsapp: formData.get('whatsapp'),
    email: formData.get('email'),
    comments: formData.get('comments')
  };

  try {

    // 1️⃣ Persistir primero
    const res = await fetch(
      `${backendUrl}/api/bookings`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      }
    );

    if (!res.ok) throw new Error();

    const savedBooking = await res.json();

    // 2️⃣ Luego abrir WhatsApp
    // sendBookingToWhatsApp(savedBooking);
    sendBookingToWhatsApp({
      ...savedBooking,
      service_name: currentServiceName
    });

    // 3️⃣ Refrescar UI
    closeBookingModal();
    await loadAvailability(currentServiceId, currentContainer);

  } catch (err) {
    alert('Error al generar la reserva');
  }
}

/* ============================================================
   SERVICE CONFIG (CENTER COLUMN)
============================================================ */

async function loadServiceConfig(serviceId, container) {
  const center = container.querySelector('.calendar-col.center');
  center.innerHTML = '<p>Cargando configuración...</p>';

  try {
    const res = await fetch(
      `${backendUrl}/api/services/${serviceId}/config`
    );

    if (!res.ok) {
      center.innerHTML = '<p>Sin configuración adicional</p>';
      return;
    }

    const data = await res.json();
    center.innerHTML = renderServiceConfig(data);

  } catch (err) {
    center.innerHTML = '<p>Sin configuración adicional</p>';
  }
}

function renderServiceConfig(config) {
  if (!config) {
    return '<p>Sin configuración adicional</p>';
  }

  return `
    <div class="service-config">
      <h4>${config.title}</h4>
      <p>${config.description}</p>
      <small>${config.extraInfo || ''}</small>
    </div>
  `;
}