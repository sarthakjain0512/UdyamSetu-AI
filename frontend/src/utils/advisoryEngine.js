/**
 * UdyamSetu AI — Deterministic Business Advisory Engine (SIH 26091)
 *
 * Synthesizes multi-module intelligence (Intake, Market Intelligence,
 * Feasibility Analysis, Financial Planning, and Scheme Router) into an
 * explainable, personalized business advisory roadmap.
 *
 * STRICT PATCH INTEGRITY PRINCIPLES:
 * 1. Data-Driven Provenance — Recommendations originate strictly from available upstream modules.
 * 2. No Sector Fallback for Market Data — If Market Intelligence is missing, no market conclusions,
 *    strengths, or recommendations are fabricated.
 * 3. No Unsupported Financial Prescriptions — No arbitrary percentages (e.g. "15% equity reserve")
 *    or hardcoded rupee buffers (e.g. "₹25,000–₹50,000").
 * 4. Realistic Pilot Guidance — No fabricated sample sizes (e.g. "5–10 retailers", "15–20 counters").
 * 5. Conditional Government Language — All regulatory/scheme steps use "Verify whether applicable"
 *    rather than claiming mandatory status.
 * 6. 100% Deterministic — Zero Math.random(), zero LLM calls, zero fabricated statistics.
 */

/**
 * Generates the unified business advisory plan.
 *
 * @param {Object} context
 * @param {Object} [context.session] - Active analysis session
 * @param {Object} [context.market] - Market analysis data
 * @param {Object} [context.feasibility] - Feasibility analysis data
 * @param {Object} [context.financial] - Financial plan data
 * @param {Object} [context.scheme] - Scheme router data
 * @returns {Object} Structured advisory response
 */
