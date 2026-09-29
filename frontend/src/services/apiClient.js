/**
 * UdyamSetu AI — Centralized Frontend API Client
 *
 * Handles HTTP communication with the FastAPI backend engine:
 * - Configurable base URL via VITE_API_BASE_URL (defaults to http://127.0.0.1:8000)
 * - Request timeout via AbortController (prevents hanging requests)
 * - Structured error normalization
 * - Health verification check
 */

const DEFAULT_BASE_URL = 'http://127.0.0.1:8000';
const DEFAULT_TIMEOUT_MS = 4000;

export function getBaseUrl() {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;
  if (!envUrl) return DEFAULT_BASE_URL;
  return envUrl.replace(/\/+$/, '');
}

export function buildEndpointUrl(endpoint) {
  const base = getBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${cleanEndpoint}`;
}

/**
 * Normalizes HTTP/network errors into structured error objects.
 */
export function normalizeApiError(error, response = null) {
  if (error.name === 'AbortError') {
    return {
      code: 'TIMEOUT',
      message: 'Request timed out waiting for analysis backend.',
      status: 408,
      isNetworkError: true
    };
  }

  if (response) {
    return {
      code: error.code || (response.status === 400 || response.status === 422 ? 'VALIDATION_ERROR' : 'HTTP_ERROR'),
      message: error.message || `HTTP ${response.status}: ${response.statusText}`,
      status: response.status,
      isNetworkError: false
    };
  }

  return {
    code: 'BACKEND_UNAVAILABLE',
    message: error.message || 'Unable to connect to UdyamSetu AI backend engine.',
    status: 0,
    isNetworkError: true
  };
}

/**
 * Core fetch wrapper with timeout and JSON error unwrapping.
 */
async function executeRequest(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorPayload = {};
      try {
        errorPayload = await response.json();
      } catch (jsonErr) {
        errorPayload = { message: response.statusText };
      }

      const extractedError = errorPayload.error || errorPayload;
      const errorMsg = extractedError.message || extractedError.detail || `Server returned ${response.status}`;
      const errorCode = extractedError.code || (response.status === 400 ? 'VALIDATION_ERROR' : 'HTTP_ERROR');

      const err = new Error(errorMsg);
      err.code = errorCode;
      err.status = response.status;
      err.response = response;
      throw normalizeApiError(err, response);
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.isNetworkError || err.code) {
      throw err;
    }
    throw normalizeApiError(err);
  }
}

export const apiClient = {
  /**
   * Performs a GET request to the specified endpoint.
   */
  async get(endpoint, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
    const url = buildEndpointUrl(endpoint);
    return executeRequest(url, { ...options, method: 'GET' }, timeoutMs);
  },

  /**
   * Performs a POST request with JSON payload.
   */
  async post(endpoint, data = {}, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
    const url = buildEndpointUrl(endpoint);
    return executeRequest(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    }, timeoutMs);
  },

  /**
   * Verifies whether the backend engine is running and responding to /api/health.
   */
  async checkHealth(timeoutMs = 1500) {
    try {
      const res = await this.get('/api/health', {}, timeoutMs);
      return res?.status === 'ok';
    } catch {
      return false;
    }
  }
};

export default apiClient;
