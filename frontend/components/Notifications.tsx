import React from 'react'
import { useState, useEffect } from 'react'

interface NotificationsProps {
  liveData: {
    [ticker: string]: {
      prices: number[]
    }
  }
  predictions: {
    [ticker: string]: {
      predicted_price: number
    }
  }
}

export default function Notifications({ liveData, predictions }: NotificationsProps) {
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    const newNotifications: string[] = []

    Object.entries(liveData).forEach(([ticker, { prices }]) => {
      const lastPrice = prices[prices.length - 1]
      const previousPrice = prices[prices.length - 2]
      const percentChange = ((lastPrice - previousPrice) / previousPrice) * 100

      if (Math.abs(percentChange) > 5) {
        newNotifications.push(`${ticker} has moved ${percentChange.toFixed(2)}% in the last update.`)
      }
    })

    Object.entries(predictions).forEach(([ticker, { predicted_price }]) => {
      const lastPrice = liveData[ticker].prices[liveData[ticker].prices.length - 1]
      const predictedPercentChange = ((predicted_price - lastPrice) / lastPrice) * 100

      if (Math.abs(predictedPercentChange) > 10) {
        newNotifications.push(`${ticker} is predicted to move ${predictedPercentChange.toFixed(2)}% in the next closing.`)
      }
    })

    setNotifications(prevNotifications => [...prevNotifications, ...newNotifications])
  }, [liveData, predictions])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="list-disc pl-5">
          {notifications.map((notification, index) => (
            <li key={index} className="mb-2">{notification}</li>
          ))}
        </ul>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  )
}

