'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Dashboard from '../components/Dashboard'
import TickerSelector from '../components/TickerSelector'
import { fetchMetadata } from '../utils/dataFormatter'
import { handleError } from '../utils/errorHandler'
import { availableTickers } from '../config/tickers'

export default function Home() {
  const [metadata, setMetadata] = useState<any>(null)
  const [selectedTickers, setSelectedTickers] = useState<string[]>([])

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await fetchMetadata()
        setMetadata(data)
      } catch (error) {
        handleError(error)
      }
    }

    getMetadata()
  }, [])

  const handleTickerChange = (tickers: string[]) => {
    setSelectedTickers(tickers)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Stock Dashboard</h1>
      <TickerSelector
        tickers={availableTickers}
        selectedTickers={selectedTickers}
        onTickerChange={handleTickerChange}
      />
      <Dashboard selectedTickers={selectedTickers} />
    </div>
  )
}

