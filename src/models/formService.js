import { devBackendUrl } from '../main';
import { updateMainContent } from '../utils/dom';

export async function renderFormService(service) {

  const container = document.createElement('section');
  container.className = 'form-service';

  container.innerHTML = `
    <div class="service-col left">
      <h2>${service.name}</h2>
      <p>${service.description || ''}</p>
    </div>

    <div class="service-col center">
      <div class="form-container">
        <p>Cargando formulario...</p>
      </div>
    </div>

    <div class="service-col right">
      <div class="calendar-container"></div>
    </div>
  `;

  loadFormByService(service.id, container);

  return container;
}

async function loadFormByService(serviceId, container) {
  try {
    const res = await fetch(
      `${devBackendUrl}/api/forms/by-service/${serviceId}`
    );

    const formDefinition = await res.json();

    if (!formDefinition) {
      container.querySelector('.form-container').innerHTML =
        `<p>Este servicio no requiere formulario.</p>`;
      return;
    }

    const formElement = buildForm(formDefinition);

    const formContainer = container.querySelector('.form-container');
    formContainer.innerHTML = '';
    formContainer.appendChild(formElement);

  } catch (error) {
    container.querySelector('.form-container').innerHTML =
      `<p>Error cargando formulario</p>`;
  }
}

function buildForm(formDefinition) {

  const form = document.createElement('form');
  form.className = 'contact-form';
  form.dataset.formId = formDefinition.id;

  formDefinition.fields.forEach(field => {

    const group = document.createElement('div');
    group.className = 'contact-group';

    const label = document.createElement('label');
    label.textContent = field.label;
    label.htmlFor = field.field_key;

    const input = createInput(field);

    group.appendChild(label);
    group.appendChild(input);

    form.appendChild(group);
  });

  const btnGroup = document.createElement('div');
  btnGroup.className = 'contact-group btn';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'submit-btn';
  submitBtn.textContent = 'Enviar';

  btnGroup.appendChild(submitBtn);
  form.appendChild(btnGroup);

  form.addEventListener('submit', handleSubmit);

  return form;
}

function createInput(field) {
  console.log('FIELD:', field);
  console.log('OPTIONS:', field.options);

  let element;

  switch (field.type) {
    case 'textarea':
      element = document.createElement('textarea');
      break;

    case 'select':
      element = document.createElement('select');
      field.options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        element.appendChild(option);
      });
      break;

    default:
      element = document.createElement('input');
      element.type = field.type || 'text';
  }

  element.name = field.field_key;
  element.id = field.field_key;

  if (field.required) {
    element.required = true;
  }

  return element;
}

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(`${devBackendUrl}/api/form-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_id: form.dataset.formId,
        data: payload
      })
    });

    if (!res.ok) throw new Error();

    form.innerHTML = `<p>Formulario enviado correctamente</p>`;

  } catch (error) {
    alert('Error enviando formulario');
  }
}
