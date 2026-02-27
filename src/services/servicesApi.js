import { devBackendUrl } from '../main';

let servicesCache = null;

export async function fetchServices() {
  if (servicesCache) return servicesCache;

  const res = await fetch(`${devBackendUrl}/api/services`);
  servicesCache = await res.json();

  return servicesCache;
}

export function getCachedServices() {
  return servicesCache;
}