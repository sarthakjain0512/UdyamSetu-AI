/**
 * UdyamSetu AI — Analysis Session Service
 * Manages client-side analysis session persistence under `udyamsetu_analysis_session`.
 * Provides normalized session schema for downstream Market, Feasibility, Financial, and Scheme modules.
 */

export const SESSION_STORAGE_KEY = 'udyamsetu_analysis_session';

/**
 * Validates whether an object represents a healthy, complete analysis session.
 */
export function isValidSession(session) {
  if (!session || typeof session !== 'object') return false;

  const hasLocation = Boolean(
    session.location &&
    typeof session.location === 'object' &&
    (session.location.districtId || session.location.district)
  );

  const hasBusiness = Boolean(
    session.business &&
    typeof session.business === 'object' &&
    (session.business.category || session.business.idea)
  );

  const hasFinance = Boolean(
    session.finance &&
    typeof session.finance === 'object' &&
    typeof session.finance.marginCapital === 'number' &&
    session.finance.marginCapital > 0
  );

  return hasLocation && hasBusiness && hasFinance;
}

/**
 * Normalizes raw form inputs into the standard UdyamSetu AI session object.
 */
export function normalizeSessionData(rawInput) {
  const marginCapital = Math.max(0, Number(rawInput.finance?.marginCapital || rawInput.marginCapital || 0));
  const estimatedProjectCost = marginCapital > 0 ? Math.round(marginCapital / 0.10) : 0;
  const estimatedLoanAmount = marginCapital > 0 ? Math.round(estimatedProjectCost * 0.90) : 0;

  return {
    sessionId: rawInput.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    createdAt: rawInput.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'ACTIVE_INTAKE',
    location: {
      state: String(rawInput.location?.state || '').trim(),
      district: String(rawInput.location?.district || '').trim(),
      districtId: String(rawInput.location?.districtId || '').trim(),
      blockOrLocality: String(rawInput.location?.blockOrLocality || '').trim(),
      tier: String(rawInput.location?.tier || 'Tier-3 / Rural Cluster').trim()
    },
    business: {
      category: String(rawInput.business?.category || '').trim(),
      sectorId: String(rawInput.business?.sectorId || '').trim(),
      sectorName: String(rawInput.business?.sectorName || '').trim(),
      idea: String(rawInput.business?.idea || '').trim(),
      isCustom: Boolean(rawInput.business?.isCustom)
    },
    finance: {
      marginCapital: marginCapital,
      estimatedProjectCost: estimatedProjectCost,
      estimatedLoanAmount: estimatedLoanAmount,
      financingTrack: estimatedProjectCost <= 140000 ? 'Micro Finance' : 'Term Loan'
    },
    entrepreneurContext: {
      name: String(rawInput.entrepreneurContext?.name || '').trim(),
      gender: String(rawInput.entrepreneurContext?.gender || 'general').trim(),
      socialCategory: String(rawInput.entrepreneurContext?.socialCategory || 'general').trim(),
      areaContext: String(rawInput.entrepreneurContext?.areaContext || 'rural').trim()
    }
  };
}

/**
 * Saves a validated analysis session to localStorage.
 */
export function saveAnalysisSession(rawInput) {
  try {
    const session = normalizeSessionData(rawInput);
    if (!isValidSession(session)) {
      throw new Error('Analysis session failed validation: missing location, business, or valid margin capital.');
    }
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('udyamsetu:session-updated', { detail: session }));
    }
    return session;
  } catch (err) {
    console.error('[SessionService] Failed to save analysis session:', err);
    throw err;
  }
}

/**
 * Retrieves and validates the active analysis session from localStorage.
 */
export function getAnalysisSession() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (isValidSession(parsed)) {
      return parsed;
    }
    // If malformed, remove it safely
    console.warn('[SessionService] Detected malformed analysis session. Clearing...');
    clearAnalysisSession();
    return null;
  } catch (err) {
    console.warn('[SessionService] Error parsing analysis session:', err);
    return null;
  }
}

/**
 * Clears the active analysis session.
 */
export function clearAnalysisSession() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      window.dispatchEvent(new Event('udyamsetu:session-cleared'));
    }
  } catch (err) {
    console.warn('[SessionService] Error clearing analysis session:', err);
  }
}

/**
 * Checks if a valid active session is present.
 */
export function hasActiveSession() {
  return getAnalysisSession() !== null;
}
