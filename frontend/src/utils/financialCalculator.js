/**
 * UdyamSetu AI — Financial Planning & Structuring Engine
 * Implements deterministic financial modeling adhering strictly to the SIH 26091 framework.
 *
 * SIH 26091 Framework:
 * 1. Project Cost = Margin Capital / 0.10
 * 2. Loan = Project Cost * 0.90
 * 3. Micro Finance Track:
 *    - Project Cost <= 1.40 Lakh (140,000)
 *    - Maximum Loan: 1.25 Lakh (125,000)
 *    - Interest Rate: 6.5% p.a.
 *    - Tenure: 3 Years (36 Months)
 *    - Moratorium: 3 Months
 * 4. Term Loan Track:
 *    - Project Cost > 1.40 Lakh and <= 50 Lakh (5,000,000)
 *    - Maximum Loan: 45 Lakh (4,500,000)
 *    - Interest Rate: 8.0% p.a.
 *    - Tenure: 7 Years (84 Months)
 *    - Moratorium: 6 Months
 * 5. Beyond 50 Lakh:
 *    - Stated prototype framework does not cover project costs > 50 Lakh. Flagged explicitly.
 */

/**
 * Centralized Prototype Financial Assumptions
 * Explicitly separated from SIH 26091 statutory parameters.
 * These are synthetic/demo archetype heuristics that must be replaced
 * with validated sector and local operating assumptions in production.
 */
export const PROTOTYPE_FINANCIAL_ASSUMPTIONS = {
  assetTurnover: {
    microFinance: 1.6, // Synthetic annual revenue / project cost ratio for micro units
    termLoan: 1.35     // Synthetic annual revenue / project cost ratio for equipment units
  },
  ebitdaOperatingMargin: {
    microFinance: 0.28, // 28% synthetic operating surplus before debt service
    termLoan: 0.25      // 25% synthetic operating surplus before debt service
  },
  revenueRampMultiplier: {
    year1: 1.0,        // Base stabilization year
    year2: 1.15,       // +15% post-stabilization utilization
    year3Plus: 1.25    // +25% mature operational capacity
  },
  dscrBenchmarks: {
    strong: 1.5,       // > 1.50: Strong coverage
    moderate: 1.2,     // 1.20 - 1.49: Moderate coverage
    tight: 1.0         // 1.00 - 1.19: Tight coverage
  },
  sensitivityFactors: {
    conservative: 0.8, // -20% revenue stress scenario
    base: 1.0,         // Base illustrative scenario
    optimistic: 1.2    // +20% revenue upside scenario
  }
};

