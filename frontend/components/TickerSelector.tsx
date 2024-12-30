import React from 'react'
import { useState } from 'react'

interface TickerSelectorProps {
  tickers: string[]
  selectedTickers: string[]
  onTickerChange: (tickers: string[]) => void
}

export default function TickerSelector({ tickers, selectedTickers, onTickerChange }: TickerSelectorProps) {
  const handleTickerChange = (ticker: string) => {
    const updatedTickers = selectedTickers.includes(ticker)
      ? selectedTickers.filter(t => t !== ticker)
      : [...selectedTickers, ticker]
    onTickerChange(updatedTickers)
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Select Tickers</h2>
      <div className="flex flex-wrap gap-4">
        {tickers.map(ticker => (
          <button
            key={ticker}
            className={`px-4 py-2 rounded ${
              selectedTickers.includes(ticker)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleTickerChange(ticker)}
          >
            {ticker}
          </button>
        ))}
      </div>
    </div>
  )
}

