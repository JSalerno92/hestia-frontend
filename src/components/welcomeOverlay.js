export function showWelcomeOverlay(config, onFinish) {
  const duration = Number(config.durationMs) || 3000;

  const overlay = document.createElement('div');
  overlay.className = 'welcome-overlay';

  overlay.innerHTML = `
    <div class="welcome-content">
      <img src="/hestia-logo.svg" alt="Hestia" class="welcome-logo" />
      <h1>${config.message}</h1>
      ${config.subMessage ? `<p>${config.subMessage}</p>` : ''}
    </div>
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });

  setTimeout(() => {
    overlay.classList.remove('visible');
    setTimeout(() => {
      overlay.remove();
      onFinish?.();
    }, 400);
  }, duration);
}
