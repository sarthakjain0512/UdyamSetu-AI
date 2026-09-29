/**
 * API Configuration and Base Fetch Utility
 * Reads VITE_API_BASE_URL from environment variables.
 * Forwards requests to apiClient.js for unified error handling and timeout protection.
 */

import { apiClient, getBaseUrl, buildEndpointUrl } from './apiClient.js';

export const getApiUrl = (endpoint) => {
  return buildEndpointUrl(endpoint);
};

export async function legacyApiClient(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (method === 'POST') {
    let bodyData = {};
    if (options.body) {
      try {
        bodyData = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
      } catch {
        bodyData = options.body;
      }
    }
    return apiClient.post(cleanEndpoint, bodyData, options);
  }

  return apiClient.get(cleanEndpoint, options);
}

export { apiClient };
export default apiClient;
