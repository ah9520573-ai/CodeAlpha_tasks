/**
 * Calculator utility functions
 * Pure functions for calculation logic - easy to test and reuse
 */

/**
 * Performs arithmetic calculation based on operator and two operands
 */
export const performCalculation = (prevValue, currentValue, operator) => {
  const prev = parseFloat(prevValue)
  const current = parseFloat(currentValue)

  if (isNaN(prev) || isNaN(current)) return '0'

  let result

  switch (operator) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '×':
      result = prev * current
      break
    case '÷':
      if (current === 0) {
        return 'Error: Division by 0'
      }
      result = prev / current
      break
    default:
      return currentValue
  }

  // Round to avoid floating point errors
  return Math.round(result * 100000000) / 100000000
}

/**
 * Validates if input should be accepted as a number
 */
export const isValidNumberInput = (input) => {
  return /^[0-9]$/.test(input)
}

/**
 * Validates if input is a decimal point
 */
export const isDecimalPoint = (input) => {
  return input === '.'
}

/**
 * Validates if input is an operator
 */
export const isOperator = (input) => {
  return ['+', '-', '×', '÷'].includes(input)
}

/**
 * Formats number for display (handles very long decimals)
 */
export const formatDisplay = (value) => {
  if (typeof value !== 'string') {
    value = String(value)
  }

  // If it's an error message, return as-is
  if (value.includes('Error')) {
    return value
  }

  // Parse and format
  const num = parseFloat(value)
  if (isNaN(num)) return value

  // If number is very large or very small, use scientific notation
  if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(8)
  }

  // Limit decimal places for display
  const str = num.toString()
  if (str.includes('.') && str.split('.')[1].length > 10) {
    return num.toFixed(10)
  }

  return str
}

/**
 * Checks if display value is an error
 */
export const isError = (value) => {
  return String(value).includes('Error')
}
