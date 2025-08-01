"use client"

import { useState, useEffect } from "react"
import { getTransactions } from "../services/api"
import ChartComponent from "../components/ChartComponent"

const ReportsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [chartType, setChartType] = useState("pie") // 'pie' or 'bar'
  const [reportPeriod, setReportPeriod] = useState("month") // 'month' or 'year'

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setError("")
      try {
        const fetchedTransactions = await getTransactions()
        setTransactions(fetchedTransactions)
      } catch (err) {
        setError("Failed to load transactions for reports.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  const processDataForCharts = () => {
    const expenseTransactions = transactions.filter((t) => t.type === "Expense")

    const categorySpending = expenseTransactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      return acc
    }, {})

    const monthlySpending = expenseTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date)
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
      acc[monthYear] = (acc[monthYear] || 0) + transaction.amount
      return acc
    }, {})

    // Sort monthly spending by date
    const sortedMonths = Object.keys(monthlySpending).sort((a, b) => {
      const [monthA, yearA] = a.split(" ")
      const [monthB, yearB] = b.split(" ")
      const dateA = new Date(`${monthA} 1, ${yearA}`)
      const dateB = new Date(`${monthB} 1, ${yearB}`)
      return dateA - dateB
    })

    return {
      categoryData: {
        labels: Object.keys(categorySpending),
        datasets: [
          {
            label: "Spending by Category",
            data: Object.values(categorySpending),
            backgroundColor: [
              "#4F46E5",
              "#6366F1",
              "#818CF8",
              "#A5B4FC",
              "#C7D2FE",
              "#E0E7FF",
              "#BFDBFE",
              "#93C5FD",
              "#60A5FA",
              "#3B82F6",
            ],
            borderColor: "#FFFFFF",
            borderWidth: 1,
          },
        ],
      },
      monthlyData: {
        labels: sortedMonths,
        datasets: [
          {
            label: "Monthly Spending",
            data: sortedMonths.map((month) => monthlySpending[month]),
            backgroundColor: "#4F46E5",
            borderColor: "#4F46E5",
            borderWidth: 1,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      },
    }
  }

  const { categoryData, monthlyData } = processDataForCharts()

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export.")
      return
    }

    const headers = ["Date", "Amount", "Type", "Category", "Description", "Account Name", "Account Type"]
    const rows = transactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.amount.toFixed(2),
      t.type,
      t.category,
      t.description,
      t.account?.name || "",
      t.account?.type || "",
    ])

    let csvContent = headers.join(",") + "\n"
    rows.forEach((row) => {
      csvContent += row.map((field) => `"${field}"`).join(",") + "\n"
    })

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      // feature detection
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "transactions.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading reports...</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text">Reports & Analytics</h1>

      {error && <div className="bg-danger text-white p-3 rounded-md mb-4">{error}</div>}

      <div className="card mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Spending Overview</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setChartType("pie")}
            className={`px-4 py-2 rounded-md ${chartType === "pie" ? "bg-primary text-white" : "bg-gray-200 text-text"}`}
          >
            Spending by Category (Pie)
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-4 py-2 rounded-md ${chartType === "bar" ? "bg-primary text-white" : "bg-gray-200 text-text"}`}
          >
            Monthly Spending (Bar)
          </button>
        </div>

        {transactions.length > 0 ? (
          <div className="h-80">
            {chartType === "pie" && <ChartComponent data={categoryData} type="pie" title="Spending by Category" />}
            {chartType === "bar" && <ChartComponent data={monthlyData} type="bar" title="Monthly Spending" />}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">
            No transactions to generate reports. Add some transactions first!
          </p>
        )}
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Export Data</h2>
        <p className="mb-4 text-gray-700">Export all your transactions to a CSV file for external analysis.</p>
        <button onClick={handleExportCSV} className="btn-primary">
          Export Transactions to CSV
        </button>
      </div>
    </div>
  )
}

export default ReportsPage
