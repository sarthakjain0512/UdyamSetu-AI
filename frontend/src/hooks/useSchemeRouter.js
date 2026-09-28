import { useState, useCallback } from 'react';
import { getSchemeRoutingPlan } from '../services/schemeService';

/**
 * Custom hook to execute and manage SIH 26091 scheme routing.
 * Provides deterministic routing plan, loading state, and error handling.
 */
export function useSchemeRouter() {
  const [routingPlan, setRoutingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const routeSession = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const plan = await getSchemeRoutingPlan(payload);
      setRoutingPlan(plan);
      return plan;
    } catch (err) {
      const errMsg = err.message || 'Failed to determine government scheme route.';
      setError(errMsg);
      setRoutingPlan(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    routingPlan,
    loading,
    error,
    routeSession
  };
}
