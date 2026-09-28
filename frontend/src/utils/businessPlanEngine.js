/**
 * UdyamSetu AI — Business Launch Plan Engine (SIH 26091)
 *
 * Synthesizes upstream intelligence (Intake, Market Intelligence,
 * Feasibility Analysis, Financial Planning, Scheme Router, AI Advisory)
 * into a structured, evidence-derived pre-launch operational roadmap.
 *
 * STRICT GOVERNANCE & INTEGRITY RULES:
 * 1. Zero Hallucination: Never fabricate missing upstream data.
 * 2. Missing Module Transparency: If a module is unavailable, display
 *    "Not available from current analysis" and omit dependent assertions.
 * 3. Non-Prescriptive Guidance: No arbitrary financial targets, sample counts,
 *    or mandatory regulatory claims without verified inputs.
 * 4. 100% Deterministic: Zero Math.random(), zero LLM calls, zero fake stats.
 */

import { formatCurrencyINR } from './formatters';

/**
 * Synthesizes all available upstream analysis into the Business Launch Plan.
 *
 * @param {Object} context
 * @param {Object} [context.session] - Task 2 Session data
 * @param {Object} [context.market] - Task 3 Market Intelligence data
 * @param {Object} [context.feasibility] - Task 4 Feasibility data
 * @param {Object} [context.financial] - Task 5 Financial Plan data
 * @param {Object} [context.scheme] - Task 6 Scheme Router data
 * @param {Object} [context.advisory] - Task 7 AI Advisory data
 * @returns {Object} Complete structured launch plan
 */
