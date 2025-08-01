"use client"

import { useEffect, useRef } from "react"
// Only import Chart.js if absolutely needed, as per instructions.
// For this example, we'll include a basic Chart.js setup.
import Chart from "chart.js/auto"

const ChartComponent = ({ data, type, title }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy() // Destroy existing chart before creating a new one
    }

    if (chartRef.current && data && data.labels && data.datasets) {
      const ctx = chartRef.current.getContext("2d")
      chartInstance.current = new Chart(ctx, {
        type: type, // 'bar' or 'pie'
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: title,
              font: {
                size: 18,
              },
              color: "#1E293B", // text color
            },
            legend: {
              position: "top",
            },
          },
          scales:
            type === "bar"
              ? {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "#475569", // Slate 600
                    },
                    grid: {
                      color: "#E2E8F0", // Slate 200
                    },
                  },
                  x: {
                    ticks: {
                      color: "#475569",
                    },
                    grid: {
                      display: false,
                    },
                  },
                }
              : {},
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, type, title])

  return (
    <div className="relative h-64 md:h-80">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default ChartComponent
