import { getCachedServices } from '../services/servicesApi';
import { renderFormService } from '../models/formService';
import { renderCalendarService } from '../models/calendarService';

export function renderService({ serviceId }) {
  const services = getCachedServices();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return `<p>Servicio no encontrado</p>`;
  }

  if (service.service_type === 'form') {
    return renderFormService(service);
  }

  if (service.service_type === 'calendar') {
    return renderCalendarService(service);
  }

  return `<p>Tipo de servicio inválido</p>`;
}
