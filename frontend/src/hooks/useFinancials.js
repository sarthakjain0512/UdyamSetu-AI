import { useState } from 'react';
import { calculateFinancials } from '../services/financialService';

export function useFinancials() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculate = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await calculateFinancials(params);
      setData(res);
      return res;
    } catch (err) {
      setError(err.message || 'Financial calculation failed');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, calculate };
}
