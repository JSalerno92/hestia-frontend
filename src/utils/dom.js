import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { bindHeaderEvents } from '../components/headerEvents';

export function renderLayout(contentHtml) {
  /* setTimeout(bindHeaderEvents, 0); */

  return `
    ${renderHeader()}
    <main class="main-container">
      ${contentHtml}
    </main>
    ${renderFooter()}
  `;
}

export function updateMainContent(contentHtml) {
  const main = document.querySelector('.main-container');

  if (!main) {
    console.error('No se encontró .main-container');
    return;
  }

  main.innerHTML = contentHtml;
}