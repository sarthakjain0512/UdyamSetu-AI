import { useState, useEffect, useCallback } from 'react';
import { 
  getAnalysisSession, 
  saveAnalysisSession, 
  clearAnalysisSession, 
  hasActiveSession 
} from '../services/sessionService';

export function useAnalysisSession() {
  const [session, setSession] = useState(() => getAnalysisSession());

  useEffect(() => {
    const handleUpdate = (e) => {
      setSession(e.detail || getAnalysisSession());
    };
    const handleClear = () => {
      setSession(null);
    };

    window.addEventListener('udyamsetu:session-updated', handleUpdate);
    window.addEventListener('udyamsetu:session-cleared', handleClear);

    return () => {
      window.removeEventListener('udyamsetu:session-updated', handleUpdate);
      window.removeEventListener('udyamsetu:session-cleared', handleClear);
    };
  }, []);

  const save = useCallback((data) => {
    const updated = saveAnalysisSession(data);
    setSession(updated);
    return updated;
  }, []);

  const clear = useCallback(() => {
    clearAnalysisSession();
    setSession(null);
  }, []);

  return {
    session,
    hasSession: Boolean(session),
    saveSession: save,
    clearSession: clear,
    refreshSession: () => setSession(getAnalysisSession())
  };
}
