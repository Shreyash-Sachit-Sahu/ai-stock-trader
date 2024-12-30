# data_fetcher.py
import yfinance as yf
import time
import threading

class DataFetcher:
    def __init__(self, tickers):
        self.tickers = tickers
        self.data_store = {}

    def fetch_live_data(self):
        while True:
            try:
                for ticker in self.tickers:
                    ticker_data = yf.Ticker(ticker)
                    hist = ticker_data.history(period="1d", interval="1m")
                    self.data_store[ticker] = hist
            except Exception as e:
                print(f"Error fetching data: {e}")
            time.sleep(60)  # Update interval
