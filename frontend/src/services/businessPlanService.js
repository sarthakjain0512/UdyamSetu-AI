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
import { getModuleOutput } from './analysisStateService';

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

  // 2. Resolve Market Intelligence (context -> canonical storage -> null)
  const storedMarket = getModuleOutput('market');
  const resolvedMarket = context.market || storedMarket?.data || null;

  // 3. Resolve Feasibility (context -> canonical storage -> null)
  const storedFeasibility = getModuleOutput('feasibility');
  const resolvedFeasibility = context.feasibility || storedFeasibility?.data || null;

  // 4. Resolve Financial Plan (context -> canonical storage -> deterministic calculation from margin)
  const storedFinancial = getModuleOutput('financial');
  let resolvedFinancial = context.financial || storedFinancial?.data || null;
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

  // 5. Resolve Scheme Route (context -> canonical storage -> deterministic calculation)
  const storedScheme = getModuleOutput('scheme');
  let resolvedScheme = context.scheme || storedScheme?.data || null;
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

  // 6. Resolve Advisory Plan (context -> canonical storage -> deterministic synthesis)
  const storedAdvisory = getModuleOutput('advisory');
  let resolvedAdvisory = context.advisory || storedAdvisory?.data || null;
  if (!resolvedAdvisory && resolvedSession) {
    try {
      resolvedAdvisory = generateAdvisoryPlan({
        session: resolvedSession,
        market: resolvedMarket,
        feasibility: resolvedFeasibility,
        financial: resolvedFinancial,
        scheme: resolvedScheme
      });
    } catch (e) {
      console.warn('[BusinessPlanService] Unable to compute local advisory plan:', e);
    }
  }

  // 7. Generate complete launch plan using deterministic engine
  // Market and Feasibility remain strictly null if not completed — never fabricated!
  const launchPlan = generateBusinessLaunchPlan({
    session: resolvedSession,
    market: resolvedMarket,
    feasibility: resolvedFeasibility,
    financial: resolvedFinancial,
    scheme: resolvedScheme,
    advisory: resolvedAdvisory
  });

  return launchPlan;
}
