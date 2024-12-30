import React from 'react'

interface PredictionsProps {
  data: {
    [ticker: string]: {
      predicted_price: number
      confidence: number
    }
  }
}

export default function Predictions({ data }: PredictionsProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Predictions</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">Ticker</th>
            <th className="p-2 border">Predicted Next Close</th>
            <th className="p-2 border">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([ticker, { predicted_price, confidence }]) => (
            <tr key={ticker}>
              <td className="p-2 border">{ticker}</td>
              <td className="p-2 border">{predicted_price.toFixed(2)}</td>
              <td className="p-2 border">{(confidence * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

