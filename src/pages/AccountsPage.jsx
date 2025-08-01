"use client"

import { useState, useEffect } from "react"
import { getAccounts, createAccount, updateAccount, deleteAccount } from "../services/api"
import AccountCard from "../components/AccountCard"
import AddAccountForm from "../components/AddAccountForm"

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)

  const fetchAccounts = async () => {
    setLoading(true)
    setError("")
    try {
      const fetchedAccounts = await getAccounts()
      setAccounts(fetchedAccounts)
    } catch (err) {
      setError("Failed to load accounts.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const handleAddOrUpdateAccount = async (accountData) => {
    try {
      if (editingAccount) {
        await updateAccount(editingAccount._id, accountData)
      } else {
        await createAccount(accountData)
      }
      setShowForm(false)
      setEditingAccount(null)
      fetchAccounts() // Refresh accounts
    } catch (err) {
      setError(err.message || "Failed to save account.")
    }
  }

  const handleDeleteAccount = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await deleteAccount(id)
        fetchAccounts() // Refresh accounts
      } catch (err) {
        setError(err.message || "Failed to delete account.")
      }
    }
  }

  const startEdit = (account) => {
    setEditingAccount(account)
    setShowForm(true)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingAccount(null)
  }

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading accounts...</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text">Account Management</h1>

      {error && <div className="bg-danger text-white p-3 rounded-md mb-4">{error}</div>}

      <div className="mb-6">
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Add New Account
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <AddAccountForm onSubmit={handleAddOrUpdateAccount} initialData={editingAccount} onCancel={cancelForm} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard key={account._id} account={account} onEdit={startEdit} onDelete={handleDeleteAccount} />
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center py-8">
            No accounts added yet. Click "Add New Account" to get started!
          </p>
        )}
      </div>
    </div>
  )
}

export default AccountsPage
