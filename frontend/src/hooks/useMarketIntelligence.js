import { useState } from 'react';
import { analyzeMarketIntelligence } from '../services/marketService';

export function useMarketIntelligence() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAnalysis = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await analyzeMarketIntelligence(params);
      setData(res);
      return res;
    } catch (err) {
      setError(err.message || 'Market analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, runAnalysis };
}
