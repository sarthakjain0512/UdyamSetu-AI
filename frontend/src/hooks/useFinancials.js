import { useState, useCallback } from 'react';
import { calculateFinancials } from '../services/financialService';
import { saveModuleOutput, getModuleOutput } from '../services/analysisStateService';

export function useFinancials() {
  const initialRecord = getModuleOutput('financial');
  const [data, setData] = useState(() => initialRecord?.data || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(() => Boolean(initialRecord?.isStale));
  const [status, setStatus] = useState(() => initialRecord?.status || 'not_started');

  const calculate = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await calculateFinancials(params);
      setData(res);
      setIsStale(false);
      setStatus('completed');
      saveModuleOutput('financial', res);
      return res;
    } catch (err) {
      setError(err.message || 'Financial calculation failed');
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
    calculate 
  };
}
