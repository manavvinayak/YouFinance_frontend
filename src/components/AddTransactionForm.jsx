"use client"

import { useState, useEffect } from "react"
import { getAccounts } from "../services/api"

const AddTransactionForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [amount, setAmount] = useState(initialData?.amount || "")
  const [type, setType] = useState(initialData?.type || "Expense")
  const [category, setCategory] = useState(initialData?.category || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [date, setDate] = useState(
    initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
  )
  const [accountId, setAccountId] = useState(initialData?.account?._id || "")
  const [accounts, setAccounts] = useState([])
  const [error, setError] = useState("")

  const categories = {
    Expense: ["Food", "Transport", "Housing", "Utilities", "Entertainment", "Shopping", "Health", "Education", "Other"],
    Income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
    Transfer: ["Between Accounts"],
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const fetchedAccounts = await getAccounts()
        setAccounts(fetchedAccounts)
        if (!accountId && fetchedAccounts.length > 0) {
          setAccountId(fetchedAccounts[0]._id) // Set default account
        }
      } catch (err) {
        setError("Failed to load accounts.")
        console.error(err)
      }
    }
    fetchAccounts()
  }, [accountId])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!amount || !category || !accountId) {
      setError("Please fill all required fields.")
      return
    }
    onSubmit({
      amount: Number.parseFloat(amount),
      type,
      category,
      description,
      date,
      accountId,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h3 className="text-2xl font-semibold mb-6 text-primary">
        {initialData?._id ? "Edit Transaction" : "Add New Transaction"}
      </h3>
      {error && <div className="bg-danger text-white p-3 rounded-md mb-4">{error}</div>}

      <div className="form-group">
        <input
          type="number"
          id="amount"
          placeholder=" "
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          step="0.01"
        />
        <label htmlFor="amount">Amount</label>
      </div>

      <div className="form-group">
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
          <option value="Transfer">Transfer</option>
        </select>
        <label htmlFor="type">Type</label>
      </div>

      <div className="form-group">
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories[type]?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <label htmlFor="category">Category</label>
      </div>

      <div className="form-group">
        <input type="date" id="date" placeholder=" " value={date} onChange={(e) => setDate(e.target.value)} required />
        <label htmlFor="date">Date</label>
      </div>

      <div className="form-group">
        <select id="accountId" value={accountId} onChange={(e) => setAccountId(e.target.value)} required>
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.name} ({acc.type})
            </option>
          ))}
        </select>
        <label htmlFor="accountId">Account</label>
      </div>

      <div className="form-group">
        <textarea
          id="description"
          placeholder=" "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        ></textarea>
        <label htmlFor="description">Description (Optional)</label>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialData?._id ? "Update Transaction" : "Add Transaction"}
        </button>
      </div>
    </form>
  )
}

export default AddTransactionForm
