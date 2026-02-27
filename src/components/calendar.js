export function renderCalendar({
  containerId,
  availability,
  onSelect
}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  Object.entries(availability).forEach(([date, times]) => {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';

    const dateTitle = document.createElement('h4');
    dateTitle.textContent = formatDate(date);
    dayEl.appendChild(dateTitle);

    const slotsEl = document.createElement('div');
    slotsEl.className = 'calendar-slots';

    times.forEach(time => {
      const btn = document.createElement('button');
      btn.textContent = time;
      btn.className = 'calendar-slot';

      btn.addEventListener('click', () => {
        onSelect({ date, time });
      });

      slotsEl.appendChild(btn);
    });

    dayEl.appendChild(slotsEl);
    container.appendChild(dayEl);
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });
}
