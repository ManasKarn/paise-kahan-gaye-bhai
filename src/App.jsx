import { useState } from 'react'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const addTransaction = (e) => {
    e.preventDefault()
    if (!title.trim() || !amount || Number(amount) <= 0) return

    setTransactions([
      { id: Date.now(), title, amount: Number(amount), type },
      ...transactions
    ])
    setTitle('')
    setAmount('')
  }

  return (
    <div className="app">
      <header>
        <h1>💰 Paise Kahan Gaye Bhai?</h1>
        <p>Apne paiso ka poora hisaab rakho!</p>
      </header>

      <main>
        <div className="cards">
          <div className="card">
            <p>Total Income</p>
            <h2>₹{income.toLocaleString('en-IN')}</h2>
          </div>
          <div className="card">
            <p>Total Expense</p>
            <h2>₹{expense.toLocaleString('en-IN')}</h2>
          </div>
          <div className="card balance">
            <p>Available Balance</p>
            <h2>₹{(income - expense).toLocaleString('en-IN')}</h2>
          </div>
        </div>

        <section className="panel">
          <h2>➕ Add Transaction</h2>
          <form onSubmit={addTransaction}>
            <input
              placeholder="Transaction ka naam"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <input
              type="number"
              min="0.01"
              placeholder="Amount (₹)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <button type="submit">Add Transaction</button>
          </form>
        </section>

        <section className="panel">
          <h2>📋 Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="empty">Abhi koi transaction nahi hai.</p>
          ) : (
            transactions.map(t => (
              <div className="transaction" key={t.id}>
                <span>{t.title}</span>
                <strong className={t.type}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                </strong>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default App