import { useState, useCallback } from 'react';
import { getBusinessLaunchPlan } from '../services/businessPlanService';
import { saveModuleOutput, getModuleOutput } from '../services/analysisStateService';

/**
 * Custom hook managing the lifecycle of the Business Launch Plan.
 */
export function useBusinessPlan() {
  const initialRecord = getModuleOutput('businessPlan');
  const [launchPlan, setLaunchPlan] = useState(() => initialRecord?.data || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(() => Boolean(initialRecord?.isStale));
  const [status, setStatus] = useState(() => initialRecord?.status || 'not_started');

  const fetchLaunchPlan = useCallback(async (context) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBusinessLaunchPlan(context);
      setLaunchPlan(res);
      setIsStale(false);
      setStatus('completed');
      saveModuleOutput('businessPlan', res);
      return res;
    } catch (err) {
      const errMsg = err.message || 'Failed to synthesize business launch plan.';
      setError(errMsg);
      setLaunchPlan(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    launchPlan,
    loading,
    error,
    isStale,
    status,
    fetchLaunchPlan
  };
}
