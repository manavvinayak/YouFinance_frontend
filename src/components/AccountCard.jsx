"use client"

import { useAuth } from "../context/AuthContext"
import { formatCurrency } from "../utils/currency"

const AccountCard = ({ account, onEdit, onDelete }) => {
  const { userCurrency } = useAuth()
  const getIcon = (type) => {
    switch (type) {
      case "Checking":
        return "🏦"
      case "Savings":
        return "💰"
      case "Credit Card":
        return "💳"
      case "Cash":
        return "💵"
      case "Investment":
        return "📈"
      default:
        return "💼"
    }
  }

  return (
    <div className="card flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{getIcon(account.type)}</div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(account)} className="text-primary hover:text-secondary text-sm">
            Edit
          </button>
          <button onClick={() => onDelete(account._id)} className="text-danger hover:text-red-700 text-sm">
            Delete
          </button>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{account.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{account.type}</p>
      <div className="text-2xl font-bold text-primary">
        {formatCurrency(account.currentBalance, userCurrency)}
      </div>
    </div>
  )
}

export default AccountCard
