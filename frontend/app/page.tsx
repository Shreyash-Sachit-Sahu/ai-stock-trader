'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Dashboard from '../components/Dashboard'
import TickerSelector from '../components/TickerSelector'
import { fetchMetadata } from '../utils/dataFormatter'
import { handleError } from '../utils/errorHandler'
import { availableTickers } from '../config/tickers'
import ErrorNotification from '../components/ErrorNotification' // Import the ErrorNotification component

export default function Home() {
  const [metadata, setMetadata] = useState<any>(null)
  const [selectedTickers, setSelectedTickers] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true) // Loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Error message state

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await fetchMetadata()
        setMetadata(data)
      } catch (error) {
        handleError(error)
        setErrorMessage(error.message) // Set error message on failure
      } finally {
        setLoading(false) // Set loading to false after fetching
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
      {errorMessage && <ErrorNotification message={errorMessage} />} {/* Display error notification */}
      {loading ? ( // Conditional rendering based on loading state
        <p>Loading metadata...</p>
      ) : (
        <>
          <TickerSelector
            tickers={availableTickers}
            selectedTickers={selectedTickers}
            onTickerChange={handleTickerChange}
          />
          <Dashboard selectedTickers={selectedTickers} />
        </>
      )}
    </div>
  )
}