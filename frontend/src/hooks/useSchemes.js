import { useState } from 'react';
import { routeSchemes } from '../services/schemeService';

export function useSchemes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatchingSchemes = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await routeSchemes(params);
      setData(res);
      return res;
    } catch (err) {
      setError(err.message || 'Scheme matching failed');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchMatchingSchemes };
}
