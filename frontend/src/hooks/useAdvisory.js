import { useState, useCallback } from 'react';
import { getBusinessAdvisory, generateAdvisory } from '../services/advisoryService';
import { saveModuleOutput, getModuleOutput } from '../services/analysisStateService';

/**
 * Custom hook to manage the lifecycle of the business advisory synthesis.
 */
export function useAdvisory() {
  const initialRecord = getModuleOutput('advisory');
  const [data, setData] = useState(() => initialRecord?.data || null);
  const [advisoryPlan, setAdvisoryPlan] = useState(() => initialRecord?.data || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(() => Boolean(initialRecord?.isStale));
  const [status, setStatus] = useState(() => initialRecord?.status || 'not_started');

  // Task 7 & Task 9 Primary Method
  const fetchAdvisory = useCallback(async (context) => {
    try {
      setLoading(true);
      setError(null);
      const plan = await getBusinessAdvisory(context);
      setAdvisoryPlan(plan);
      setData(plan);
      setIsStale(false);
      setStatus('completed');
      saveModuleOutput('advisory', plan);
      return plan;
    } catch (err) {
      const errMsg = err.message || 'Failed to synthesize business advisory.';
      setError(errMsg);
      setAdvisoryPlan(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Task 0 Legacy Method (Preserved for backward compatibility)
  const generateFullPlan = useCallback(async (params) => {
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
  }, []);

  return { 
    data, 
    advisoryPlan, 
    loading, 
    error, 
    isStale,
    status,
    fetchAdvisory, 
    generateFullPlan 
  };
}
