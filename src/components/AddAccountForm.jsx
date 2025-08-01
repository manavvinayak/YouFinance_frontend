"use client"

import { useState } from "react"

const AddAccountForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [name, setName] = useState(initialData.name || "")
  const [type, setType] = useState(initialData.type || "Checking")
  const [initialBalance, setInitialBalance] = useState(initialData.initialBalance || "")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!name || !type || initialBalance === "") {
      setError("Please fill all required fields.")
      return
    }
    onSubmit({
      name,
      type,
      initialBalance: Number.parseFloat(initialBalance),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h3 className="text-2xl font-semibold mb-6 text-primary">
        {initialData._id ? "Edit Account" : "Add New Account"}
      </h3>
      {error && <div className="bg-danger text-white p-3 rounded-md mb-4">{error}</div>}

      <div className="form-group">
        <input type="text" id="name" placeholder=" " value={name} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="name">Account Name</label>
      </div>

      <div className="form-group">
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="Investment">Investment</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="type">Account Type</label>
      </div>

      <div className="form-group">
        <input
          type="number"
          id="initialBalance"
          placeholder=" "
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          required
          step="0.01"
        />
        <label htmlFor="initialBalance">Initial Balance</label>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialData._id ? "Update Account" : "Add Account"}
        </button>
      </div>
    </form>
  )
}

export default AddAccountForm
