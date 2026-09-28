/**
 * UdyamSetu AI — Smart Scheme Router Engine (SIH 26091)
 *
 * Deterministic scheme routing engine adhering strictly to the SIH 26091 framework.
 * Evaluates entrepreneur session data and financial parameters to determine indicative
 * financing tracks, loan ceiling adjustments, verification requirements, and document checklists.
 *
 * IMPORTANT:
 * - This engine is 100% deterministic (zero Math.random(), zero LLM calls).
 * - It does NOT claim "Approved", "Eligible", or "Guaranteed loan".
 * - Uses prototype language: "Potentially Applicable", "Prototype Rule Match", "Indicative financing path".
 */

export const PROTOTYPE_SCHEME_RULES = {
  microFinance: {
    id: 'micro-finance',
    name: 'Micro Finance Track',
    shortName: 'Micro Finance',
    category: 'Rural Micro-Enterprise Financing',
    minProjectCost: 1,
    maxProjectCost: 140000, // ≤ ₹1.40 Lakh
    financingPercentage: 90,
    financingRatio: 0.90,
    maxLoanCeiling: 125000, // ₹1.25 Lakh
    interestRate: 6.5,
    tenureYears: 3,
    tenureMonths: 36,
    moratoriumMonths: 3,
    boundaryLabel: 'Project Cost up to ₹1.40 Lakh (≤ ₹1,40,000)',
    rationale: 'The prototype routes this analysis to Micro Finance because the calculated project cost falls within the stated SIH 26091 Micro Finance project-cost boundary (≤ ₹1.40 Lakh).'
  },
  termLoan: {
    id: 'term-loan',
    name: 'Term Loan Track',
    shortName: 'Term Loan',
    category: 'Medium-Scale Enterprise Term Credit',
    minProjectCostExclusive: 140000,
    maxProjectCost: 5000000, // > ₹1.40 Lakh and ≤ ₹50 Lakh
    financingPercentage: 90,
    financingRatio: 0.90,
    maxLoanCeiling: 4500000, // ₹45.00 Lakh
    interestRate: 8.0,
    tenureYears: 7,
    tenureMonths: 84,
    moratoriumMonths: 6,
    boundaryLabel: 'Project Cost above ₹1.40 Lakh up to ₹50 Lakh (> ₹1,40,000 to ₹50,00,000)',
    rationale: 'The prototype routes this analysis to Term Loan because the calculated project cost falls within the stated SIH 26091 Term Loan project-cost boundary (> ₹1.40 Lakh to ₹50 Lakh).'
  },
  upperCeilingLimit: 5000000 // ₹50 Lakh prototype limit
};

/**
 * Verification Checklist Items
 * Generic items to confirm with applicable authority / lender.
 */
export const VERIFICATION_CHECKLIST_ITEMS = [
  {
    id: 'v1',
    title: 'Current Government / Lender Scheme Rules',
    description: 'Verify latest guidelines, operational circulars, and target allocations with the District Industries Centre (DIC) or Lead District Manager (LDM).',
    category: 'Policy & Regulatory'
  },
  {
    id: 'v2',
    title: 'Applicable Interest Rate & Subvention Terms',
    description: 'Confirm whether the lending bank offers capped prototype rates (6.5% / 8.0%) or prevailing RBI repo-linked benchmark rates (RBLR / MCLR), and check for interest subvention eligibility.',
    category: 'Financial Terms'
  },
  {
    id: 'v3',
    title: 'Mandatory Promoter Equity Contribution',
    description: 'Confirm the exact minimum margin capital required (standard 10% under SIH guideline vs. 5%–15% under specific regional/social sub-schemes).',
    category: 'Financial Terms'
  },
  {
    id: 'v4',
    title: 'Moratorium Period & Interest Treatment',
    description: 'Clarify if monthly interest is required to be serviced during the moratorium period or if it is compounded and capitalized into the principal.',
    category: 'Repayment Structure'
  },
  {
    id: 'v5',
    title: 'Demographic & Social Category Criteria',
    description: 'Verify if your enterprise qualifies for special subsidy bonuses (e.g., up to 35% capital subsidy for rural women, SC/ST, or special category districts).',
    category: 'Eligibility & Subsidies'
  },
  {
    id: 'v6',
    title: 'Formal Application Channel & Nodal Agency',
    description: 'Confirm whether the application must be submitted via the national portal (e.g., KVIC online portal for PMEGP, Mudra portal) or directly through a local commercial bank branch.',
    category: 'Process & Submission'
  }
];

