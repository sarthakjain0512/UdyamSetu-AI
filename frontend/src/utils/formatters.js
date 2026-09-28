/**
 * Format raw numbers into Indian Currency format (₹ Lakhs / ₹ Crores or ₹ Direct)
 */
export function formatCurrencyINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(val) {
  if (val === null || val === undefined) return '0%';
  return `${Number(val).toFixed(1)}%`;
}

export const formatCurrency = formatCurrencyINR;
