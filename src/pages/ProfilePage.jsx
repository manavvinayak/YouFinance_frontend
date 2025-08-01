"use client"

import { useState, useEffect } from "react"
import { getUserProfile, updateUserProfile, updateUserBudgets, updateUserAlerts } from "../services/api"

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currency, setCurrency] = useState("")
  const [budgets, setBudgets] = useState([]) // [{ category: 'Food', amount: 500 }]
  const [newBudgetCategory, setNewBudgetCategory] = useState("")
  const [newBudgetAmount, setNewBudgetAmount] = useState("")
  const [alertThreshold, setAlertThreshold] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError("")
      try {
        const profile = await getUserProfile()
        setUserProfile(profile)
        setName(profile.name)
        setEmail(profile.email)
        setCurrency(profile.currency)
        setBudgets(profile.budgets || [])
        setAlertThreshold(profile.alertThresholds || "")
      } catch (err) {
        setError("Failed to load profile.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    try {
      const updatedProfile = await updateUserProfile({ name, email, currency })
      setUserProfile(updatedProfile)
      setSuccessMessage("Profile updated successfully!")
    } catch (err) {
      setError(err.message || "Failed to update profile.")
    }
  }

  const handleAddBudget = async () => {
    setError("")
    setSuccessMessage("")
    if (!newBudgetCategory || !newBudgetAmount) {
      setError("Please enter both category and amount for budget.")
      return
    }
    const updatedBudgets = [
      ...budgets,
      { category: newBudgetCategory, amount: Number.parseFloat(newBudgetAmount), spent: 0 },
    ]
    try {
      await updateUserBudgets(updatedBudgets)
      setBudgets(updatedBudgets)
      setNewBudgetCategory("")
      setNewBudgetAmount("")
      setSuccessMessage("Budget added successfully!")
    } catch (err) {
      setError(err.message || "Failed to add budget.")
    }
  }

  const handleDeleteBudget = async (categoryToDelete) => {
    setError("")
    setSuccessMessage("")
    const updatedBudgets = budgets.filter((b) => b.category !== categoryToDelete)
    try {
      await updateUserBudgets(updatedBudgets)
      setBudgets(updatedBudgets)
      setSuccessMessage("Budget deleted successfully!")
    } catch (err) {
      setError(err.message || "Failed to delete budget.")
    }
  }

  const handleAlertThresholdUpdate = async () => {
    setError("")
    setSuccessMessage("")
    try {
      await updateUserAlerts(Number.parseFloat(alertThreshold))
      setSuccessMessage("Alert threshold updated successfully!")
    } catch (err) {
      setError(err.message || "Failed to update alert threshold.")
    }
  }

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading profile...</div>
  }

  if (!userProfile) {
    return <div className="container mx-auto p-4 text-center text-danger">Error: Profile not found.</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text">Profile & Settings</h1>

      {error && <div className="bg-danger text-white p-3 rounded-md mb-4">{error}</div>}
      {successMessage && <div className="bg-success text-white p-3 rounded-md mb-4">{successMessage}</div>}

      {/* Edit User Profile */}
      <section className="card mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Edit Profile</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} required>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              {/* Add more currencies as needed */}
            </select>
            <label htmlFor="currency">Currency</label>
          </div>
          <button type="submit" className="btn-primary">
            Update Profile
          </button>
        </form>
      </section>

      {/* Monthly Budgets */}
      <section className="card mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Monthly Budgets</h2>
        <div className="mb-4">
          {budgets.length > 0 ? (
            budgets.map((budget, index) => (
              <div key={index} className="flex items-center justify-between mb-2 p-3 bg-gray-50 rounded-md">
                <div>
                  <span className="font-medium">{budget.category}:</span> ${budget.amount.toFixed(2)}
                  {/* Progress bar placeholder */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${Math.min(100, (budget.spent / budget.amount) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">Spent: ${budget.spent.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleDeleteBudget(budget.category)}
                  className="text-danger text-sm hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No budgets set yet.</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="form-group flex-1 mb-0">
            <input
              type="text"
              id="newBudgetCategory"
              placeholder=" "
              value={newBudgetCategory}
              onChange={(e) => setNewBudgetCategory(e.target.value)}
            />
            <label htmlFor="newBudgetCategory">Category</label>
          </div>
          <div className="form-group flex-1 mb-0">
            <input
              type="number"
              id="newBudgetAmount"
              placeholder=" "
              value={newBudgetAmount}
              onChange={(e) => setNewBudgetAmount(e.target.value)}
              step="0.01"
            />
            <label htmlFor="newBudgetAmount">Amount</label>
          </div>
          <button onClick={handleAddBudget} className="btn-primary sm:w-auto">
            Add Budget
          </button>
        </div>
      </section>

      {/* Alert Thresholds */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Alert Thresholds</h2>
        <p className="mb-4 text-gray-700">
          Receive in-app notifications if your spending exceeds this amount in a month.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="form-group flex-1 mb-0">
            <input
              type="number"
              id="alertThreshold"
              placeholder=" "
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(e.target.value)}
              step="0.01"
            />
            <label htmlFor="alertThreshold">Monthly Spending Alert ($)</label>
          </div>
          <button onClick={handleAlertThresholdUpdate} className="btn-primary sm:w-auto">
            Set Threshold
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
