import './globals.css'
import React from 'react';


export const metadata = {
  title: 'Stock Dashboard',
  description: 'Real-time stock data and predictions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): any {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}

