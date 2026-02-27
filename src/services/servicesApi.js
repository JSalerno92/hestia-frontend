// import { devBackendUrl } from '../main';
import { backendUrl } from "../../config";

let servicesCache = null;

export async function fetchServices() {
  if (servicesCache) return servicesCache;

  const res = await fetch(`${backendUrl}/api/services`);
  servicesCache = await res.json();

  return servicesCache;
}

export function getCachedServices() {
  return servicesCache;
}