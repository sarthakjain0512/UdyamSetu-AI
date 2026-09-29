/**
 * UdyamSetu AI — Centralized Analysis State Service (SIH 26091)
 *
 * Canonical persistence and lifecycle management for the end-to-end entrepreneur workflow:
 * New Analysis -> Market -> Feasibility -> Financial -> Scheme -> Advisory -> Business Plan.
 *
 * STRICT GOVERNANCE RULES:
 * 1. ONE Canonical Session: Preserves existing `udyamsetu_analysis_session` schema backward-compatibly.
 * 2. Deterministic Input Fingerprinting: Zero Math.random(), zero fake status flags.
 * 3. Stale Data Protection: Detects when core inputs change and marks downstream outputs as 'stale'.
 * 4. Merge Semantics: Updating one module preserves all other completed analysis layers.
 * 5. Full Browser Refresh & Direct URL Support: Modules recover verified upstream state from storage.
 */

export const SESSION_STORAGE_KEY = 'udyamsetu_analysis_session';

/**
 * Computes deterministic input fingerprints to detect stale downstream analysis.
 */
export function computeInputFingerprint(session) {
  if (!session) return '';
  const state = String(session.location?.state || '').trim().toLowerCase();
  const districtId = String(session.location?.districtId || session.location?.district || '').trim().toLowerCase();
  const block = String(session.location?.blockOrLocality || '').trim().toLowerCase();
  const category = String(session.business?.category || '').trim().toLowerCase();
  const sectorId = String(session.business?.sectorId || '').trim().toLowerCase();
  const idea = String(session.business?.idea || '').trim().toLowerCase();
  const margin = Number(session.finance?.marginCapital || 0);

  return `${state}::${districtId}::${block}::${sectorId}::${category}::${idea}::${margin}`;
}

export function computeMarketFingerprint(session) {
  if (!session) return '';
  const state = String(session.location?.state || '').trim().toLowerCase();
  const districtId = String(session.location?.districtId || session.location?.district || '').trim().toLowerCase();
  const block = String(session.location?.blockOrLocality || '').trim().toLowerCase();
  const category = String(session.business?.category || '').trim().toLowerCase();
  const sectorId = String(session.business?.sectorId || '').trim().toLowerCase();
  const idea = String(session.business?.idea || '').trim().toLowerCase();

  return `${state}::${districtId}::${block}::${sectorId}::${category}::${idea}`;
}

export function computeFinanceFingerprint(session) {
  if (!session) return '';
  const sectorId = String(session.business?.sectorId || '').trim().toLowerCase();
  const margin = Number(session.finance?.marginCapital || 0);

  return `${sectorId}::${margin}`;
}

/**
 * Retrieves the full canonical analysis state from localStorage with safe migration.
 */
export function getAnalysisState() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    // Backward-compatible migration: ensure `analysis` map exists
    if (!parsed.analysis || typeof parsed.analysis !== 'object') {
      parsed.analysis = {
        market: null,
        feasibility: null,
        financial: null,
        scheme: null,
        advisory: null,
        businessPlan: null
      };
    }

    if (!parsed.inputFingerprint && (parsed.location || parsed.business || parsed.finance)) {
      parsed.inputFingerprint = computeInputFingerprint(parsed);
    }

    return parsed;
  } catch (err) {
    console.warn('[AnalysisStateService] Error reading analysis state:', err);
    return null;
  }
}

/**
 * Persists the canonical analysis state to localStorage and fires sync events.
 */
export function saveAnalysisState(state) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return state;
    
    // Ensure fingerprint is up to date with session inputs
    state.inputFingerprint = computeInputFingerprint(state);
    state.updatedAt = new Date().toISOString();

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));

    // Dispatch global sync events
    window.dispatchEvent(new CustomEvent('udyamsetu:session-updated', { detail: state }));
    window.dispatchEvent(new CustomEvent('udyamsetu:analysis-updated', { detail: state }));

    return state;
  } catch (err) {
    console.error('[AnalysisStateService] Failed to save analysis state:', err);
    throw err;
  }
}

/**
 * Determines whether a stored module output is stale compared to current session inputs.
 */
export function isModuleStale(moduleKey, moduleRecord, currentSession) {
  if (!moduleRecord || !moduleRecord.data) return false;
  if (!currentSession) return true;

  const currentOverall = computeInputFingerprint(currentSession);

  // If exact full fingerprint matches, it is definitely fresh
  if (moduleRecord.inputFingerprint === currentOverall) {
    return false;
  }

  // Domain-specific sensitivity
  if (moduleKey === 'market') {
    const currentMarketFp = computeMarketFingerprint(currentSession);
    const storedMarketFp = moduleRecord.marketFingerprint || moduleRecord.inputFingerprint;
    return currentMarketFp !== storedMarketFp;
  }

  if (moduleKey === 'feasibility') {
    const currentMarketFp = computeMarketFingerprint(currentSession);
    const currentFinanceFp = computeFinanceFingerprint(currentSession);
    const storedMarketFp = moduleRecord.marketFingerprint;
    const storedFinanceFp = moduleRecord.financeFingerprint;
    if (storedMarketFp && storedFinanceFp) {
      return currentMarketFp !== storedMarketFp || currentFinanceFp !== storedFinanceFp;
    }
    return moduleRecord.inputFingerprint !== currentOverall;
  }

  if (moduleKey === 'financial' || moduleKey === 'scheme') {
    const currentFinanceFp = computeFinanceFingerprint(currentSession);
    const storedFinanceFp = moduleRecord.financeFingerprint;
    if (storedFinanceFp) {
      return currentFinanceFp !== storedFinanceFp;
    }
    return moduleRecord.inputFingerprint !== currentOverall;
  }

  // Advisory and Business Plan depend on all upstream modules
  return moduleRecord.inputFingerprint !== currentOverall;
}

