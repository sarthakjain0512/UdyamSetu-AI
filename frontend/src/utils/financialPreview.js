/**
 * UdyamSetu AI — Financial Preview Utility
 * Implements deterministic UI preview calculations based on SIH 26091 guidelines:
 * Project Cost = Margin Capital / 0.10
 * Loan Amount  = Project Cost * 0.90
 *
 * NOTE: This is an isolated UI preview calculation for the intake workflow.
 * Core backend computations remain in backend/app/engines/financial_engine.py.
 */

export function computeFinancialPreview(marginCapital) {
  const margin = Number(marginCapital) || 0;
  if (margin <= 0) {
    return {
      marginCapital: 0,
      estimatedProjectCost: 0,
      estimatedLoanAmount: 0,
      track: 'Not Applicable',
      interestRate: 'N/A',
      tenure: 'N/A',
      moratorium: 'N/A',
      maxLoanCeiling: 0,
      isExceedingCap: false,
      disclaimer: 'Enter your available margin capital to compute projected financing structure.'
    };
  }

  // SIH 26091 standard formula: 10% entrepreneur equity, 90% debt
  const projectCost = Math.round(margin / 0.10);
  const rawLoan = Math.round(projectCost * 0.90);

  // SIH 26091 financing tracks
  const isMicroFinance = projectCost <= 140000;

  if (isMicroFinance) {
    const maxLoan = 125000;
    const loanAmount = Math.min(rawLoan, maxLoan);
    return {
      marginCapital: margin,
      estimatedProjectCost: projectCost,
      estimatedLoanAmount: loanAmount,
      rawLoanAmount: rawLoan,
      track: 'Micro Finance Track',
      interestRate: '6.5% p.a.',
      tenure: '3 Years (36 Months)',
      moratorium: '3 Months Moratorium',
      maxLoanCeiling: maxLoan,
      isExceedingCap: rawLoan > maxLoan,
      disclaimer: 'Micro Finance guideline (up to ₹1.40L project cost, max loan ₹1.25L at 6.5% p.a. with 3-month moratorium).'
    };
  } else {
    const maxLoan = 4500000; // ₹45 Lakh
    const loanAmount = Math.min(rawLoan, maxLoan);
    return {
      marginCapital: margin,
      estimatedProjectCost: projectCost,
      estimatedLoanAmount: loanAmount,
      rawLoanAmount: rawLoan,
      track: 'Term Loan Track',
      interestRate: '8.0% p.a.',
      tenure: '7 Years (84 Months)',
      moratorium: '6 Months Moratorium',
      maxLoanCeiling: maxLoan,
      isExceedingCap: rawLoan > maxLoan,
      disclaimer: 'Term Loan guideline (₹1.40L to ₹50L project cost, max loan ₹45L at 8.0% p.a. with 6-month moratorium).'
    };
  }
}
