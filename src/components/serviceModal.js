import { renderFormService } from '../models/formService';
import { renderCalendarService } from '../models/calendarService';

export async function openServiceModal(service) {
    const overlay = document.createElement('div');
    overlay.className = 'service-overlay';

    const modal = document.createElement('div');
    modal.className = 'service-modal';

    modal.style.borderTop = `6px solid ${service.ui_color}`;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    let content;

    if (service.requires_form) {
        content = await renderFormService(service);
    } else {
        content = await renderCalendarService(service);
    }

    if (!(content instanceof Node)) {
        console.error('Modal content inválido:', content);
        return;
    }

    modal.appendChild(closeBtn);
    modal.appendChild(content);
    overlay.appendChild(modal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });

    document.body.appendChild(overlay);
}