/**
 * Potential Document Checklist Categories
 * Clearly marked as potential documents to prepare — final requirements vary by lender.
 */
export const DOCUMENT_CHECKLIST_CATEGORIES = [
  {
    category: 'Identity & Legal Proof',
    note: 'Mandatory for KYC and credit bureau verification',
    documents: [
      { name: 'Aadhaar Card', detail: 'Linked with active mobile number for Aadhaar e-KYC authentication' },
      { name: 'PAN Card', detail: 'Permanent Account Number of the proprietor / key promoters' }
    ]
  },
  {
    category: 'Address & Residence Proof',
    note: 'Confirms rural / operational jurisdiction',
    documents: [
      { name: 'Domicile / Residence Certificate', detail: 'Issued by local revenue authority / Tehsildar or Gram Panchayat certificate' },
      { name: 'Utility Bill / Voter ID', detail: 'Electricity bill, telephone bill, or voter ID card matching operational address' }
    ]
  },
  {
    category: 'Bank Account & Financial Standing',
    note: 'Verifies banking relationship and equity capacity',
    documents: [
      { name: '6-Month Bank Account Statement', detail: 'Active savings or current account passbook showing transactions and unencumbered equity' },
      { name: 'Canceled Cheque / Passbook Leaf', detail: 'Shows verified account number, account holder name, and branch IFSC code' }
    ]
  },
  {
    category: 'Business & Project Proposal',
    note: 'Demonstrates commercial viability and project justification',
    documents: [
      { name: 'Detailed Project Report (DPR)', detail: 'Comprehensive blueprint detailing capacity, process flow, costs, and market outlets' },
      { name: 'Cost Quotations & Vendor Invoices', detail: '2 to 3 formal pro-forma invoices from verified machinery and equipment suppliers' }
    ]
  },
  {
    category: 'Statutory & Municipal Clearances',
    note: 'Required depending on enterprise activity and local regulations',
    documents: [
      { name: 'Udyam Registration Certificate', detail: 'Free national MSME registration obtainable online with Aadhaar' },
      { name: 'Gram Panchayat / Local Body NOC', detail: 'No-objection certificate for setting up micro-processing or commercial machinery' },
      { name: 'FSSAI License / Registration', detail: 'Applicable specifically for food processing, dairy, and edible agro-produce units' }
    ]
  }
];

/**
 * Core Deterministic Scheme Routing Logic
 *
 * @param {Object} params
 * @param {number} params.marginCapital - Entrepreneur's available equity
 * @param {string} [params.sectorId] - Selected business sector
 * @param {string} [params.districtId] - Selected district identifier
 * @param {string} [params.businessIdea] - Custom or selected business idea
 * @param {string} [params.gender] - Entrepreneur gender
 * @param {string} [params.socialCategory] - Entrepreneur social category
 * @returns {Object} Comprehensive deterministic scheme routing result
 */
