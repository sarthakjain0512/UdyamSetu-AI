import { useState } from 'react';
import { assessFeasibility } from '../services/feasibilityService';

export function useFeasibility() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAssessment = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await assessFeasibility(params);
      setData(res);
      return res;
    } catch (err) {
      setError(err.message || 'Feasibility assessment failed');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, runAssessment };
}
