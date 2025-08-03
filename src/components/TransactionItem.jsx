"use client"

import { useAuth } from "../context/AuthContext"
import { formatCurrency } from "../utils/currency"

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const { userCurrency } = useAuth()
  const isExpense = transaction.type === "Expense"
  const isIncome = transaction.type === "Income"

  return (
    <div className="flex justify-between items-center p-4 border-b border-border last:border-b-0">
      <div>
        <div className="font-semibold text-lg">{transaction.description || transaction.category}</div>
        <div className="text-sm text-gray-600">
          {new Date(transaction.date).toLocaleDateString()} - {transaction.account?.name || "N/A"}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`font-bold text-lg ${isExpense ? "text-danger" : isIncome ? "text-success" : "text-text"}`}>
          {isExpense ? "-" : ""}{formatCurrency(transaction.amount, userCurrency)}
        </span>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(transaction)} className="text-primary hover:text-secondary text-sm">
            Edit
          </button>
          <button onClick={() => onDelete(transaction._id)} className="text-danger hover:text-red-700 text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