export function calculateSchemeRoute(params = {}) {
  const rawMargin = params.marginCapital ?? params.equity_contribution ?? params.proposed_capital;
  const marginCapital = Number(rawMargin);

  if (!rawMargin || isNaN(marginCapital) || marginCapital <= 0) {
    throw new Error('Margin capital is required for scheme routing.');
  }

  // SIH 26091 Core Sizing Equation
  const projectCost = Math.round(marginCapital / 0.10);
  const rawLoan = Math.round(projectCost * 0.90);

  // Evaluate Routing Rules
  const isMicro = projectCost <= PROTOTYPE_SCHEME_RULES.microFinance.maxProjectCost;
  const isTerm = !isMicro && projectCost <= PROTOTYPE_SCHEME_RULES.termLoan.maxProjectCost;
  const isAbove50L = projectCost > PROTOTYPE_SCHEME_RULES.upperCeilingLimit;

  let activeRule = null;
  let routeStatus = 'Potentially Applicable';
  let routeTrack = '';
  let routeReason = '';
  let ruleCode = '';
  let maxLoanCeiling = 0;
  let interestRate = 0;
  let tenureMonths = 0;
  let tenureYears = 0;
  let moratoriumMonths = 0;
  let boundaryLabel = '';

  if (isMicro) {
    activeRule = PROTOTYPE_SCHEME_RULES.microFinance;
    ruleCode = 'RULE_A_MICRO_FINANCE';
    routeTrack = activeRule.name;
    routeReason = activeRule.rationale;
    maxLoanCeiling = activeRule.maxLoanCeiling;
    interestRate = activeRule.interestRate;
    tenureMonths = activeRule.tenureMonths;
    tenureYears = activeRule.tenureYears;
    moratoriumMonths = activeRule.moratoriumMonths;
    boundaryLabel = activeRule.boundaryLabel;
  } else if (isTerm) {
    activeRule = PROTOTYPE_SCHEME_RULES.termLoan;
    ruleCode = 'RULE_B_TERM_LOAN';
    routeTrack = activeRule.name;
    routeReason = activeRule.rationale;
    maxLoanCeiling = activeRule.maxLoanCeiling;
    interestRate = activeRule.interestRate;
    tenureMonths = activeRule.tenureMonths;
    tenureYears = activeRule.tenureYears;
    moratoriumMonths = activeRule.moratoriumMonths;
    boundaryLabel = activeRule.boundaryLabel;
  } else {
    // RULE C — ABOVE ₹50 LAKH
    ruleCode = 'RULE_C_ABOVE_50L';
    routeTrack = 'Outside Stated Prototype Financing Boundary';
    routeStatus = 'Requires Separate Appraisal';
    routeReason = 'The calculated project cost exceeds the ₹50 lakh upper boundary documented for the SIH 26091 prototype framework. This case requires separate financing appraisal and official verification.';
    maxLoanCeiling = PROTOTYPE_SCHEME_RULES.termLoan.maxLoanCeiling;
    interestRate = 8.0;
    tenureMonths = 84;
    tenureYears = 7;
    moratoriumMonths = 6;
    boundaryLabel = 'Project Cost > ₹50 Lakh (Outside Prototype Bounds)';
  }

  // Loan Ceiling Mismatch Handling (Section 6)
  const hasCeilingMismatch = rawLoan > maxLoanCeiling;
  const indicativeRoutedLoan = Math.min(rawLoan, maxLoanCeiling);

  let ceilingMismatchDetails = null;
  if (hasCeilingMismatch) {
    ceilingMismatchDetails = {
      rawLoan,
      maxLoanCeiling,
      indicativeRoutedLoan,
      difference: rawLoan - maxLoanCeiling,
      explanation: `Calculated 90% financing (₹${rawLoan.toLocaleString('en-IN')}) exceeds the stated maximum loan ceiling (₹${maxLoanCeiling.toLocaleString('en-IN')}); the prototype caps the indicative routed amount at the documented ceiling (₹${indicativeRoutedLoan.toLocaleString('en-IN')}).`
    };
  }

  // Construct Structured Warnings (Section 11)
  const warnings = [];

  if (hasCeilingMismatch) {
    warnings.push({
      id: 'warn-ceiling-mismatch',
      type: 'warning',
      title: 'Financing Capped at Maximum Loan Ceiling',
      message: `Calculated 90% financing of ₹${rawLoan.toLocaleString('en-IN')} exceeds the documented track ceiling of ₹${maxLoanCeiling.toLocaleString('en-IN')}. The indicative routed loan is capped at ₹${indicativeRoutedLoan.toLocaleString('en-IN')}. This cap does not guarantee actual sanction.`
    });
  }

  if (isAbove50L) {
    warnings.push({
      id: 'warn-above-50l',
      type: 'danger',
      title: 'Project Cost Exceeds Stated Prototype Scope',
      message: 'The calculated project cost of ₹' + projectCost.toLocaleString('en-IN') + ' exceeds the ₹50 Lakh boundary documented for the SIH 26091 prototype framework. Such capital investments fall outside standard rural micro-finance rules and require institutional commercial consortium appraisal.'
    });
  }

  if (!params.businessIdea || params.businessIdea.trim().length < 5) {
    warnings.push({
      id: 'warn-sparse-idea',
      type: 'info',
      title: 'General Project Profile',
      message: 'A concise business proposal was provided. Preparing a detailed project blueprint with verified machinery quotes improves evaluation clarity before formal bank submission.'
    });
  }

  warnings.push({
    id: 'warn-prototype-guidance',
    type: 'neutral',
    title: 'Prototype Decision Support Only',
    message: 'This module provides indicative track identification based on SIH 26091 challenge criteria. It does NOT constitute a loan sanction, official eligibility certification, or government approval.'
  });

  warnings.push({
    id: 'warn-official-verification',
    type: 'neutral',
    title: 'Mandatory Field Verification',
    message: 'Actual loan sanctions, interest subsidies, and collateral exemptions are governed by circulars issued by RBI, Ministry of MSME, and individual financing institutions.'
  });

  // Scheme Route Explanation Data (Section 7)
  const explanation = {
    availableMargin: marginCapital,
    calculatedProjectCost: projectCost,
    calculated90Loan: rawLoan,
    statedLoanCeiling: maxLoanCeiling,
    indicativeRoutedLoan,
    projectCostBoundary: boundaryLabel,
    prototypeRoute: routeTrack,
    ruleCode,
    reason: routeReason,
    hasCeilingMismatch,
    isAbove50L
  };

  // Structured Financing Summary (Section 8)
  const financingSummary = {
    availableMarginCapital: marginCapital,
    calculatedProjectCost: projectCost,
    calculated90Loan: rawLoan,
    statedLoanCeiling: maxLoanCeiling,
    indicativeRoutedLoan,
    financingTrack: routeTrack,
    status: routeStatus,
    interestRateDisplay: `${interestRate.toFixed(1)}% p.a.`,
    interestRate,
    tenureDisplay: `${tenureYears} Years (${tenureMonths} Months)`,
    tenureYears,
    tenureMonths,
    moratoriumDisplay: `${moratoriumMonths} Months`,
    moratoriumMonths,
    equityContributionPct: 10,
    debtFinancingPct: 90
  };

  // 4-Tier Transparency Taxonomy (Section 14)
  const taxonomy = {
    userInput: [
      { label: 'Available Margin Capital', value: `₹${marginCapital.toLocaleString('en-IN')}`, source: 'Entrepreneur Intake (Step 1)' },
      { label: 'Business Sector', value: params.sectorName || params.sectorId || 'Rural Micro Enterprise', source: 'Entrepreneur Intake (Step 1)' },
      { label: 'Operational Location', value: params.locationDisplay || 'District Cluster', source: 'Entrepreneur Intake (Step 1)' }
    ],
    sihParameters: [
      { label: 'Track Boundary', value: boundaryLabel, source: 'SIH 26091 Challenge Specification' },
      { label: 'Financing Ratio', value: '90% Debt / 10% Equity', source: 'SIH 26091 Challenge Specification' },
      { label: 'Maximum Loan Ceiling', value: `₹${maxLoanCeiling.toLocaleString('en-IN')}`, source: 'SIH 26091 Challenge Specification' },
      { label: 'Prescribed Interest Rate', value: `${interestRate.toFixed(1)}% p.a.`, source: 'SIH 26091 Challenge Specification' },
      { label: 'Prescribed Tenure & Moratorium', value: `${tenureYears} Yrs (${tenureMonths} Mos) / ${moratoriumMonths} Mos Moratorium`, source: 'SIH 26091 Challenge Specification' }
    ],
    calculatedEstimates: [
      { label: 'Calculated Project Cost', value: `₹${projectCost.toLocaleString('en-IN')}`, formula: 'Margin Capital / 0.10' },
      { label: 'Calculated 90% Debt', value: `₹${rawLoan.toLocaleString('en-IN')}`, formula: 'Project Cost × 0.90' },
      { label: 'Indicative Routed Loan', value: `₹${indicativeRoutedLoan.toLocaleString('en-IN')}`, formula: 'min(Calculated 90% Debt, Stated Ceiling)' }
    ],
    prototypeAssumptions: [
      { label: 'Routing Mechanism', value: 'Deterministic SIH 26091 Rule Match', note: 'Routes to Micro Finance or Term Loan strictly based on project cost boundaries.' },
      { label: 'Confidence Score', value: 'Prototype Rule Match (100% Deterministic)', note: 'No stochastic AI scoring or machine-learning predictions.' },
      { label: 'Status Classification', value: routeStatus, note: 'Indicative prototype track identification — requires official lender verification.' }
    ]
  };

  return {
    route: {
      track: routeTrack,
      status: routeStatus,
      reason: routeReason,
      confidence: 'Prototype Rule Match',
      ruleCode
    },
    parameters: {
      projectCostRange: boundaryLabel,
      financingPercentage: 90,
      maximumLoan: maxLoanCeiling,
      interestRate,
      tenureMonths,
      tenureYears,
      moratoriumMonths
    },
    financingSummary,
    explanation,
    ceilingMismatch: ceilingMismatchDetails,
    warnings,
    verificationChecklist: VERIFICATION_CHECKLIST_ITEMS,
    documentChecklist: DOCUMENT_CHECKLIST_CATEGORIES,
    taxonomy,
    officialDisclaimer: 'UdyamSetu AI provides prototype decision support based on the SIH 26091 problem-statement framework. It does not determine government eligibility or loan approval. Final scheme eligibility, financing terms, documentation and sanction are subject to current official rules and lender/authority appraisal.'
  };
}
