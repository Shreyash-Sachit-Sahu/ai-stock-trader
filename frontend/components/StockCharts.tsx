import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface StockChartsProps {
  data: {
    [ticker: string]: {
      prices: number[]
      timestamps: string[]
    }
  }
}

export default function StockCharts({ data }: StockChartsProps) {
  const chartData = Object.entries(data).map(([ticker, { prices, timestamps }]) => {
    return prices.map((price, index) => ({
      timestamp: new Date(timestamps[index]).toLocaleTimeString(),
      [ticker]: price,
    }))
  })

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE']

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Stock Charts</h2>
      {chartData.map((tickerData, index) => (
        <div key={index} className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tickerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(tickerData[0])
                .filter(key => key !== 'timestamp')
                .map((ticker, colorIndex) => (
                  <Line
                    key={ticker}
                    type="monotone"
                    dataKey={ticker}
                    stroke={colors[colorIndex % colors.length]}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  )
}

