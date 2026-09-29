import { apiClient } from './apiClient.js';
import { FALLBACK_SECTORS } from '../data/fallbackSectors';
import { FALLBACK_DISTRICTS } from '../data/fallbackDistricts';

export async function fetchSectors() {
  try {
    return await apiClient.get('/api/sectors');
  } catch (err) {
    return FALLBACK_SECTORS;
  }
}

export async function fetchDistricts() {
  try {
    return await apiClient.get('/api/districts');
  } catch (err) {
    return FALLBACK_DISTRICTS;
  }
}