export function calculateFinancialPlan({ marginCapital, sectorId = 'dairy-processing' }) {
  const margin = Number(marginCapital);
  if (!marginCapital || isNaN(margin) || margin <= 0) {
    throw new Error("Valid margin capital is required to generate the financial plan.");
  }

  // SIH Core Sizing Formula
  const projectCost = Math.round(margin / 0.10);
  const rawLoan = Math.round(projectCost * 0.90);

  const isExceedingMaxCost = projectCost > 5000000;
  const isMicroFinance = projectCost <= 140000;

  let track = '';
  let annualRate = 0.08;
  let tenureYears = 7;
  let tenureMonths = 84;
  let moratoriumMonths = 6;
  let maxLoanCeiling = 4500000;

  if (isExceedingMaxCost) {
    track = 'Beyond Prototype Ceiling (> ₹50L)';
    annualRate = 0.08;
    tenureYears = 7;
    tenureMonths = 84;
    moratoriumMonths = 6;
    maxLoanCeiling = 4500000;
  } else if (isMicroFinance) {
    track = 'Micro Finance Track';
    annualRate = 0.065; // 6.5%
    tenureYears = 3;
    tenureMonths = 36;
    moratoriumMonths = 3;
    maxLoanCeiling = 125000;
  } else {
    track = 'Term Loan Track';
    annualRate = 0.08; // 8.0%
    tenureYears = 7;
    tenureMonths = 84;
    moratoriumMonths = 6;
    maxLoanCeiling = 4500000;
  }

  const isExceedingCap = rawLoan > maxLoanCeiling;
  // Sized loan capped at maximum prototype scheme ceiling
  const loanAmount = Math.min(rawLoan, maxLoanCeiling);

  // Repayment period after moratorium
  const repaymentMonths = tenureMonths - moratoriumMonths;
  const monthlyRate = annualRate / 12.0;

  // Standard monthly EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
  let monthlyEmi = 0;
  if (loanAmount > 0 && repaymentMonths > 0 && monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, repaymentMonths);
    monthlyEmi = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
  }

  // Moratorium simple interest per month
  const monthlyMoratoriumInterest = Math.round(loanAmount * monthlyRate);
  const totalMoratoriumInterest = monthlyMoratoriumInterest * moratoriumMonths;

  // Construct Amortization Schedule
  let currentBalance = loanAmount;
  let totalInterest = 0;
  const monthlySchedule = [];
  const yearlySummaries = [];

  let currentYearInterest = 0;
  let currentYearPrincipal = 0;
  let currentYearEmi = 0;
  let yearOpeningBalance = currentBalance;

  for (let m = 1; m <= tenureMonths; m++) {
    const isMoratorium = m <= moratoriumMonths;
    let payment = 0;
    let interestPortion = 0;
    let principalPortion = 0;
    const startBal = currentBalance;

    if (isMoratorium) {
      // Prototype assumption: interest-only payment during moratorium
      payment = monthlyMoratoriumInterest;
      interestPortion = monthlyMoratoriumInterest;
      principalPortion = 0;
    } else {
      payment = monthlyEmi;
      interestPortion = Math.round(currentBalance * monthlyRate);
      principalPortion = payment - interestPortion;

      // Handle final month rounding
      if (m === tenureMonths || principalPortion > currentBalance) {
        principalPortion = currentBalance;
        payment = principalPortion + interestPortion;
      }
      currentBalance = Math.max(0, currentBalance - principalPortion);
    }

    totalInterest += interestPortion;
    currentYearInterest += interestPortion;
    currentYearPrincipal += principalPortion;
    currentYearEmi += payment;

    monthlySchedule.push({
      month: m,
      isMoratorium,
      phase: isMoratorium ? 'Moratorium' : 'Amortization',
      openingBalance: startBal,
      payment,
      interest: interestPortion,
      principal: principalPortion,
      closingBalance: currentBalance
    });

    if (m % 12 === 0 || m === tenureMonths) {
      const yearIndex = Math.ceil(m / 12);
      yearlySummaries.push({
        year: yearIndex,
        openingBalance: yearOpeningBalance,
        totalPayment: currentYearEmi,
        totalPrincipal: currentYearPrincipal,
        totalInterest: currentYearInterest,
        closingBalance: currentBalance
      });
      currentYearInterest = 0;
      currentYearPrincipal = 0;
      currentYearEmi = 0;
      yearOpeningBalance = currentBalance;
    }
  }

  const totalRepayment = loanAmount + totalInterest;

  // Cash Flow Projections (Prototype Heuristic)
  // Representative annual revenue baseline derived from project cost asset turnover
  const assetTurnover = isMicroFinance 
    ? PROTOTYPE_FINANCIAL_ASSUMPTIONS.assetTurnover.microFinance 
    : PROTOTYPE_FINANCIAL_ASSUMPTIONS.assetTurnover.termLoan;

  const baseAnnualRevenue = Math.round(projectCost * assetTurnover);

  const baseOperatingMargin = isMicroFinance 
    ? PROTOTYPE_FINANCIAL_ASSUMPTIONS.ebitdaOperatingMargin.microFinance 
    : PROTOTYPE_FINANCIAL_ASSUMPTIONS.ebitdaOperatingMargin.termLoan;

  const cashFlowYearly = [];
  const yearsToProject = tenureYears;

  for (let yr = 1; yr <= yearsToProject; yr++) {
    const growth = yr === 1 
      ? PROTOTYPE_FINANCIAL_ASSUMPTIONS.revenueRampMultiplier.year1 
      : (yr === 2 
          ? PROTOTYPE_FINANCIAL_ASSUMPTIONS.revenueRampMultiplier.year2 
          : PROTOTYPE_FINANCIAL_ASSUMPTIONS.revenueRampMultiplier.year3Plus);

    const revenue = Math.round(baseAnnualRevenue * growth);
    const operatingCost = Math.round(revenue * (1 - baseOperatingMargin));
    const operatingProfit = revenue - operatingCost;

    // Debt service from amortization schedule
    const yrSummary = yearlySummaries.find(y => y.year === yr);
    const debtService = yrSummary ? yrSummary.totalPayment : 0;
    const netCashFlow = operatingProfit - debtService;

    cashFlowYearly.push({
      year: yr,
      revenue,
      operatingCost,
      operatingProfit,
      debtService,
      netCashFlow
    });
  }

  // Debt Service Coverage Ratio (DSCR) for Year 1 & Year 2
  // DSCR = Operating Profit (Cash Available) / Annual Debt Service
  const yr1Cash = cashFlowYearly[0];
  const yr2Cash = cashFlowYearly[1] || yr1Cash;
  let dscrValue = 0;
  if (yr2Cash && yr2Cash.debtService > 0) {
    // Evaluating post-stabilization Year 2 when full regular EMI is active
    dscrValue = Number((yr2Cash.operatingProfit / yr2Cash.debtService).toFixed(2));
  } else if (yr1Cash && yr1Cash.debtService > 0) {
    dscrValue = Number((yr1Cash.operatingProfit / yr1Cash.debtService).toFixed(2));
  }

  let dscrInterpretation = 'Moderate coverage';
  let dscrBadgeColor = 'amber';

  const dscrLimits = PROTOTYPE_FINANCIAL_ASSUMPTIONS.dscrBenchmarks;
  if (dscrValue >= dscrLimits.strong) {
    dscrInterpretation = `Strong coverage (> ${dscrLimits.strong.toFixed(2)})`;
    dscrBadgeColor = 'emerald';
  } else if (dscrValue >= dscrLimits.moderate) {
    dscrInterpretation = `Moderate coverage (${dscrLimits.moderate.toFixed(2)} – ${(dscrLimits.strong - 0.01).toFixed(2)})`;
    dscrBadgeColor = 'amber';
  } else if (dscrValue >= dscrLimits.tight) {
    dscrInterpretation = `Tight coverage (${dscrLimits.tight.toFixed(2)} – ${(dscrLimits.moderate - 0.01).toFixed(2)})`;
    dscrBadgeColor = 'orange';
  } else if (dscrValue > 0) {
    dscrInterpretation = `Insufficient illustrative coverage (< ${dscrLimits.tight.toFixed(2)})`;
    dscrBadgeColor = 'rose';
  } else {
    dscrInterpretation = 'Calculation requires additional assumptions';
    dscrBadgeColor = 'stone';
  }

  // Financial Sensitivity Scenarios: 80%, 100%, 120%
  const sensFactors = PROTOTYPE_FINANCIAL_ASSUMPTIONS.sensitivityFactors;
  const sensitivityScenarios = [
    {
      label: 'Conservative (-20% Revenue)',
      revenueFactor: sensFactors.conservative,
      revenue: Math.round(baseAnnualRevenue * sensFactors.conservative),
      dscr: Number((dscrValue * 0.75).toFixed(2)),
      status: (dscrValue * 0.75) >= dscrLimits.moderate ? 'Viable' : 'Vulnerable'
    },
    {
      label: 'Base Plan (100% Illustrative)',
      revenueFactor: sensFactors.base,
      revenue: baseAnnualRevenue,
      dscr: dscrValue,
      status: dscrValue >= dscrLimits.moderate ? 'Viable' : 'Tight'
    },
    {
      label: 'Optimistic (+20% Revenue)',
      revenueFactor: sensFactors.optimistic,
      revenue: Math.round(baseAnnualRevenue * sensFactors.optimistic),
      dscr: Number((dscrValue * 1.25).toFixed(2)),
      status: 'Strong'
    }
  ];

  // Financial Risks List (Low, Moderate, High)
  const risks = [
    {
      category: 'Capital Exposure',
      risk: 'High Debt Dependency',
      severity: isExceedingCap ? 'High' : 'Moderate',
      impact: 'A 90% debt structure leaves minimal equity buffer if cash flows are delayed by seasonal demand slumps.',
      mitigation: 'Earmark 15% of margin capital as an emergency working capital reserve before capital expenditure.'
    },
    {
      category: 'Debt Service',
      risk: 'Monthly EMI Repayment Burden',
      severity: dscrValue < 1.3 ? 'High' : 'Moderate',
      impact: 'Fixed monthly debt service obligation commences after the moratorium regardless of sales collections.',
      mitigation: 'Establish weekly revenue set-aside accounts to accumulate monthly installment obligations in advance.'
    },
    {
      category: 'Working Capital',
      risk: 'Informal Trade Credit Receivables',
      severity: 'Moderate',
      impact: 'Delays in customer payments from local rural shopkeepers can constrain immediate cash to service EMI.',
      mitigation: 'Negotiate 15-day supplier credit terms and enforce strict 7-day credit limits for village buyers.'
    },
    {
      category: 'Interest Rate',
      risk: 'Floating Rate Volatility',
      severity: 'Low',
      impact: 'Prototype framework models fixed SIH rates; actual commercial bank loans may carry floating benchmark terms.',
      mitigation: 'Apply under priority government subvention schemes (PMEGP/Mudra) with capped interest corridors.'
    },
    {
      category: 'Cash Flow Timing',
      risk: 'Post-Moratorium Cliff',
      severity: 'Moderate',
      impact: 'Transition from moratorium interest to full principal amortization increases monthly outflow.',
      mitigation: 'Utilize the moratorium window to establish full commercial capacity and build a 2-month EMI reserve.'
    }
  ];

  // Financial Recommendations
  const recommendations = [
    {
      title: 'Maintain 60-Day Working Capital Reserve',
      detail: 'Do not allocate 100% of your equity into fixed machinery. Keep at least ₹25,000–₹50,000 unencumbered for day-to-day operations and unforeseen raw material price surges.'
    },
    {
      title: 'Obtain Multiple Written Vendor Quotations',
      detail: 'Banks require 2–3 pro-forma tax invoices from certified manufacturers before disbursing equipment term loans.'
    },
    {
      title: 'Verify Official Scheme Eligibility First',
      detail: 'Confirm specific demographic, caste, or regional subsidy criteria under PMEGP or MUDRA with your district Lead District Manager (LDM) or DIC.'
    },
    {
      title: 'Differentiate Sanction from Eligibility',
      detail: 'Stated eligibility of 90% financing is a statutory ceiling. Commercial lenders evaluate local collateral, credit score (CIBIL), and interview appraisals before sanctioning.'
    },
    {
      title: 'Match Borrowing to Validated Demand',
      detail: 'If initial customer orders are modest, consider drawing down a smaller first tranche rather than borrowing the maximum ceiling immediately.'
    },
    {
      title: 'Plan Strict Cash Collection Cycles',
      detail: 'In rural markets, avoid informal long-duration customer credit books that deplete bank account balances needed for monthly debt service.'
    }
  ];

  return {
    financing: {
      marginCapital: margin,
      projectCost,
      loanAmount,
      rawLoanAmount: rawLoan,
      track,
      isMicroFinance,
      isExceedingCap,
      isExceedingMaxCost,
      annualRate: annualRate * 100,
      interestRateDisplay: `${(annualRate * 100).toFixed(1)}% p.a.`,
      tenureYears,
      tenureMonths,
      moratoriumMonths,
      repaymentMonths,
      maxLoanCeiling
    },
    emi: {
      monthlyEmi,
      monthlyMoratoriumInterest,
      totalMoratoriumInterest,
      totalInterest,
      totalRepayment
    },
    repayment: {
      monthlySchedule,
      yearlySummaries
    },
    cashFlow: {
      yearly: cashFlowYearly,
      baseAnnualRevenue,
      assetTurnover
    },
    dscr: {
      value: dscrValue,
      interpretation: dscrInterpretation,
      badgeColor: dscrBadgeColor
    },
    sensitivity: {
      scenarios: sensitivityScenarios
    },
    risks,
    recommendations,
    assumptions: {
      equityRatio: '10% Entrepreneur Margin',
      debtRatio: '90% Indicative Financing',
      moratoriumTreatment: 'Simple monthly interest serviced during moratorium without principal reduction',
      depreciationRate: '10% Straight Line Method on Equipment',
      disclaimer: 'Prototype financial structure based on SIH 26091 problem statement assumptions. Final eligibility, financing terms, interest rates and sanction conditions must be verified against current official rules.'
    },
    prototypeAssumptions: PROTOTYPE_FINANCIAL_ASSUMPTIONS
  };
}
