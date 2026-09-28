/**
 * API Configuration and Base Fetch Utility
 * Reads VITE_API_BASE_URL from environment variables.
 * Abstracted so React components never call raw fetch or hardcode URLs.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const getApiUrl = (endpoint) => {
  const cleanBase = API_BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${cleanBase}${cleanEndpoint}`;
};

export async function apiClient(endpoint, options = {}) {
  const url = getApiUrl(endpoint);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.warn(`[UdyamSetu API] Request to ${url} failed or offline. Falling back to local data layer service.`, err.message);
    throw err;
  }
}