/**
 * Updates a specific module output using merge semantics, preserving all other outputs.
 *
 * @param {'market'|'feasibility'|'financial'|'scheme'|'advisory'|'businessPlan'} moduleKey
 * @param {Object} data - Module calculation result
 */
export function saveModuleOutput(moduleKey, data) {
  const currentState = getAnalysisState();
  if (!currentState) {
    console.warn('[AnalysisStateService] Cannot save module output without an active session.');
    return null;
  }

  const overallFp = computeInputFingerprint(currentState);
  const marketFp = computeMarketFingerprint(currentState);
  const financeFp = computeFinanceFingerprint(currentState);

  if (!currentState.analysis) {
    currentState.analysis = {};
  }

  currentState.analysis[moduleKey] = {
    inputFingerprint: overallFp,
    marketFingerprint: marketFp,
    financeFingerprint: financeFp,
    generatedAt: new Date().toISOString(),
    data: data
  };

  return saveAnalysisState(currentState);
}

/**
 * Retrieves a module output and evaluates its current lifecycle status:
 * 'completed' | 'stale' | 'not_started' | 'unavailable'
 *
 * @param {'market'|'feasibility'|'financial'|'scheme'|'advisory'|'businessPlan'} moduleKey
 * @returns {{ data: Object|null, status: string, generatedAt: string|null, isStale: boolean }}
 */
export function getModuleOutput(moduleKey) {
  const state = getAnalysisState();
  if (!state) {
    return { data: null, status: 'unavailable', generatedAt: null, isStale: false };
  }

  const moduleRecord = state.analysis?.[moduleKey];

  if (!moduleRecord || !moduleRecord.data) {
    return { data: null, status: 'not_started', generatedAt: null, isStale: false };
  }

  const stale = isModuleStale(moduleKey, moduleRecord, state);

  return {
    data: moduleRecord.data,
    status: stale ? 'stale' : 'completed',
    generatedAt: moduleRecord.generatedAt || null,
    isStale: stale
  };
}

/**
 * Returns comprehensive workflow statuses across all 7 pipeline stages.
 */
export function getAllModuleStatuses() {
  const state = getAnalysisState();
  const hasSession = Boolean(
    state && 
    state.location?.districtId && 
    state.business?.category && 
    state.finance?.marginCapital > 0
  );

  if (!hasSession) {
    return {
      intake: { status: 'not_started', label: 'Entrepreneur Profile', route: '/new-analysis' },
      market: { status: 'unavailable', label: 'Market Intelligence', route: '/market-analysis' },
      feasibility: { status: 'unavailable', label: 'Business Feasibility', route: '/feasibility' },
      financial: { status: 'unavailable', label: 'Financial Plan', route: '/financial-plan' },
      scheme: { status: 'unavailable', label: 'Scheme Router', route: '/scheme-router' },
      advisory: { status: 'unavailable', label: 'AI Advisory', route: '/advisory' },
      businessPlan: { status: 'unavailable', label: 'Business Launch Plan', route: '/business-plan' }
    };
  }

  const modules = ['market', 'feasibility', 'financial', 'scheme', 'advisory', 'businessPlan'];
  const routes = {
    market: '/market-analysis',
    feasibility: '/feasibility',
    financial: '/financial-plan',
    scheme: '/scheme-router',
    advisory: '/advisory',
    businessPlan: '/business-plan'
  };
  const labels = {
    market: 'Market Intelligence',
    feasibility: 'Business Feasibility',
    financial: 'Financial Plan',
    scheme: 'Scheme Router',
    advisory: 'AI Advisory',
    businessPlan: 'Business Launch Plan'
  };

  const result = {
    intake: { status: 'completed', label: 'Entrepreneur Profile', route: '/new-analysis' }
  };

  modules.forEach(m => {
    const res = getModuleOutput(m);
    result[m] = {
      status: res.status,
      label: labels[m],
      route: routes[m],
      generatedAt: res.generatedAt,
      isStale: res.isStale
    };
  });

  return result;
}

/**
 * Clears the active analysis state and all stored module outputs.
 */
export function clearAnalysisState() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      window.dispatchEvent(new Event('udyamsetu:session-cleared'));
      window.dispatchEvent(new Event('udyamsetu:analysis-cleared'));
    }
  } catch (err) {
    console.warn('[AnalysisStateService] Error clearing analysis state:', err);
  }
}
