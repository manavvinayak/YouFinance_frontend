"use client"

import { useState, useEffect } from "react"
import { getAccounts, getTransactions } from "../services/api"
import AccountCard from "../components/AccountCard"
import TransactionItem from "../components/TransactionItem"
import AddTransactionForm from "../components/AddTransactionForm"
import AddAccountForm from "../components/AddAccountForm"
import { createTransaction } from "../services/api"
import { createAccount } from "../services/api"

const DashboardPage = () => {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false)
  const [showAddAccountForm, setShowAddAccountForm] = useState(false)

  const fetchDashboardData = async () => {
    setLoading(true)
    setError("")
    try {
      const fetchedAccounts = await getAccounts()
      setAccounts(fetchedAccounts)

      const fetchedTransactions = await getTransactions()
      setTransactions(fetchedTransactions.slice(0, 5)) // Show only 5 recent transactions
    } catch (err) {
      setError("Failed to load dashboard data.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleAddTransaction = async (transactionData) => {
    try {
      await createTransaction(transactionData)
      setShowAddTransactionForm(false)
      fetchDashboardData() // Refresh data
    } catch (err) {
      setError(err.message || "Failed to add transaction.")
    }
  }

  const handleAddAccount = async (accountData) => {
    try {
      await createAccount(accountData)
      setShowAddAccountForm(false)
      fetchDashboardData() // Refresh data
    } catch (err) {
      setError(err.message || "Failed to add account.")
    }
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0)
  const savingsBalance = accounts
    .filter((acc) => acc.type === "Savings")
    .reduce((sum, acc) => sum + acc.currentBalance, 0)
  const checkingBalance = accounts
    .filter((acc) => acc.type === "Checking")
    .reduce((sum, acc) => sum + acc.currentBalance, 0)

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading dashboard...</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text">Dashboard</h1>

      {error && <div className="bg-danger text-white p-3 rounded-md mb-4">{error}</div>}

      {/* Account Balance Cards */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Account Balances</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-primary text-white">
            <h3 className="text-xl font-semibold mb-2">Total Balance</h3>
            <p className="text-4xl font-bold">${totalBalance.toFixed(2)}</p>
          </div>
          <div className="card bg-secondary text-white">
            <h3 className="text-xl font-semibold mb-2">Savings</h3>
            <p className="text-4xl font-bold">${savingsBalance.toFixed(2)}</p>
          </div>
          <div className="card bg-accent text-white">
            <h3 className="text-xl font-semibold mb-2">Checking</h3>
            <p className="text-4xl font-bold">${checkingBalance.toFixed(2)}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setShowAddTransactionForm(true)} className="btn-primary">
            Add Transaction
          </button>
          <button onClick={() => setShowAddAccountForm(true)} className="btn-primary">
            Add Account
          </button>
        </div>
      </section>

      {/* Modals for Add Forms */}
      {showAddTransactionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <AddTransactionForm onSubmit={handleAddTransaction} onCancel={() => setShowAddTransactionForm(false)} />
          </div>
        </div>
      )}

      {showAddAccountForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <AddAccountForm onSubmit={handleAddAccount} onCancel={() => setShowAddAccountForm(false)} />
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Recent Transactions</h2>
        <div className="card">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
                onEdit={() => alert("Edit transaction functionality coming soon!")}
                onDelete={() => alert("Delete transaction functionality coming soon!")}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 py-4">No recent transactions.</p>
          )}
        </div>
      </section>

      {/* All Accounts (brief view) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Your Accounts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <AccountCard
                key={account._id}
                account={account}
                onEdit={() => alert("Edit account functionality coming soon!")}
                onDelete={() => alert("Delete account functionality coming soon!")}
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center py-4">
              No accounts added yet. Add one using "Quick Actions"!
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
