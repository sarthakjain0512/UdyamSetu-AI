import { useState, useCallback } from 'react';
import { assessFeasibility } from '../services/feasibilityService';
import { saveModuleOutput, getModuleOutput } from '../services/analysisStateService';

export function useFeasibility() {
  const initialRecord = getModuleOutput('feasibility');
  const [data, setData] = useState(() => initialRecord?.data || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(() => Boolean(initialRecord?.isStale));
  const [status, setStatus] = useState(() => initialRecord?.status || 'not_started');

  const runAssessment = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await assessFeasibility(params);
      setData(res);
      setIsStale(false);
      setStatus('completed');
      saveModuleOutput('feasibility', res);
      return res;
    } catch (err) {
      setError(err.message || 'Feasibility assessment failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    data, 
    loading, 
    error, 
    isStale,
    status,
    runAssessment 
  };
}
