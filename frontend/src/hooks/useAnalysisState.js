import { useState, useEffect, useCallback } from 'react';
import { 
  getAnalysisState, 
  saveAnalysisState, 
  saveModuleOutput, 
  getModuleOutput, 
  getAllModuleStatuses, 
  clearAnalysisState 
} from '../services/analysisStateService';

/**
 * Custom hook providing reactive access to canonical analysis state and module statuses.
 */
export function useAnalysisState() {
  const [analysisState, setAnalysisState] = useState(() => getAnalysisState());
  const [moduleStatuses, setModuleStatuses] = useState(() => getAllModuleStatuses());

  const refresh = useCallback(() => {
    setAnalysisState(getAnalysisState());
    setModuleStatuses(getAllModuleStatuses());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener('udyamsetu:session-updated', handleUpdate);
    window.addEventListener('udyamsetu:analysis-updated', handleUpdate);
    window.addEventListener('udyamsetu:session-cleared', handleUpdate);
    window.addEventListener('udyamsetu:analysis-cleared', handleUpdate);

    return () => {
      window.removeEventListener('udyamsetu:session-updated', handleUpdate);
      window.removeEventListener('udyamsetu:analysis-updated', handleUpdate);
      window.removeEventListener('udyamsetu:session-cleared', handleUpdate);
      window.removeEventListener('udyamsetu:analysis-cleared', handleUpdate);
    };
  }, [refresh]);

  const saveModule = useCallback((moduleKey, data) => {
    const updated = saveModuleOutput(moduleKey, data);
    refresh();
    return updated;
  }, [refresh]);

  const getModule = useCallback((moduleKey) => {
    return getModuleOutput(moduleKey);
  }, []);

  const clear = useCallback(() => {
    clearAnalysisState();
    refresh();
  }, [refresh]);

  return {
    analysisState,
    session: analysisState,
    moduleStatuses,
    saveModule,
    getModule,
    clearAnalysis: clear,
    refresh
  };
}
