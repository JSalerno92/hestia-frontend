const hostname = window.location.hostname;

const isLocalhost =
  hostname === 'localhost' ||
  hostname === '127.0.0.1';

const isLocalIP =
  hostname.startsWith('192.168.') ||
  hostname.startsWith('10.') ||
  hostname.startsWith('172.');

let backendUrl;

if (isLocalhost) {
  backendUrl = import.meta.env.VITE_BACKEND_LOCALHOST;
} else if (isLocalIP) {
  backendUrl = import.meta.env.VITE_BACKEND_LOCAL_IP;
} else {
  // Producción (Netlify)
  backendUrl = import.meta.env.VITE_BACKEND_URL;
}

export { backendUrl };