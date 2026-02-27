import { getHomeContent, bindHomeButtons } from '../utils/homeUtils';

export function renderHome() {
  const html = getHomeContent();

  // Bindeamos después de que el HTML esté en el DOM
  setTimeout(() => bindHomeButtons(), 0);

  return html;
}
