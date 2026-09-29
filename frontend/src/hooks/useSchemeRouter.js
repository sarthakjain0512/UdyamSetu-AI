import { useState, useCallback } from 'react';
import { getSchemeRoutingPlan } from '../services/schemeService';
import { saveModuleOutput, getModuleOutput } from '../services/analysisStateService';

/**
 * Custom hook to execute and manage SIH 26091 scheme routing.
 * Provides deterministic routing plan, loading state, error handling, and state persistence.
 */
export function useSchemeRouter() {
  const initialRecord = getModuleOutput('scheme');
  const [routingPlan, setRoutingPlan] = useState(() => initialRecord?.data || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(() => Boolean(initialRecord?.isStale));
  const [status, setStatus] = useState(() => initialRecord?.status || 'not_started');

  const routeSession = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const plan = await getSchemeRoutingPlan(payload);
      setRoutingPlan(plan);
      setIsStale(false);
      setStatus('completed');
      saveModuleOutput('scheme', plan);
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
    isStale,
    status,
    routeSession
  };
}
