import { showWelcomeOverlay } from "../components/welcomeOverlay";
import { devBackendUrl } from "../main";

function getMonthlyStorageKey() {
  const now = new Date();
  return `welcome_seen_${now.getFullYear()}_${now.getMonth() + 1}`;
}

function isWithinDateRange(config) {
  if (!config.validFrom || !config.validTo) return true;

  const now = new Date();
  return now >= new Date(config.validFrom) &&
         now <= new Date(config.validTo);
}

let alreadyHandled = false;

export async function maybeShowWelcome(renderAppCallback) {
  if (alreadyHandled) return;
  alreadyHandled = true;

  try {
    const res = await fetch(`${devBackendUrl}/api/welcome-message`);
    const config = await res.json();

    if (!config.active || !isWithinDateRange(config)) {
      renderAppCallback();
      return;
    }

    const storageKey = getMonthlyStorageKey();
    if (localStorage.getItem(storageKey)) {
      renderAppCallback();
      return;
    }

    showWelcomeOverlay(config, () => {
      localStorage.setItem(storageKey, 'true');
      renderAppCallback();
    });

  } catch (err) {
    console.error('Welcome message error:', err);
    renderAppCallback();
  }
}
