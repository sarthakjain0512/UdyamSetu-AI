import { useState, useCallback } from 'react';
import { getBusinessLaunchPlan } from '../services/businessPlanService';

/**
 * Custom hook managing the lifecycle of the Business Launch Plan.
 */
export function useBusinessPlan() {
  const [launchPlan, setLaunchPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLaunchPlan = useCallback(async (context) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBusinessLaunchPlan(context);
      setLaunchPlan(res);
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
    fetchLaunchPlan
  };
}
