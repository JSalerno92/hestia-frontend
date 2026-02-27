import { updateMainContent } from '../utils/dom';
import { renderCalendar } from '../components/calendar';
import { getHomeContent, bindHomeButtons } from '../utils/homeUtils';
import { devBackendUrl } from '../main';

let selectedBooking = {
    serviceId: null,
    date: null,
    time: null
};

function getServiceTitle(serviceId) {
    const map = {
        houseCleanStandard: 'Limpieza hogar standard',
        houseCleanPremium: 'Limpieza hogar premium',
        privateEvents: 'Ayuda eventos privados',
        movingHelp: 'Ayuda mudanza'
    };

    return map[serviceId] || 'Servicio';
}

/* export function renderServiceView(serviceId) {
    const availability = availabilityByService[serviceId] || {};

    updateMainContent(`
        <section class="service-view">
        <h2>${getServiceTitle(serviceId)}</h2>
        <p>Seleccioná fecha y horario disponible</p>

        <div id="calendar"></div>

        <button id="back-home">Volver</button>
        </section>
    `);

    renderCalendar({
        containerId: 'calendar',
        availability,
        onSelect: ({ date, time }) => {
            selectedBooking = {
                serviceId,
                date,
                time
            };

            openBookingModal();
        }
        });

    bindBackHome();
} */
export async function renderServiceView(serviceId) {
  const res = await fetch(`${devBackendUrl}/api/services/${serviceId}`);
  const service = await res.json();

  if (service.requires_form) {
    loadServiceForm(serviceId);
  } else {
    loadCalendar(serviceId);
  }

  bindBackHome();
}


function bindBackHome() {
    const btn = document.getElementById('back-home');
    if (!btn) return;

    btn.addEventListener('click', () => {
        updateMainContent(getHomeContent());
        bindHomeButtons();
    });
}

function openBookingModal() {
    const modalHtml = `
        <div class="modal-overlay" id="booking-modal">
            <div class="modal">
                <h3>Confirmar reserva</h3>

                <p>
                    <strong>Fecha:</strong> ${selectedBooking.date}<br>
                    <strong>Hora:</strong> ${selectedBooking.time}
                </p>

                <form id="booking-form">
                    <label>
                        Nombre *
                        <input type="text" name="name" placeholder="Ingrese su nombre" required />
                    </label>

                    <label>
                        WhatsApp *
                        <input type="tel" name="whatsapp" placeholder="11 1234-5678" required />
                    </label>

                    <label>
                        Email
                        <input type="email" name="email" placeholder="juan.perez@example.com" />
                    </label>

                    <label>
                        Comentarios
                        <textarea name="comments" placeholder="Si desea, ingrese un comentario/ observación"></textarea>
                    </label>

                    <div class="modal-actions">
                        <button type="button" id="cancel-booking">Cancelar</button>
                        <button type="submit">Confirmar</button>
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

function handleBookingSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const bookingData = {
        ...selectedBooking,
        name: formData.get('name'),
        whatsapp: formData.get('whatsapp'),
        email: formData.get('email'),
        comments: formData.get('comments')
    };

    console.log('Reserva completa:', bookingData);

    closeBookingModal();

    // próximo paso: WhatsApp o API
}
