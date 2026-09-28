import { apiClient } from './apiConfig';
import { FALLBACK_SECTORS } from '../data/fallbackSectors';
import { FALLBACK_DISTRICTS } from '../data/fallbackDistricts';

export async function fetchSectors() {
  try {
    return await apiClient('/sectors');
  } catch (err) {
    return FALLBACK_SECTORS;
  }
}

export async function fetchDistricts() {
  try {
    return await apiClient('/districts');
  } catch (err) {
    return FALLBACK_DISTRICTS;
  }
}
