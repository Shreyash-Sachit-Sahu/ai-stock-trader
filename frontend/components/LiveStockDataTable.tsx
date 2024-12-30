import React from 'react'
import { useState } from 'react'

interface LiveStockDataTableProps {
  data: {
    [ticker: string]: {
      prices: number[]
      timestamps: string[]
    }
  }
}

export default function LiveStockDataTable({ data }: LiveStockDataTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedData = Object.entries(data).sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[1].prices[a[1].prices.length - 1]
    const bValue = b[1].prices[b[1].prices.length - 1]
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
  })

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Live Stock Data</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border" onClick={() => handleSort('ticker')}>Ticker</th>
            <th className="p-2 border" onClick={() => handleSort('lastPrice')}>Last Price</th>
            <th className="p-2 border">Previous Prices</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(([ticker, { prices, timestamps }]) => (
            <tr key={ticker}>
              <td className="p-2 border">{ticker}</td>
              <td className="p-2 border">{prices[prices.length - 1]}</td>
              <td className="p-2 border">
                {prices.slice(-5, -1).reverse().map((price, index) => (
                  <div key={index}>{price}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

