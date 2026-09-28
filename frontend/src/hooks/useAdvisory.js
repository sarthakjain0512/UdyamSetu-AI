import { useState } from 'react';
import { generateAdvisory } from '../services/advisoryService';

export function useAdvisory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateFullPlan = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await generateAdvisory(params);
      setData(res);
      return res;
    } catch (err) {
      setError(err.message || 'Advisory generation failed');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, generateFullPlan };
}
