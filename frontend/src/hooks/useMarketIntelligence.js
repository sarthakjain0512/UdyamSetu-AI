import { useState, useCallback } from 'react';
import { analyzeMarketIntelligence } from '../services/marketService';
import { saveModuleOutput, getModuleOutput } from '../services/analysisStateService';

export function useMarketIntelligence() {
  const initialRecord = getModuleOutput('market');
  const [data, setData] = useState(() => initialRecord?.data || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(() => Boolean(initialRecord?.isStale));
  const [status, setStatus] = useState(() => initialRecord?.status || 'not_started');

  const runAnalysis = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await analyzeMarketIntelligence(params);
      setData(res);
      setIsStale(false);
      setStatus('completed');
      saveModuleOutput('market', res);
      return res;
    } catch (err) {
      setError(err.message || 'Market analysis failed');
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
    runAnalysis 
  };
}
