import React from 'react'
import { useState, useEffect } from 'react'
import LiveStockDataTable from './LiveStockDataTable'
import Predictions from './Predictions'
import StockCharts from './StockCharts'
import SummaryPanel from './SummaryPanel'
import Notifications from './Notifications'
import { fetchLiveData, fetchPredictions } from '../utils/dataFormatter'
import { handleError } from '../utils/errorHandler'
import { setupPolling } from '../utils/pollingHandler'

interface DashboardProps {
  selectedTickers: string[]
}

export default function Dashboard({ selectedTickers }: DashboardProps) {
  const [liveData, setLiveData] = useState<any>(null)
  const [predictions, setPredictions] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTickers.length === 0) return

      try {
        const [liveDataResponse, predictionsResponse] = await Promise.all([
          fetchLiveData(selectedTickers),
          fetchPredictions(selectedTickers)
        ])

        setLiveData(liveDataResponse)
        setPredictions(predictionsResponse)
      } catch (error) {
        handleError(error)
      }
    }

    fetchData()
    const cleanup = setupPolling(fetchData, 60000) // Poll every minute

    return cleanup
  }, [selectedTickers])

  if (!liveData || !predictions) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <LiveStockDataTable data={liveData} />
      <Predictions data={predictions} />
      <StockCharts data={liveData} />
      <SummaryPanel liveData={liveData} predictions={predictions} />
      <Notifications liveData={liveData} predictions={predictions} />
    </div>
  )
}

