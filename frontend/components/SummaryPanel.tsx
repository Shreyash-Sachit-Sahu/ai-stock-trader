import React from 'react'
interface SummaryPanelProps {
  liveData: {
    [ticker: string]: {
      prices: number[]
    }
  }
  predictions: {
    [ticker: string]: {
      predicted_price: number
      confidence: number
    }
  }
}

export default function SummaryPanel({ liveData, predictions }: SummaryPanelProps) {
  const calculatePercentChange = (prices: number[]) => {
    const firstPrice = prices[0]
    const lastPrice = prices[prices.length - 1]
    return ((lastPrice - firstPrice) / firstPrice) * 100
  }

  const sortedPerformance = Object.entries(liveData)
    .map(([ticker, { prices }]) => ({
      ticker,
      percentChange: calculatePercentChange(prices),
    }))
    .sort((a, b) => b.percentChange - a.percentChange)

  const highestPerforming = sortedPerformance[0]
  const lowestPerforming = sortedPerformance[sortedPerformance.length - 1]

  const highestConfidencePrediction = Object.entries(predictions)
    .reduce((highest, [ticker, { confidence }]) => {
      return confidence > highest.confidence ? { ticker, confidence } : highest
    }, { ticker: '', confidence: 0 })

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Highest Performing Stock</h3>
          <p>{highestPerforming.ticker}: {highestPerforming.percentChange.toFixed(2)}%</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Lowest Performing Stock</h3>
          <p>{lowestPerforming.ticker}: {lowestPerforming.percentChange.toFixed(2)}%</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Highest Confidence Prediction</h3>
          <p>{highestConfidencePrediction.ticker}: {(highestConfidencePrediction.confidence * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  )
}

