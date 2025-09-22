import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperator = (op: string) => {
    const current = parseFloat(display)
    if (prevValue === null) {
      setPrevValue(current)
    } else if (operator) {
      const result = calculate(prevValue, current, operator)
      setPrevValue(result)
      setDisplay(String(result))
    }
    setOperator(op)
    setNewNumber(true)
  }

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
      default:
        return b
    }
  }

  const handleEquals = () => {
    if (prevValue === null || operator === null) return
    const current = parseFloat(display)
    const result = calculate(prevValue, current, operator)
    setDisplay(String(result))
    setPrevValue(null)
    setOperator(null)
    setNewNumber(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setNewNumber(true)
  }

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('/')}>/</button>
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('*')}>*</button>
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleNumber('0')}>0</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={() => handleOperator('+')}>+</button>
      </div>
    </div>
  )
}

export default App