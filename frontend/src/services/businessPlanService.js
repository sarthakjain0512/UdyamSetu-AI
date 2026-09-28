/**
 * UdyamSetu AI — Business Launch Plan Service
 *
 * Coordinates Business Launch Plan synthesis across upstream modules:
 * Page -> Hook -> Service -> Engine / API architecture.
 */

import { generateBusinessLaunchPlan } from '../utils/businessPlanEngine';
import { calculateFinancialPlan } from '../utils/financialCalculator';
import { calculateSchemeRoute } from '../utils/schemeRouterEngine';
import { generateAdvisoryPlan } from '../utils/advisoryEngine';
import { getAnalysisSession } from './sessionService';

/**
 * Synthesizes the complete Business Launch Plan.
 *
 * @param {Object} context
 * @param {Object} [context.session] - Analysis session
 * @param {Object} [context.market] - Market Intelligence
 * @param {Object} [context.feasibility] - Feasibility Analysis
 * @param {Object} [context.financial] - Financial Plan
 * @param {Object} [context.scheme] - Scheme Route
 * @param {Object} [context.advisory] - AI Advisory
 * @returns {Promise<Object>} Synthesized launch plan
 */
export async function getBusinessLaunchPlan(context = {}) {
  // 1. Resolve session (from argument or localStorage)
  const resolvedSession = context.session || getAnalysisSession();

  // 2. If session exists and financial is missing, derive financial deterministically from margin
  let resolvedFinancial = context.financial || null;
  const rawMargin = resolvedSession?.finance?.marginCapital;
  const parsedMargin = Number(rawMargin);

  if (!resolvedFinancial && !isNaN(parsedMargin) && parsedMargin > 0) {
    try {
      resolvedFinancial = calculateFinancialPlan({
        marginCapital: parsedMargin,
        sectorId: resolvedSession?.business?.sectorId || 'dairy-processing'
      });
    } catch (e) {
      console.warn('[BusinessPlanService] Unable to compute local financial plan:', e);
    }
  }

  // 3. If session & financial exist, derive scheme deterministically if not provided
  let resolvedScheme = context.scheme || null;
  if (!resolvedScheme && resolvedSession && !isNaN(parsedMargin) && parsedMargin > 0) {
    try {
      resolvedScheme = calculateSchemeRoute({
        marginCapital: parsedMargin,
        sectorId: resolvedSession?.business?.sectorId || 'dairy-processing',
        districtId: resolvedSession?.location?.districtId || 'varanasi-up',
        businessIdea: resolvedSession?.business?.idea || '',
        gender: resolvedSession?.entrepreneurContext?.gender || 'general',
        socialCategory: resolvedSession?.entrepreneurContext?.socialCategory || 'general'
      });
    } catch (e) {
      console.warn('[BusinessPlanService] Unable to compute local scheme route:', e);
    }
  }

  // 4. If advisory is missing but upstream parts exist, synthesize advisory deterministically
  let resolvedAdvisory = context.advisory || null;
  if (!resolvedAdvisory && resolvedSession) {
    try {
      resolvedAdvisory = generateAdvisoryPlan({
        session: resolvedSession,
        market: context.market || null,
        feasibility: context.feasibility || null,
        financial: resolvedFinancial,
        scheme: resolvedScheme
      });
    } catch (e) {
      console.warn('[BusinessPlanService] Unable to compute local advisory plan:', e);
    }
  }

  // 5. Generate complete launch plan using deterministic engine
  // Market and Feasibility remain strictly null if not provided — never fabricated!
  const launchPlan = generateBusinessLaunchPlan({
    session: resolvedSession,
    market: context.market || null,
    feasibility: context.feasibility || null,
    financial: resolvedFinancial,
    scheme: resolvedScheme,
    advisory: resolvedAdvisory
  });

  return launchPlan;
}
