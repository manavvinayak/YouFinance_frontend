"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { formatCurrency } from "../utils/currency"
import { getAccounts, getTransactions } from "../services/api"
import AccountCard from "../components/AccountCard"
import TransactionItem from "../components/TransactionItem"
import AddTransactionForm from "../components/AddTransactionForm"
import AddAccountForm from "../components/AddAccountForm"
import { createTransaction } from "../services/api"
import { createAccount } from "../services/api"

const DashboardPage = () => {
  const { userCurrency } = useAuth()
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-4 md:p-8">
        {/* Modern Header with Welcome Message */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Welcome Back! 👋
              </h1>
              <p className="text-xl text-gray-600">Here's what's happening with your money today</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Modern Balance Cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Balance Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Balance</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalBalance, userCurrency)}</p>
                <div className="mt-4 flex items-center text-sm">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-green-600 font-medium">+2.5% from last month</span>
                </div>
              </div>
            </div>

            {/* Savings Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </div>
                  <span className="text-2xl">🏦</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Savings</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(savingsBalance, userCurrency)}</p>
                <div className="mt-4 flex items-center text-sm">
                  <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-blue-600 font-medium">Growing steady</span>
                </div>
              </div>
            </div>

            {/* Checking Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  </div>
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Checking</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(checkingBalance, userCurrency)}</p>
                <div className="mt-4 flex items-center text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 font-medium">Active spending</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => setShowAddTransactionForm(true)} 
              className="group relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-left"
            >
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Transaction</h3>
                <p className="text-gray-600">Record income, expenses, or transfers</p>
              </div>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Get started</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => setShowAddAccountForm(true)} 
              className="group relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-left"
            >
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Account</h3>
                <p className="text-gray-600">Create new checking, savings, or investment accounts</p>
              </div>
              <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Get started</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>
          </div>
        </section>

        {/* Enhanced Modals */}
        {showAddTransactionForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-gray-200">
              <AddTransactionForm onSubmit={handleAddTransaction} onCancel={() => setShowAddTransactionForm(false)} />
            </div>
          </div>
        )}

        {showAddAccountForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-gray-200">
              <AddAccountForm onSubmit={handleAddAccount} onCancel={() => setShowAddAccountForm(false)} />
            </div>
          </div>
        )}

        {/* Modern Recent Transactions */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <Link to="/transactions" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group">
              View all
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {transactions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <div key={transaction._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <TransactionItem
                      transaction={transaction}
                      onEdit={() => alert("Edit transaction functionality coming soon!")}
                      onDelete={() => alert("Delete transaction functionality coming soon!")}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <p className="text-gray-600">No transactions yet. Add your first transaction to get started!</p>
              </div>
            )}
          </div>
        </section>

        {/* Modern Your Accounts */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Accounts</h2>
            <Link to="/accounts" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group">
              Manage all
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <div key={account._id} className="transform hover:scale-105 transition-transform duration-200">
                  <AccountCard
                    account={account}
                    onEdit={() => alert("Edit account functionality coming soon!")}
                    onDelete={() => alert("Delete account functionality coming soon!")}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">No accounts yet. Create your first account to start tracking your money!</p>
                  <button 
                    onClick={() => setShowAddAccountForm(true)}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
