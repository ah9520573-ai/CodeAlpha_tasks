import { useState, useEffect } from 'react'
import {
  performCalculation,
  isValidNumberInput,
  isDecimalPoint,
  isOperator,
  formatDisplay,
  isError
} from './utils/calculatorUtils'

export default function App() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [currentValue, setCurrentValue] = useState('0')
  const [operator, setOperator] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key

      // Number keys (0-9)
      if (isValidNumberInput(key)) {
        e.preventDefault()
        handleNumberClick(key)
      }

      // Decimal point
      if (isDecimalPoint(key)) {
        e.preventDefault()
        handleDecimalClick()
      }

      // Operators
      if (key === '+' || key === '-') {
        e.preventDefault()
        handleOperatorClick(key)
      }

      if (key === '*') {
        e.preventDefault()
        handleOperatorClick('×')
      }

      if (key === '/') {
        e.preventDefault()
        handleOperatorClick('÷')
      }

      // Equals
      if (key === 'Enter') {
        e.preventDefault()
        handleEquals()
      }

      // Clear
      if (key === 'Escape') {
        e.preventDefault()
        handleClear()
      }

      // Backspace (delete last digit)
      if (key === 'Backspace') {
        e.preventDefault()
        handleBackspace()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [display, prevValue, currentValue, operator, waitingForNewValue])

  const handleNumberClick = (num) => {
    // If there's an error, clear it first
    if (isError(display)) {
      setDisplay(num)
      setCurrentValue(num)
      setWaitingForNewValue(false)
      return
    }

    // If waiting for new value (after operator), start fresh
    if (waitingForNewValue) {
      setDisplay(num)
      setCurrentValue(num)
      setWaitingForNewValue(false)
      return
    }

    // Prevent leading zeros
    if (currentValue === '0' && num === '0') {
      return
    }

    // Replace single zero or append
    const newValue = currentValue === '0' ? num : currentValue + num
    setCurrentValue(newValue)
    setDisplay(formatDisplay(newValue))
  }

  const handleDecimalClick = () => {
    // If there's an error, clear it first
    if (isError(display)) {
      setDisplay('0.')
      setCurrentValue('0.')
      setWaitingForNewValue(false)
      return
    }

    // If waiting for new value, start with 0.
    if (waitingForNewValue) {
      setDisplay('0.')
      setCurrentValue('0.')
      setWaitingForNewValue(false)
      return
    }

    // Prevent multiple decimal points
    if (currentValue.includes('.')) {
      return
    }

    const newValue = currentValue + '.'
    setCurrentValue(newValue)
    setDisplay(formatDisplay(newValue))
  }

  const handleOperatorClick = (op) => {
    // If there's an error, clear it first
    if (isError(display)) {
      handleClear()
      return
    }

    const inputValue = parseFloat(currentValue)

    // If we already have an operator, calculate the result first
    if (operator && !waitingForNewValue && prevValue !== null) {
      const result = performCalculation(prevValue, currentValue, operator)
      setDisplay(formatDisplay(result))
      setPrevValue(String(result))
      setCurrentValue(String(result))
    } else {
      // Store current value and prepare for next number
      setPrevValue(currentValue)
    }

    setOperator(op)
    setWaitingForNewValue(true)
  }

  const handleEquals = () => {
    if (!operator || prevValue === null || waitingForNewValue) {
      return
    }

    const result = performCalculation(prevValue, currentValue, operator)

    if (isError(result)) {
      setDisplay(result)
      setCurrentValue('0')
      setPrevValue(null)
      setOperator(null)
      setWaitingForNewValue(false)
      return
    }

    setDisplay(formatDisplay(result))
    setCurrentValue(String(result))
    setPrevValue(null)
    setOperator(null)
    setWaitingForNewValue(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setCurrentValue('0')
    setPrevValue(null)
    setOperator(null)
    setWaitingForNewValue(false)
  }

  const handleBackspace = () => {
    // Can't backspace if error is showing
    if (isError(display)) {
      handleClear()
      return
    }

    if (waitingForNewValue) {
      return
    }

    if (currentValue.length === 1) {
      setDisplay('0')
      setCurrentValue('0')
    } else {
      const newValue = currentValue.slice(0, -1)
      setCurrentValue(newValue)
      setDisplay(formatDisplay(newValue))
    }
  }

  // Track calculation history for display
  const [history, setHistory] = useState('')

  // Update history when operator is clicked
  const handleOperatorClickWithHistory = (op) => {
    if (!operator && currentValue !== '0') {
      setHistory(`${currentValue}${op}`)
    } else if (operator && !waitingForNewValue && prevValue !== null) {
      const result = performCalculation(prevValue, currentValue, operator)
      setHistory(`${result}${op}`)
    }
    handleOperatorClick(op)
  }

  const handleEqualsWithHistory = () => {
    if (operator && prevValue !== null && !waitingForNewValue) {
      const result = performCalculation(prevValue, currentValue, operator)
      setHistory('')
    }
    handleEquals()
  }

  const handleClearWithHistory = () => {
    setHistory('')
    handleClear()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calculator</h1>
      </header>

      <main className="app-main">
        <div className="calculator-container">
          <div className="calculator">
            {/* Display Screen */}
            <div className={`display ${isError(display) ? 'error' : ''}`}>
              <div className="display-history">{history}</div>
              <div className="display-value">{display}</div>
            </div>

            {/* Button Grid - Modern Layout */}
            <div className="button-grid">
              {/* Row 1: Reset, AC, %, = */}
              <button
                className="btn btn-function"
                onClick={handleClearWithHistory}
                title="Reset"
              >
                ↺
              </button>
              <button
                className="btn btn-clear"
                onClick={handleClearWithHistory}
                title="Clear (Esc)"
              >
                AC
              </button>
              <button
                className="btn btn-function"
                title="Percentage"
              >
                %
              </button>
              <button
                className="btn btn-operator"
                onClick={() => handleEqualsWithHistory()}
                title="Equals (Enter)"
              >
                =
              </button>

              {/* Row 2: 7, 8, 9, ÷ */}
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('7')}
              >
                7
              </button>
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('8')}
              >
                8
              </button>
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('9')}
              >
                9
              </button>
              <button
                className={`btn btn-operator ${operator === '÷' ? 'active' : ''}`}
                onClick={() => handleOperatorClickWithHistory('÷')}
                title="Divide"
              >
                ÷
              </button>

              {/* Row 3: 4, 5, 6, × */}
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('4')}
              >
                4
              </button>
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('5')}
              >
                5
              </button>
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('6')}
              >
                6
              </button>
              <button
                className={`btn btn-operator ${operator === '×' ? 'active' : ''}`}
                onClick={() => handleOperatorClickWithHistory('×')}
                title="Multiply"
              >
                ×
              </button>

              {/* Row 4: 1, 2, 3, − */}
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('1')}
              >
                1
              </button>
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('2')}
              >
                2
              </button>
              <button
                className="btn btn-number"
                onClick={() => handleNumberClick('3')}
              >
                3
              </button>
              <button
                className={`btn btn-operator ${operator === '-' ? 'active' : ''}`}
                onClick={() => handleOperatorClickWithHistory('-')}
                title="Subtract"
              >
                −
              </button>

              {/* Row 5: ±, 0, ., + */}
              <button
                className="btn btn-function"
                title="Toggle sign"
              >
                ±/
              </button>
              <button
                className="btn btn-number btn-zero"
                onClick={() => handleNumberClick('0')}
              >
                0
              </button>
              <button
                className="btn btn-number"
                onClick={() => handleDecimalClick()}
                title="Decimal"
              >
                .
              </button>
              <button
                className={`btn btn-operator ${operator === '+' ? 'active' : ''}`}
                onClick={() => handleOperatorClickWithHistory('+')}
                title="Add"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
