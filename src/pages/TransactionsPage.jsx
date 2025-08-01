"use client"

import { useState, useEffect } from "react"
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getAccounts } from "../services/api"
import TransactionItem from "../components/TransactionItem"
import AddTransactionForm from "../components/AddTransactionForm"

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  // Filter states
  const [filterAccount, setFilterAccount] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")

  const fetchTransactionsAndAccounts = async (filters = {}) => {
    setLoading(true)
    setError("")
    try {
      const fetchedTransactions = await getTransactions(filters)
      setTransactions(fetchedTransactions)

      const fetchedAccounts = await getAccounts()
      setAccounts(fetchedAccounts)
    } catch (err) {
      setError("Failed to load data.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactionsAndAccounts()
  }, [])

  const handleApplyFilters = () => {
    const filters = {
      accountId: filterAccount,
      category: filterCategory,
      startDate: filterStartDate,
      endDate: filterEndDate,
    }
    fetchTransactionsAndAccounts(filters)
  }

  const handleClearFilters = () => {
    setFilterAccount("")
    setFilterCategory("")
    setFilterStartDate("")
    setFilterEndDate("")
    fetchTransactionsAndAccounts()
  }

  const handleAddOrUpdateTransaction = async (transactionData) => {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction._id, transactionData)
      } else {
        await createTransaction(transactionData)
      }
      setShowForm(false)
      setEditingTransaction(null)
      fetchTransactionsAndAccounts() // Refresh transactions
    } catch (err) {
      setError(err.message || "Failed to save transaction.")
    }
  }

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id)
        fetchTransactionsAndAccounts() // Refresh transactions
      } catch (err) {
        setError(err.message || "Failed to delete transaction.")
      }
    }
  }

  const startEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingTransaction(null)
  }

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading transactions...</div>
  }

  const allCategories = [
    "Food",
    "Transport",
    "Housing",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Health",
    "Education",
    "Other",
    "Salary",
    "Freelance",
    "Investment",
    "Gift",
    "Between Accounts",
  ]

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text">Transactions</h1>

      {error && <div className="bg-danger text-white p-3 rounded-md mb-4">{error}</div>}

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Add New Transaction
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <AddTransactionForm
              onSubmit={handleAddOrUpdateTransaction}
              initialData={editingTransaction}
              onCancel={cancelForm}
            />
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="card mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Filter Transactions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="form-group mb-0">
            <select id="filterAccount" value={filterAccount} onChange={(e) => setFilterAccount(e.target.value)}>
              <option value="">All Accounts</option>
              {accounts.map((acc) => (
                <option key={acc._id} value={acc._id}>
                  {acc.name}
                </option>
              ))}
            </select>
            <label htmlFor="filterAccount">Account</label>
          </div>

          <div className="form-group mb-0">
            <select id="filterCategory" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label htmlFor="filterCategory">Category</label>
          </div>

          <div className="form-group mb-0">
            <input
              type="date"
              id="filterStartDate"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
            />
            <label htmlFor="filterStartDate">Start Date</label>
          </div>

          <div className="form-group mb-0">
            <input
              type="date"
              id="filterEndDate"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
            />
            <label htmlFor="filterEndDate">End Date</label>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-end">
          <button onClick={handleApplyFilters} className="btn-primary">
            Apply Filters
          </button>
          <button onClick={handleClearFilters} className="btn-outline">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction._id}
              transaction={transaction}
              onEdit={startEdit}
              onDelete={handleDeleteTransaction}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">No transactions found.</p>
        )}
      </div>
    </div>
  )
}

export default TransactionsPage
