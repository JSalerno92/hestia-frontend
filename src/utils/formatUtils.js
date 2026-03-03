export function formatReadableDate(dateStr) {
  // Espera formato YYYY-MM-DD
  const [year, month, day] = dateStr.split("-").map(Number);

  // Crear fecha en zona local (evita bug UTC)
  const date = new Date(year, month - 1, day);

  const formatter = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const formatted = formatter.format(date);

  // Capitalizar primera letra (porque weekday en español viene en minúscula)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatInfo(text) {
  if (!text) return '';
  return text
    .trim()
    .split('\n')
    .map(line => `<p>${line.trim()}</p>`)
    .join('');
}

export function addMinutesToTime(time, minutesToAdd) {
  const [hours, minutes] = time.split(':').map(Number);

  const totalMinutes = hours * 60 + minutes + minutesToAdd;

  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}