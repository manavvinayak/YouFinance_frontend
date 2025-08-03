/**
 * Currency utility functions for formatting amounts with proper symbols
 */

// Currency configuration with symbols and formatting
export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  INR: { symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' }
}

/**
 * Format amount with currency symbol
 * @param {number} amount - The amount to format
 * @param {string} currencyCode - Currency code (USD, INR, etc.)
 * @param {boolean} useLocale - Whether to use locale-specific formatting
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currencyCode = 'USD', useLocale = true) => {
  // Handle invalid inputs
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${CURRENCIES[currencyCode]?.symbol || '$'}0.00`
  }

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD
  
  if (useLocale) {
    try {
      // Use Intl.NumberFormat for locale-specific formatting
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)
    } catch (error) {
      // Fallback to simple formatting if locale is not supported
      console.warn(`Locale ${currency.locale} not supported, using simple formatting`)
    }
  }
  
  // Simple formatting fallback
  const formattedAmount = Math.abs(amount).toFixed(2)
  const sign = amount < 0 ? '-' : ''
  
  // Add thousand separators
  const parts = formattedAmount.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  
  return `${sign}${currency.symbol}${parts.join('.')}`
}

/**
 * Get currency symbol for a given currency code
 * @param {string} currencyCode - Currency code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currencyCode = 'USD') => {
  return CURRENCIES[currencyCode]?.symbol || '$'
}

/**
 * Get currency name for a given currency code
 * @param {string} currencyCode - Currency code
 * @returns {string} Currency name
 */
export const getCurrencyName = (currencyCode = 'USD') => {
  return CURRENCIES[currencyCode]?.name || 'US Dollar'
}

/**
 * Parse amount from currency string
 * @param {string} currencyString - Currency string like "$100.50"
 * @returns {number} Parsed amount
 */
export const parseCurrencyString = (currencyString) => {
  if (!currencyString) return 0
  
  // Remove currency symbols and parse
  const numberString = currencyString.replace(/[^\d.-]/g, '')
  return parseFloat(numberString) || 0
}