export function generateBusinessLaunchPlan(context = {}) {
  const { session, market, feasibility, financial, scheme, advisory } = context;

  // 1. Module Availability Audits (Strict Check — No Fallbacks)
  const hasSession = Boolean(
    session &&
    typeof session === 'object' &&
    (session.business || session.location || session.finance)
  );

  const hasMarket = Boolean(
    market &&
    typeof market === 'object' &&
    (market.demand_level || market.competition_level || market.market_opportunity_score || market.threats || market.demandOpportunity || market.competitionLandscape)
  );

  const hasFeasibility = Boolean(
    feasibility &&
    typeof feasibility === 'object' &&
    (feasibility.feasibility_score !== undefined || feasibility.overallScore !== undefined || feasibility.feasibility_status || feasibility.status)
  );

  const hasFinancial = Boolean(
    financial &&
    typeof financial === 'object' &&
    (financial.financing || financial.emi || financial.cashFlow)
  );

  const hasScheme = Boolean(
    scheme &&
    typeof scheme === 'object' &&
    (scheme.route || scheme.parameters || scheme.selectedRoute)
  );

  const hasAdvisory = Boolean(
    advisory &&
    typeof advisory === 'object' &&
    (advisory.recommendations || advisory.actionPlan || advisory.strengths)
  );

  // 2. Resolve Profile & Overview
  const rawMargin = session?.finance?.marginCapital ?? financial?.financing?.marginCapital;
  const parsedMargin = Number(rawMargin);
  const marginCapital = !isNaN(parsedMargin) && parsedMargin > 0 ? parsedMargin : null;

  const projectCost = financial?.financing?.projectCost ?? (marginCapital ? Math.round(marginCapital / 0.10) : null);
  const loanAmount = financial?.financing?.loanAmount ?? (projectCost ? Math.round(projectCost * 0.90) : null);

  const financingTrack = scheme?.route?.track ?? scheme?.route?.title ?? financial?.financing?.track ?? (
    projectCost ? (projectCost <= 140000 ? 'Micro Finance Track' : (projectCost <= 5000000 ? 'Term Loan Track' : 'Beyond Prototype Boundary (> ₹50L)')) : null
  );

  const sectorName = session?.business?.sectorName || session?.business?.category || 'Rural Micro-Enterprise';
  const category = session?.business?.category || sectorName;
  const businessIdea = session?.business?.idea || '';
  const isCustomIdea = Boolean(session?.business?.isCustom);

  const districtName = session?.location?.districtName || session?.location?.district || '';
  const stateName = session?.location?.state || '';
  const blockOrLocality = session?.location?.blockOrLocality || '';
  const tier = session?.location?.tier || '';
  const locationDisplay = districtName 
    ? (stateName ? `${districtName}, ${stateName}` : districtName) 
    : 'Operational District';

  // 3. Analysis Coverage Matrix
  const coverage = {
    intake: { available: hasSession, label: 'Entrepreneur Intake', source: 'Session Store' },
    market: { available: hasMarket, label: 'Market Intelligence', source: 'Module 1' },
    feasibility: { available: hasFeasibility, label: 'Feasibility Analysis', source: 'Module 2' },
    financial: { available: hasFinancial, label: 'Financial Plan', source: 'Module 3' },
    scheme: { available: hasScheme, label: 'Scheme Router', source: 'Module 4' },
    advisory: { available: hasAdvisory, label: 'AI Advisory', source: 'Module 5' }
  };

  const availableCount = Object.values(coverage).filter(c => c.available).length;
  const totalCount = Object.keys(coverage).length;

  // 4. Launch Readiness Status (Status-based, NO invented score)
  const feasibilityScore = hasFeasibility ? (feasibility.feasibility_score ?? feasibility.overallScore ?? null) : null;
  const feasibilityGrade = hasFeasibility ? (feasibility.feasibility_grade ?? feasibility.grade ?? null) : null;
  const feasibilityStatus = hasFeasibility 
    ? (feasibility.feasibility_status || feasibility.status || (feasibilityScore !== null ? (feasibilityScore >= 75 ? 'Potentially Feasible' : (feasibilityScore >= 60 ? 'Needs Validation' : 'Needs Significant Preparation')) : 'Analyzed'))
    : 'Not available from current analysis';

  const informationAvailable = [];
  const informationRequiringValidation = [];
  const informationMissing = [];

  // Determine available facts
  if (hasSession) {
    informationAvailable.push(`Target business concept: ${businessIdea || sectorName}`);
    informationAvailable.push(`Target geography: ${locationDisplay}${tier ? ` (${tier})` : ''}`);
    if (marginCapital) informationAvailable.push(`Promoter margin capital: ${formatCurrencyINR(marginCapital)}`);
  }

  if (hasMarket) {
    informationAvailable.push(`Catchment market reach analyzed (${market.catchmentRadius || '5–10 km'})`);
    if (market.demand_level) informationAvailable.push(`Demand signal: ${market.demand_level}`);
    if (market.competition_level) informationAvailable.push(`Competition intensity: ${market.competition_level}`);
    informationRequiringValidation.push('Validate customer willingness-to-pay and local repeat order cadence directly before launch.');
  } else {
    informationMissing.push('Market Intelligence: Local customer demand, competitor footprint, and catchment reach have not been evaluated.');
  }

  if (hasFeasibility) {
    informationAvailable.push(`Feasibility status: ${feasibilityStatus}${feasibilityGrade ? ` (Grade: ${feasibilityGrade})` : ''}`);
    informationRequiringValidation.push('Confirm equipment supplier delivery terms and local raw material availability.');
  } else {
    informationMissing.push('Feasibility Analysis: Operational readiness, break-even assumptions, and resource bottlenecks have not been evaluated.');
  }

  if (hasFinancial) {
    informationAvailable.push(`Structured project cost: ${formatCurrencyINR(projectCost)}`);
    informationAvailable.push(`Indicative loan sizing: ${formatCurrencyINR(loanAmount)}`);
    if (financial.emi?.monthlyEmi) informationAvailable.push(`Modeled monthly EMI: ${formatCurrencyINR(financial.emi.monthlyEmi)}`);
    if (financial.dscr?.value) informationAvailable.push(`Illustrative DSCR: ${financial.dscr.value.toFixed(2)} (${financial.dscr.benchmark || 'Indicative'})`);
    informationRequiringValidation.push('Review projected operating cash flow against modeled debt service obligations.');
    informationRequiringValidation.push('Validate whether sufficient working capital remains after initial equipment setup.');
  } else {
    informationMissing.push('Financial Plan: Debt structuring, reducing-balance EMI schedule, and illustrative DSCR have not been modeled.');
  }

  if (hasScheme) {
    informationAvailable.push(`Prototype financing track: ${financingTrack}`);
    if (scheme.ceilingMismatch) {
      informationRequiringValidation.push('Address loan ceiling mismatch between calculated 90% debt and scheme lending cap.');
    }
    if (scheme.isAbove50L) {
      informationRequiringValidation.push('Project exceeds prototype micro-enterprise boundary (₹50L); requires commercial banking consortium review.');
    }
    informationRequiringValidation.push('Confirm applicable financing channel and current requirements with the relevant official authority or lender.');
  } else {
    informationMissing.push('Scheme Router: Official government financing track and subsidy rules have not been routed.');
  }

  if (!hasAdvisory) {
    informationMissing.push('AI Advisory: Cross-module strategic synthesis and risk-mitigation priorities have not been reviewed.');
  }

  // 5. Pre-Launch Checklist (Grouped into 6 categories, strictly derived)
  const checklist = {
    businessValidation: [
      {
        id: 'bv-1',
        title: 'Validate core business concept with prospective customers',
        action: 'Conduct structured conversations with prospective local buyers to confirm problem-solution fit before capital commitment.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      ...(businessIdea.length < 25 ? [{
        id: 'bv-2',
        title: 'Draft a written Detailed Project Report (DPR)',
        action: 'Articulate product specifications, expected daily capacity, pricing structure, and target buyers in a clear business memo.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }] : []),
      {
        id: 'bv-3',
        title: 'Confirm operating site and physical premises readiness',
        action: 'Inspect selected workshop/shed premises for adequate road access, continuous power connection, and clean water supply.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }
    ],

    marketValidation: hasMarket ? [
      {
        id: 'mv-1',
        title: 'Validate local catchment demand assumptions',
        action: `Confirm customer demand within your modeled ${market.catchmentRadius || '5–10 km'} catchment area through direct inquiries.`,
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      {
        id: 'mv-2',
        title: 'Review local competitor offerings and pricing',
        action: 'Check competing sellers in adjacent village markets to verify prevailing price points, packaging, and credit terms.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      {
        id: 'mv-3',
        title: 'Confirm target distribution channels',
        action: 'Verify access to local retail counters, weekly village haats, or direct consumer delivery routes.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }
    ] : [
      {
        id: 'mv-none',
        title: 'Market Intelligence — Not available from current analysis',
        action: 'Complete Module 1 (Market Intelligence) or conduct direct local customer and competitor surveys before launch.',
        status: 'Not available from current analysis',
        isAvailable: false
      }
    ],

    financialPreparation: hasFinancial ? [
      {
        id: 'fp-1',
        title: 'Confirm promoter equity contribution availability',
        action: `Validate that the required promoter contribution (${marginCapital ? formatCurrencyINR(marginCapital) : 'equity share'}) is fully liquid and unencumbered.`,
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      {
        id: 'fp-2',
        title: 'Review modeled debt service against expected operating cash flow',
        action: `Verify whether monthly operating revenues can comfortably support the modeled EMI (${financial.emi?.monthlyEmi ? formatCurrencyINR(financial.emi.monthlyEmi) : 'debt payment'}) after all recurring costs.`,
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      {
        id: 'fp-3',
        title: 'Validate working capital sufficiency',
        action: 'Validate whether sufficient working capital remains after initial equipment setup and initial raw material procurement.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      ...(financial.dscr?.value ? [{
        id: 'fp-4',
        title: 'Validate prototype DSCR operating assumptions',
        action: 'The modeled DSCR is an illustrative prototype indicator based on archetype assumptions. Validate with actual local quotations.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }] : [])
    ] : [
      {
        id: 'fp-none',
        title: 'Financial Plan — Not available from current analysis',
        action: 'Complete Module 3 (Financial Plan) to calculate bankable debt sizing, EMI repayment schedules, and cash-flow sensitivity.',
        status: 'Not available from current analysis',
        isAvailable: false
      }
    ],

    operationsPreparation: [
      {
        id: 'op-1',
        title: 'Obtain firm quotes from machinery / equipment vendors',
        action: 'Request written quotations with confirmed delivery timelines, warranty terms, installation support, and spare parts availability.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      {
        id: 'op-2',
        title: 'Secure reliable primary and secondary raw material sources',
        action: 'Identify at least two distinct suppliers to avoid operational stoppages during seasonal or transit disruptions.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      {
        id: 'op-3',
        title: 'Confirm labor availability and local wage expectations',
        action: 'Verify that required operating technicians or village helpers are available locally within modeled operational cost budgets.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }
    ],

    schemeVerification: hasScheme ? [
      {
        id: 'sv-1',
        title: 'Confirm financing channel with relevant authority or lending institution',
        action: `Present business details to your local bank branch manager or DIC office to confirm applicable terms for ${financingTrack}.`,
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      },
      ...(scheme.ceilingMismatch ? [{
        id: 'sv-2',
        title: 'Address loan ceiling mismatch',
        action: 'Calculated 90% debt exceeds the scheme lending ceiling. Arrange supplementary promoter equity or explore multi-tranche financing.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }] : []),
      ...(scheme.isAbove50L ? [{
        id: 'sv-3',
        title: 'Engage commercial bank consortium appraisal',
        action: 'Project cost exceeds the prototype micro-enterprise framework ceiling (₹50 Lakh) and requires commercial consortium evaluation.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }] : []),
      {
        id: 'sv-4',
        title: 'Verify whether any category-specific subsidy or subvention applies',
        action: 'Confirm current demographic, gender, or regional capital incentives on official government portals before submitting formal loan files.',
        status: 'Recommended Pre-Launch Step',
        isAvailable: true
      }
    ] : [
      {
        id: 'sv-none',
        title: 'Scheme Router — Not available from current analysis',
        action: 'Complete Module 4 (Scheme Router) to determine applicable government financing tracks and loan ceilings.',
        status: 'Not available from current analysis',
        isAvailable: false
      }
    ],

    documentationPreparation: [
      {
        id: 'dp-1',
        title: 'Udyam Registration Certificate',
        action: 'Verify whether Udyam registration is applicable to your business and current financing route.',
        status: 'Potential preparation item — confirm applicability',
        isAvailable: true
      },
      {
        id: 'dp-2',
        title: 'Local Panchayat / Trade NOC',
        action: 'Verify whether local trade permits or panchayat permissions apply before commercial launch.',
        status: 'Potential preparation item — confirm applicability',
        isAvailable: true
      },
      {
        id: 'dp-3',
        title: 'Sectoral Compliance & Safety Registrations',
        action: 'Verify whether statutory sectoral registrations (such as FSSAI for food processing) apply to your specific product category.',
        status: 'Potential preparation item — confirm applicability',
        isAvailable: true
      },
      {
        id: 'dp-4',
        title: 'KYC & Banking Documentation',
        action: 'Prepare applicant identity, residence, bank statements, and land/rental documentation for lender verification.',
        status: 'Potential preparation item — confirm applicability',
        isAvailable: true
      }
    ]
  };

  // 6. Launch Sequence (9 Generic Planning Stages — No Arbitrary Numbers)
  const launchSequence = [
    {
      step: 1,
      title: 'Validate Business Idea',
      description: 'Confirm value proposition, product form, and consumer problem-solution fit.',
      status: hasSession ? 'Intake Defined' : 'Pending Intake',
      actions: [
        'Define core product specifications and target buyer persona.',
        'Conduct preliminary informal conversations with prospective local buyers.'
      ]
    },
    {
      step: 2,
      title: 'Validate Local Market',
      description: 'Audit local demand signals, customer density, and competitive offerings.',
      status: hasMarket ? 'Market Analyzed' : 'Not available from current analysis',
      actions: [
        hasMarket ? 'Review catchment area demand indicators.' : 'Survey prospective local buyers directly.',
        hasMarket ? 'Assess competitor differentiation opportunities.' : 'Identify adjacent village competitors and pricing.'
      ]
    },
    {
      step: 3,
      title: 'Finalize Business Model',
      description: 'Establish revenue streams, operating cost structure, and target margins.',
      status: hasFeasibility ? 'Feasibility Assessed' : 'Not available from current analysis',
      actions: [
        'Document unit production costs, packaging expenses, and delivery logistics.',
        'Determine wholesale vs. retail pricing models.'
      ]
    },
    {
      step: 4,
      title: 'Prepare Financial Details',
      description: 'Structure project capital expenditure, debt sizing, and monthly debt service.',
      status: hasFinancial ? 'Financial Model Sized' : 'Not available from current analysis',
      actions: [
        hasFinancial ? `Review modeled EMI (${formatCurrencyINR(financial.emi?.monthlyEmi || 0)}).` : 'Calculate total capital expenditure and working capital.',
        'Ensure promoter equity contribution is liquid and readily deployable.'
      ]
    },
    {
      step: 5,
      title: 'Verify Financing Route',
      description: 'Confirm applicable government scheme track, lender guidelines, and documentation.',
      status: hasScheme ? 'Financing Track Identified' : 'Not available from current analysis',
      actions: [
        'Confirm the applicable financing channel and current requirements with the relevant official authority or lender.',
        'Verify whether any current subsidy, subvention, or category-specific benefit applies to your case.'
      ]
    },
    {
      step: 6,
      title: 'Prepare Operations',
      description: 'Secure equipment quotations, supplier contracts, premises, and utility hookups.',
      status: 'Ready for Operational Prep',
      actions: [
        'Obtain written quotes and warranty agreements from equipment vendors.',
        'Confirm availability and delivery schedules for essential raw materials.'
      ]
    },
    {
      step: 7,
      title: 'Launch Initial Pilot',
      description: 'Run small local pilot production with prospective customers before scaling.',
      status: 'Planned Milestone',
      actions: [
        'Produce initial trial batch under commercial conditions.',
        'Supply pilot products to target customers and collect immediate quality feedback.'
      ]
    },
    {
      step: 8,
      title: 'Review Results',
      description: 'Compare actual costs, yields, and customer feedback against prototype assumptions.',
      status: 'Planned Milestone',
      actions: [
        'Audit actual production waste, material conversion, and operating hours.',
        'Review customer repeat purchase intent and pricing feedback.'
      ]
    },
    {
      step: 9,
      title: 'Iterate / Scale',
      description: 'Refine operating recipes, distribution channels, and volume expansion.',
      status: 'Planned Milestone',
      actions: [
        'Adjust product specifications and packaging based on pilot findings.',
        'Gradually expand distribution into neighboring village clusters.'
      ]
    }
  ];

  // 7. Milestone Planner (4 Milestone Groups — Non-Numeric)
  const milestones = [
    {
      group: 'PRE-LAUNCH',
      title: 'Pre-Launch Verification & Groundwork',
      objective: 'Validate core assumptions and complete prerequisite operational and financial checks.',
      milestones: [
        'Validate business concept with prospective customers.',
        hasMarket ? 'Review market findings and competitor pricing in local cluster.' : 'Conduct basic local demand survey.',
        hasFeasibility ? 'Review operational feasibility and resolve resource gaps.' : 'Confirm equipment and premises readiness.',
        hasFinancial ? 'Review financial structuring and debt repayment obligations.' : 'Formulate a realistic capital expenditure budget.',
        hasScheme ? 'Verify scheme guidelines with local branch manager.' : 'Identify viable bank financing options.',
        'Prepare potential documentation items and verify applicability.'
      ]
    },
    {
      group: 'INITIAL LAUNCH',
      title: 'Initial Pilot & Commercial Inception',
      objective: 'Establish basic operating setup and validate market reception through controlled trial batches.',
      milestones: [
        'Establish operating premises and complete machinery installation.',
        'Conduct initial test production run to verify equipment operation.',
        'Begin initial customer validation through a small local pilot.',
        'Track actual raw material consumption and unit production costs.',
        'Compare early sales velocity and receipts against business model assumptions.'
      ]
    },
    {
      group: 'EARLY OPERATIONS',
      title: 'Early Operations & Cash Flow Stabilization',
      objective: 'Maintain smooth daily production while vigilantly managing working capital and debt service.',
      milestones: [
        'Monitor recurring demand patterns and customer repeat purchase frequency.',
        'Monitor monthly operating costs and raw material procurement expenses.',
        'Track operating cash flow to ensure comfortable monthly debt service capability.',
        'Address operational hiccups, equipment adjustments, or supplier delays promptly.'
      ]
    },
    {
      group: 'REVIEW & IMPROVEMENT',
      title: 'Operational Review & Scaling Decisions',
      objective: 'Evaluate observed enterprise performance against expectations to guide sustainable expansion.',
      milestones: [
        'Compare actual enterprise performance with prototype assumptions.',
        'Reassess identified operational, market, and credit risks using ground evidence.',
        'Update the business plan, pricing structure, and supplier contracts based on verified data.',
        'Decide whether further validation or volume scaling into adjacent clusters is appropriate.'
      ]
    }
  ];

  // 8. Risk & Control Plan (Derived strictly from upstream outputs)
  const riskControlPlan = [];

  // Market & Competition Risks (Task 3)
  if (hasMarket) {
    if (market.threats && Array.isArray(market.threats) && market.threats.length > 0) {
      market.threats.slice(0, 2).forEach((threat, idx) => {
        riskControlPlan.push({
          id: `rc-m-${idx}`,
          category: 'Market Risk',
          risk: threat.threat_name || threat.title || threat.description || 'Local demand sensitivity',
          source: 'Market Intelligence (Module 1)',
          control: threat.mitigation_strategy || threat.mitigation || 'Validate customer demand through initial pilot deliveries before scaling volume.'
        });
      });
    } else {
      riskControlPlan.push({
        id: 'rc-m-0',
        category: 'Market Risk',
        risk: 'Customer demand assumptions require ground validation.',
        source: 'Market Intelligence (Module 1)',
        control: 'Conduct direct customer validation surveys and test local willingness-to-pay.'
      });
    }

    if (market.competition_level && (market.competition_level === 'High' || market.competition_level === 'Moderate')) {
      riskControlPlan.push({
        id: 'rc-c-0',
        category: 'Competition Risk',
        risk: `Local market shows ${market.competition_level.toLowerCase()} competitor presence.`,
        source: 'Market Intelligence (Module 1)',
        control: 'Differentiate through fresher local delivery, transparent quality, and responsive customer service.'
      });
    }
  }

  // Operational Risks (Task 4)
  if (hasFeasibility) {
    if (feasibility.risks && Array.isArray(feasibility.risks) && feasibility.risks.length > 0) {
      feasibility.risks.slice(0, 2).forEach((r, idx) => {
        riskControlPlan.push({
          id: `rc-op-${idx}`,
          category: 'Operational Risk',
          risk: r.risk || r.title || 'Equipment or supply chain bottleneck',
          source: 'Feasibility Analysis (Module 2)',
          control: r.mitigation || 'Establish backup local suppliers and schedule regular preventive equipment maintenance.'
        });
      });
    } else {
      riskControlPlan.push({
        id: 'rc-op-0',
        category: 'Operational Risk',
        risk: 'Operational supply chain disruptions or power outages.',
        source: 'Feasibility Analysis (Module 2)',
        control: 'Maintain safety stock of critical consumables and verify local utility power backup.'
      });
    }
  }

  // Financial Risks (Task 5)
  if (hasFinancial) {
    if (financial.risks && Array.isArray(financial.risks) && financial.risks.length > 0) {
      financial.risks.slice(0, 2).forEach((fr, idx) => {
        riskControlPlan.push({
          id: `rc-fn-${idx}`,
          category: 'Financial Risk',
          risk: fr.title || fr.name || 'Debt service coverage sensitivity',
          source: 'Financial Plan (Module 3)',
          control: fr.mitigation || 'Validate whether sufficient working capital remains after initial equipment setup.'
        });
      });
    } else {
      riskControlPlan.push({
        id: 'rc-fn-0',
        category: 'Financial Risk',
        risk: 'Monthly debt service burden during initial operational ramp-up.',
        source: 'Financial Plan (Module 3)',
        control: 'Review whether projected operating cash flow can comfortably support the modeled debt service.'
      });
    }
  }

  // Financing / Scheme Risks (Task 6)
  if (hasScheme) {
    if (scheme.ceilingMismatch) {
      riskControlPlan.push({
        id: 'rc-sc-0',
        category: 'Financing Risk',
        risk: 'Loan ceiling mismatch between calculated 90% debt and scheme lending limit.',
        source: 'Scheme Router (Module 4)',
        control: 'Plan additional promoter equity contribution or explore supplementary bank credit lines.'
      });
    }
    if (scheme.isAbove50L) {
      riskControlPlan.push({
        id: 'rc-sc-1',
        category: 'Financing Risk',
        risk: 'Project cost exceeds the prototype micro-enterprise framework threshold (> ₹50 Lakh).',
        source: 'Scheme Router (Module 4)',
        control: 'Engage commercial banking consortium appraisal for larger-scale enterprise financing.'
      });
    }
    riskControlPlan.push({
      id: 'rc-sc-2',
      category: 'Financing Risk',
      risk: 'Scheme guidelines, interest schedules, or subsidy eligibility rules may change.',
      source: 'Scheme Router (Module 4)',
      control: 'Confirm the applicable financing channel and current requirements with the relevant official authority or lender.'
    });
  }

  // Information / Missing Data Risks
  if (!hasMarket || !hasFinancial || !hasFeasibility || !hasScheme) {
    riskControlPlan.push({
      id: 'rc-dt-0',
      category: 'Data & Information Risk',
      risk: `Unfinished upstream modules (${informationMissing.length} module${informationMissing.length > 1 ? 's' : ''} unanalyzed).`,
      source: 'Analysis Coverage Audit',
      control: 'Complete remaining analysis modules to replace default archetype assumptions with tailored insights.'
    });
  }

  // 9. Financial Preparation Summary
  const financialSummary = hasFinancial ? {
    isAvailable: true,
    projectCost: projectCost,
    marginCapital: marginCapital,
    loanAmount: loanAmount,
    interestRate: financial.financing?.interestRate ?? null,
    tenureYears: financial.financing?.tenureYears ?? null,
    tenureMonths: financial.financing?.tenureMonths ?? null,
    moratoriumMonths: financial.financing?.moratoriumMonths ?? null,
    monthlyEmi: financial.emi?.monthlyEmi ?? null,
    dscrValue: financial.dscr?.value ?? null,
    dscrBenchmark: financial.dscr?.benchmark ?? null,
    hasCeilingMismatch: Boolean(scheme?.ceilingMismatch),
    validations: [
      'Validate whether the proposed project contribution is affordable and liquid.',
      'Review the modeled EMI against expected monthly operating cash flow.',
      'Validate the prototype DSCR assumptions using real business revenue and cost projections.',
      Boolean(scheme?.ceilingMismatch) ? 'Review the loan ceiling mismatch identified by the Scheme Router.' : null
    ].filter(Boolean)
  } : {
    isAvailable: false,
    message: 'Financial Plan — Not available from current analysis.'
  };

  // 10. Scheme Follow-Up Summary
  const schemeSummary = hasScheme ? {
    isAvailable: true,
    routeTitle: scheme.route?.title || scheme.route?.track || 'Prototype Financing Route',
    track: financingTrack,
    maxLoan: scheme.route?.maxLoan || scheme.parameters?.maxLoan || null,
    interestRate: scheme.route?.interestRate || scheme.parameters?.interestRate || null,
    tenure: scheme.route?.tenure || scheme.parameters?.tenureYears ? `${scheme.parameters.tenureYears} Years` : null,
    moratorium: scheme.route?.moratorium || scheme.parameters?.moratoriumMonths ? `${scheme.parameters.moratoriumMonths} Months` : null,
    hasCeilingMismatch: Boolean(scheme.ceilingMismatch),
    isAbove50L: Boolean(scheme.isAbove50L),
    mismatchDetails: scheme.ceilingMismatch || null,
    verificationActions: [
      'Confirm the applicable financing channel and current requirements with the relevant official authority or lender.',
      'Verify current lender interest rate schedules and promoter margin money mandates.',
      'Verify whether any current subsidy, subvention, or category-specific benefit applies to your case.'
    ],
    disclaimer: 'UdyamSetu AI provides prototype decision support based on the SIH 26091 problem-statement framework. It does not determine government eligibility or loan approval. Final scheme eligibility, financing terms, documentation and sanction are subject to current official rules and lender/authority appraisal.'
  } : {
    isAvailable: false,
    message: 'Scheme Router — Not available from current analysis.'
  };

  // 11. Recommendations Before Launch (Surfaced from Task 7 Advisory)
  const recommendationsBeforeLaunch = hasAdvisory && advisory.recommendations && Array.isArray(advisory.recommendations) ? {
    isAvailable: true,
    items: advisory.recommendations.map(rec => ({
      category: rec.category || 'General',
      priority: rec.priority || 'Medium',
      title: rec.title,
      why: rec.why,
      action: rec.action,
      source: rec.source || 'AI Advisory (Module 5)'
    }))
  } : {
    isAvailable: false,
    message: 'AI Advisory — Not available from current analysis.',
    items: []
  };

  // 12. Validation Questions (Surfaced from Task 7 Advisory)
  const validationQuestions = hasAdvisory && advisory.validationQuestions && Array.isArray(advisory.validationQuestions) ? {
    isAvailable: true,
    questions: advisory.validationQuestions
  } : {
    isAvailable: false,
    message: 'Validation questions require completion of the AI Advisory module.',
    questions: []
  };

  // 13. Transparency Disclosures
  const transparency = {
    methodology: 'The Business Launch Plan synthesizes verified upstream findings from Entrepreneur Intake, Hyper-Local Market Intelligence, Feasibility Analysis, Financial Structuring, Scheme Routing, and AI Advisory into a phased pre-launch roadmap.',
    prototypeDisclosures: [
      'This Launch Plan is generated from the prototype\'s existing analysis modules.',
      'Market information may use demo/synthetic data where applicable.',
      'Financial outputs use the existing prototype financial assumptions and SIH 26091 parameters.',
      'Government financing guidance is informational and must be verified against current official rules.',
      'This prototype does not guarantee business success, financing approval, or government eligibility.',
      'Recommendations are generated from deterministic prototype rules. No real-time AI model or live government decision engine is used in this prototype.'
    ],
    sources: coverage
  };

  return {
    overview: {
      idea: businessIdea || sectorName,
      isCustomIdea,
      category,
      sectorName,
      locationDisplay,
      districtName,
      stateName,
      blockOrLocality,
      tier,
      marginCapital,
      projectCost,
      loanAmount,
      financingTrack,
      entrepreneur: session?.entrepreneurContext || null
    },
    coverage,
    readiness: {
      hasFeasibility,
      feasibilityStatus,
      feasibilityScore,
      feasibilityGrade,
      availableCount,
      totalCount,
      informationAvailable,
      informationRequiringValidation,
      informationMissing
    },
    recommendationsBeforeLaunch,
    checklist,
    launchSequence,
    milestones,
    riskControlPlan,
    financialSummary,
    schemeSummary,
    validationQuestions,
    transparency
  };
}