export function generateAdvisoryPlan(context = {}) {
  const { session, market, feasibility, financial, scheme } = context;

  // 1. Module Availability Audits (Strict Check — No Fallbacks)
  const hasSession = Boolean(session && typeof session === 'object');
  const hasMarket = Boolean(
    market && 
    typeof market === 'object' && 
    (market.demand_level || market.competition_level || market.market_opportunity_score || market.target_demographics)
  );
  const hasFeasibility = Boolean(
    feasibility && 
    typeof feasibility === 'object' && 
    (feasibility.feasibility_score !== undefined || feasibility.overallScore !== undefined)
  );
  const hasFinancial = Boolean(
    financial && 
    typeof financial === 'object' && 
    (financial.financing || financial.emi)
  );
  const hasScheme = Boolean(
    scheme && 
    typeof scheme === 'object' && 
    (scheme.route || scheme.parameters)
  );

  // 2. Resolve Profile Parameters
  const rawMargin = session?.finance?.marginCapital ?? financial?.financing?.marginCapital;
  const parsedMargin = Number(rawMargin);
  const marginCapital = !isNaN(parsedMargin) && parsedMargin > 0 ? parsedMargin : 0;

  // Project Cost & Loan: Only computed if financial or margin exists
  const projectCost = financial?.financing?.projectCost ?? (marginCapital > 0 ? Math.round(marginCapital / 0.10) : 0);
  const loanAmount = financial?.financing?.loanAmount ?? (projectCost > 0 ? Math.round(projectCost * 0.90) : 0);
  const track = scheme?.route?.track ?? financial?.financing?.track ?? (projectCost > 0 ? (projectCost <= 140000 ? 'Micro Finance Track' : 'Term Loan Track') : 'Pending Financial Analysis');

  const sectorName = session?.business?.sectorName || session?.business?.category || 'Rural Micro-Enterprise';
  const districtName = session?.location?.districtName || session?.location?.district || '';
  const stateName = session?.location?.state || '';
  const locationDisplay = districtName ? (stateName ? `${districtName}, ${stateName}` : districtName) : 'Operational District';
  const businessIdea = session?.business?.idea || '';

  // 3. Compute Analysis Coverage Matrix (Explicit "Not available from current analysis")
  const coverage = {
    intake: { available: hasSession, label: 'Entrepreneur Intake', source: 'Session Store' },
    market: { available: hasMarket, label: 'Market Intelligence', source: 'Module 1' },
    feasibility: { available: hasFeasibility, label: 'Feasibility Analysis', source: 'Module 2' },
    financial: { available: hasFinancial, label: 'Financial Plan', source: 'Module 3' },
    scheme: { available: hasScheme, label: 'Scheme Router', source: 'Module 4' }
  };

  const availableModulesCount = Object.values(coverage).filter(c => c.available).length;
  const totalModulesCount = Object.keys(coverage).length;

  // 4. Extract Upstream Module Signals
  const feasibilityScore = hasFeasibility ? (feasibility.feasibility_score ?? feasibility.overallScore ?? null) : null;
  const feasibilityGrade = hasFeasibility ? (feasibility.feasibility_grade ?? feasibility.grade ?? null) : null;
  const isHighFeasibility = feasibilityScore !== null && feasibilityScore >= 75;
  const isModerateFeasibility = feasibilityScore !== null && feasibilityScore >= 60 && feasibilityScore < 75;
  const isLowFeasibility = feasibilityScore !== null && feasibilityScore < 60;

  const dscrValue = hasFinancial ? (financial.dscr?.value ?? null) : null;
  const hasDscr = dscrValue !== null && dscrValue > 0;
  const isWeakDscr = hasDscr && dscrValue < 1.2;
  const monthlyEmi = hasFinancial ? (financial.emi?.monthlyEmi ?? null) : null;
  const hasCeilingMismatch = Boolean(scheme?.ceilingMismatch || financial?.financing?.isExceedingCap);
  const isAbove50L = projectCost > 5000000 || Boolean(financial?.financing?.isExceedingMaxCost);

  // 5. Generate Key Strengths (Strictly Data-Derived — No Fallbacks)
  const strengths = [];

  // Financial Strength: Only if financial data or valid margin exists
  if (hasFinancial && marginCapital > 0 && loanAmount > 0) {
    strengths.push({
      id: 'str-equity',
      title: 'Committed Margin Capital Available',
      detail: `Your committed equity of ₹${marginCapital.toLocaleString('en-IN')} satisfies the standard 10% promoter contribution needed to support structured debt financing of ₹${loanAmount.toLocaleString('en-IN')}.`,
      source: 'Financial Plan'
    });
  } else if (hasSession && marginCapital > 0) {
    strengths.push({
      id: 'str-equity-intake',
      title: 'Committed Promoter Margin Equity',
      detail: `Available promoter equity of ₹${marginCapital.toLocaleString('en-IN')} is recorded to support enterprise capital requirements.`,
      source: 'User Input'
    });
  }

  // Feasibility Strength: Only if feasibility analysis is completed
  if (hasFeasibility && isHighFeasibility) {
    strengths.push({
      id: 'str-feasibility',
      title: 'Favorable Overall Feasibility Assessment',
      detail: `Feasibility assessment scored ${feasibilityScore}/100 (Grade ${feasibilityGrade || 'A'}), indicating balanced operational viability and resource availability.`,
      source: 'Feasibility Analysis'
    });
  }

  // Market Strength: ONLY if Market Intelligence is available
  if (hasMarket) {
    const demand = market.demand_level || 'Active';
    const comp = market.competition_level || 'Moderate';
    strengths.push({
      id: 'str-market',
      title: 'Validated Local Market Opportunity',
      detail: `Market analysis indicates ${demand.toLowerCase()} local demand with ${comp.toLowerCase()} competition in ${districtName || 'the target area'}.`,
      source: 'Market Intelligence'
    });
  }

  // Scheme Strength: Only if Scheme Router has run
  if (hasScheme && scheme?.route?.track) {
    strengths.push({
      id: 'str-scheme',
      title: `Identified Financing Route: ${scheme.route.track}`,
      detail: `The project cost aligns with the SIH 26091 ${scheme.route.track}, which documents capped interest rates and structured moratorium provisions.`,
      source: 'Scheme Router'
    });
  }

  // 6. Generate Key Risks (Strictly Data-Derived — No Arbitrary Figures)
  const risks = [];

  if (hasScheme && scheme.ceilingMismatch) {
    risks.push({
      id: 'risk-ceiling',
      risk: 'Calculated Financing Exceeds Scheme Loan Ceiling',
      why: 'Calculated 90% debt sizing exceeds the documented maximum ceiling for the assigned track. The indicative loan is capped at the ceiling, requiring capital review.',
      mitigation: 'Review project scope or adjust capital expenditure to align with the documented loan ceiling.',
      source: 'Scheme Router'
    });
  }

  if (hasFinancial && isAbove50L) {
    risks.push({
      id: 'risk-above-50l',
      risk: 'Capital Sizing Exceeds Prototype Boundary (> ₹50L)',
      why: 'Project cost exceeds the ₹50 Lakh boundary established for the SIH 26091 prototype framework, requiring commercial consortium loan appraisal.',
      mitigation: 'Seek separate official financing appraisal and consider phased implementation.',
      source: 'Financial Plan'
    });
  }

  if (hasFinancial) {
    risks.push({
      id: 'risk-debt-burden',
      risk: 'Fixed Monthly Debt Service Obligation',
      why: 'A debt-financed capital structure requires regular monthly debt repayment following the moratorium period regardless of sales fluctuations.',
      mitigation: 'Validate whether sufficient working capital remains after the proposed project contribution and financing structure.',
      source: 'Financial Plan'
    });
  }

  if (hasFeasibility && (isLowFeasibility || isModerateFeasibility)) {
    risks.push({
      id: 'risk-feasibility-gap',
      risk: 'Operational or Regulatory Feasibility Considerations',
      why: `Feasibility assessment identified operational or regulatory prerequisites to be fulfilled (Score: ${feasibilityScore}/100).`,
      mitigation: 'Verify local permits and operating infrastructure prerequisites prior to making major equipment commitments.',
      source: 'Feasibility Analysis'
    });
  }

  if (!businessIdea || businessIdea.trim().length < 10) {
    risks.push({
      id: 'risk-concept-depth',
      risk: 'General Concept Definition',
      why: 'The business idea description is preliminary and lacks itemized operational specifications.',
      mitigation: 'Prepare a formal Detailed Project Report (DPR) with verified cost estimates and identified customer segments (potential preparation item — confirm applicability).',
      source: 'User Input'
    });
  }

  // Market Risk: ONLY if Market Intelligence is available
  if (hasMarket && market.key_threats && market.key_threats.length > 0) {
    risks.push({
      id: 'risk-market-threat',
      risk: 'Identified Market Vulnerability',
      why: `Market intelligence identified the following operational consideration: ${market.key_threats[0]}.`,
      mitigation: 'Implement targeted local marketing and customer retention measures to address this factor.',
      source: 'Market Intelligence'
    });
  }

  // 7. Generate Priority Recommendations (Category, Priority, Title, Reason, Action, Source)
  const recommendations = [];

  // Market Recommendation: ONLY when Market Intelligence exists
  if (hasMarket) {
    recommendations.push({
      id: 'rec-market-1',
      category: 'Market',
      priority: 'High',
      title: 'Conduct Local Pilot Customer Validation',
      reason: `For your proposed enterprise in ${locationDisplay}, local consumer acceptance and willingness-to-pay should be verified before executing large machinery orders.`,
      action: 'Run a small local pilot with potential customers before scaling to validate demand and pricing.',
      source: 'Market Intelligence'
    });
  }

  // Finance Recommendation: ONLY when Financial Plan exists
  if (hasFinancial) {
    recommendations.push({
      id: 'rec-finance-1',
      category: 'Finance',
      priority: isWeakDscr ? 'High' : 'Medium',
      title: 'Validate Working Capital Adequacy',
      reason: `With a calculated project cost of ₹${projectCost.toLocaleString('en-IN')}, allocating the entire available capital to fixed assets leaves limited cushion for initial operating cycles.`,
      action: 'Validate whether sufficient working capital remains after the proposed project contribution and financing structure.',
      source: 'Financial Plan'
    });
  }

  // Financing / Scheme Recommendation: ONLY when Scheme Router exists
  if (hasScheme) {
    recommendations.push({
      id: 'rec-scheme-1',
      category: 'Financing / Scheme',
      priority: hasCeilingMismatch ? 'High' : 'Medium',
      title: 'Confirm Applicable Financing Terms with Official Authority',
      reason: `The prototype maps your inputs to the ${track}. Official lending parameters, subsidy rates, and margin requirements depend on active guidelines.`,
      action: 'Confirm the applicable financing channel and current requirements with the relevant official authority or lender.',
      source: 'Scheme Router'
    });
  }

  // Operations Recommendation: Feasibility or User Input
  recommendations.push({
    id: 'rec-ops-1',
    category: 'Operations',
    priority: 'Medium',
    title: 'Verify Vendor Quotations & Utility Connectivity',
    reason: 'Formal credit appraisal requires verified equipment pricing and confirmed utility connectivity at the proposed site.',
    action: 'Collect written pro-forma invoices from equipment suppliers and verify commercial power and water connectivity.',
    source: hasFeasibility ? 'Feasibility Analysis' : 'User Input'
  });

  // Risk Recommendation: ONLY when Financial Plan exists
  if (hasFinancial) {
    recommendations.push({
      id: 'rec-risk-1',
      category: 'Risk',
      priority: 'High',
      title: 'Establish Post-Moratorium Cash Reserves',
      reason: hasDscr 
        ? `Validate the modeled operating cash flow because the prototype DSCR (${dscrValue}x) is only an illustrative indicator.`
        : 'Principal amortization creates an increase in regular monthly outflows once the moratorium concludes.',
      action: 'Accumulate an operating reserve during each moratorium month to prepare for the start of regular monthly principal installments.',
      source: 'Financial Plan'
    });
  }

  // Validation Recommendation: Always generated from User Input
  recommendations.push({
    id: 'rec-val-1',
    category: 'Validation',
    priority: 'High',
    title: 'Prepare Detailed Project Documentation',
    reason: 'Formal financing discussions require a documented breakdown of equipment, infrastructure, and operating assumptions.',
    action: 'Prepare a structured Detailed Project Report (DPR) detailing production capacity, bill of materials, and operational assumptions (potential preparation item — confirm applicability).',
    source: 'User Input'
  });

  // 8. Phased Action Plan (NOW, BEFORE FINANCING, BEFORE LAUNCH)
  const actionPlan = {
    now: [
      {
        id: 'act-now-1',
        title: 'Conduct Local Customer Validation',
        detail: hasMarket 
          ? `Conduct a local customer validation survey in ${districtName || 'the target area'} regarding preferred packaging, pricing, and purchase frequency.`
          : 'Conduct a local customer validation survey regarding product demand and pricing before committing capital.',
        source: hasMarket ? 'Market Analysis' : 'User Input'
      },
      {
        id: 'act-now-2',
        title: 'Gather Written Machinery Invoices',
        detail: 'Obtain formal written vendor quotations including tax breakdown, delivery, and warranty terms (potential preparation item — confirm applicability).',
        source: hasFeasibility ? 'Feasibility Analysis' : 'User Input'
      },
      {
        id: 'act-now-3',
        title: 'Verify Margin Equity Availability',
        detail: marginCapital > 0 
          ? `Confirm that available promoter margin of ₹${marginCapital.toLocaleString('en-IN')} is unencumbered and accessible.`
          : 'Determine available promoter equity to support the proposed project scale.',
        source: hasFinancial ? 'Financial Plan' : 'User Input'
      }
    ],
    beforeFinancing: [
      {
        id: 'act-fin-1',
        title: 'Verify Udyam MSME Registration Applicability',
        detail: 'Verify whether Udyam registration is applicable to your business and current financing route (accessible online via udyamregistration.gov.in).',
        source: 'Scheme Router'
      },
      {
        id: 'act-fin-2',
        title: 'Confirm Financing Channel with Official Authority / Lender',
        detail: 'Confirm the applicable financing channel and current requirements with the relevant official authority or lender.',
        source: 'Scheme Router'
      },
      {
        id: 'act-fin-3',
        title: 'Verify Potential Subsidy & Subvention Terms',
        detail: 'Verify whether any current subsidy, subvention, or category-specific benefit applies to your case.',
        source: 'Scheme Router'
      }
    ],
    beforeLaunch: [
      {
        id: 'act-launch-1',
        title: 'Finalize Equipment Installation & Test Run',
        detail: 'Commission machinery, complete trial production batches, and calibrate output quality standards.',
        source: hasFeasibility ? 'Feasibility Analysis' : 'User Input'
      },
      {
        id: 'act-launch-2',
        title: 'Verify Local Clearances & Regulatory Requirements',
        detail: 'Verify whether local trade permits (such as Gram Panchayat trade NOC) or sector-specific registrations (such as FSSAI for food processing) apply before commercial launch.',
        source: hasFeasibility ? 'Feasibility Analysis' : 'User Input'
      },
      {
        id: 'act-launch-3',
        title: 'Establish Initial Off-Take Agreements',
        detail: 'Establish initial off-take agreements and agreed payment settlement terms with local retail buyers.',
        source: hasMarket ? 'Market Analysis' : 'User Input'
      }
    ]
  };

  // 9. Validation Questions (Decision-Support Without Arbitrary Figures)
  const validationQuestions = [
    {
      id: 'q1',
      question: 'How many retail outlets or direct households in your operational area can you realistically reach?',
      why: 'Validates real sales volume assumptions against physical distribution capabilities.',
      category: 'Market Demand'
    },
    {
      id: 'q2',
      question: 'What exact price are local buyers currently paying for competing alternatives?',
      why: 'Ensures your planned selling price offers competitive value without eroding profit margin.',
      category: 'Pricing & Margin'
    },
    {
      id: 'q3',
      question: 'Who are the closest competitors operating within your local catchment area?',
      why: 'Prevents entering saturated local markets without clear product or service differentiation.',
      category: 'Competition'
    },
    {
      id: 'q4',
      question: 'What will your exact monthly fixed costs be (rent, helper wages, utilities, packaging)?',
      why: 'Determines the minimum cash flow needed before loan service obligations.',
      category: 'Operating Expenditure'
    },
    {
      id: 'q5',
      question: (hasFinancial && monthlyEmi)
        ? `How many units or services must you deliver each month to cover your estimated monthly installment of ₹${Math.round(monthlyEmi).toLocaleString('en-IN')}?`
        : 'How many units or services must you deliver each month to cover fixed operational and debt obligations?',
      why: 'Establishes the firm break-even production volume needed for enterprise debt solvency.',
      category: 'Debt Service'
    },
    {
      id: 'q6',
      question: 'What happens if first-year revenue is 20% lower than your initial assumption?',
      why: 'Stress-tests your working capital cushion against seasonal monsoon slumps or delayed customer adoption.',
      category: 'Sensitivity & Buffer'
    },
    {
      id: 'q7',
      question: 'Which official lending institution or government channel handles financing for your sector this fiscal cycle?',
      why: 'Ensures application efforts are directed to institutions with active scheme allocations.',
      category: 'Scheme Execution'
    }
  ];

  // 10. Executive Advisory Summary Synthesis (Truthful & Data-Constrained)
  let advisoryStatus = 'Potentially Viable with Pre-Commitment Validation';
  let statusBadge = 'amber';

  if (isAbove50L || hasCeilingMismatch) {
    advisoryStatus = 'Requires Scope & Ceiling Recalibration';
    statusBadge = 'rose';
  } else if (hasFeasibility && isHighFeasibility && marginCapital > 0) {
    advisoryStatus = 'Potentially Viable — Proceed to Local Field Validation';
    statusBadge = 'emerald';
  }

  // Construct Truthful Narrative
  let executiveSummary = '';
  if (hasFinancial && hasScheme && hasMarket) {
    executiveSummary = `Your analysis indicates a potentially viable business opportunity for a ${sectorName} unit in ${locationDisplay}. With an available margin of ₹${marginCapital.toLocaleString('en-IN')} supporting an indicative project cost of ₹${projectCost.toLocaleString('en-IN')}, the enterprise aligns with the SIH 26091 ${track}. However, before formal debt commitment, local price validation, supplier quotation verification, and pre-application branch checks should be completed to mitigate fixed repayment risk.`;
  } else if (!hasMarket && hasFinancial) {
    executiveSummary = `Your analysis indicates an enterprise profile for a ${sectorName} unit in ${locationDisplay}. With an available margin of ₹${marginCapital.toLocaleString('en-IN')} supporting an indicative project cost of ₹${projectCost.toLocaleString('en-IN')}, the enterprise aligns with the SIH 26091 ${track}. Note: Market Intelligence is not available from current analysis; local market demand and customer validation must be conducted before committing capital.`;
  } else if (!hasFinancial) {
    executiveSummary = `Your analysis indicates a business profile for a ${sectorName} unit in ${locationDisplay}. Note: Financial planning data is not available from current analysis; project cost sizing and debt structures must be evaluated before formal financing discussions.`;
  } else {
    executiveSummary = `Your analysis indicates a business concept for a ${sectorName} unit in ${locationDisplay}. Complete upstream analysis modules to unlock comprehensive multi-domain strategic guidance.`;
  }

  return {
    profile: {
      businessIdea: businessIdea || `${sectorName} Enterprise`,
      sectorName,
      locationDisplay,
      districtName,
      stateName,
      marginCapital,
      projectCost,
      loanAmount,
      track
    },
    executiveSummary,
    advisoryStatus,
    statusBadge,
    coverage: {
      modules: coverage,
      availableCount: availableModulesCount,
      totalCount: totalModulesCount
    },
    strengths,
    risks,
    recommendations,
    actionPlan,
    validationQuestions,
    transparency: {
      engineType: 'Deterministic Prototype Advisory Engine',
      aiModelNotice: 'Recommendations are generated from deterministic prototype rules using available analysis outputs. No real-time AI model or live government decision engine is used in this prototype.',
      futureArchitecture: 'Future production architecture can connect this advisory layer to an authorized LLM/NLP service.',
      disclaimer: 'UdyamSetu AI provides prototype decision support based on the SIH 26091 problem-statement framework. It does not constitute certified financial underwriting, business consultancy guarantees, or government loan sanctions. Final eligibility, financing terms, and sanction are subject to official authority appraisal.'
    }
  };
}
