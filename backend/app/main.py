# main.py
from fastapi import FastAPI
from app.data_fetcher import DataFetcher
from app.model_trainer import ModelTrainer
from app.routes import setup_routes
from app.config import TICKERS, FETCH_INTERVAL, MODEL_TRAIN_INTERVAL
import threading
import time

app = FastAPI()

# Initialize components
data_fetcher = DataFetcher(TICKERS)
model_trainer = ModelTrainer(data_fetcher.data_store)

# Background tasks
def background_tasks():
    fetch_thread = threading.Thread(target=data_fetcher.fetch_live_data, daemon=True)
    fetch_thread.start()

    while True:
        model_trainer.train_models()
        time.sleep(MODEL_TRAIN_INTERVAL)

threading.Thread(target=background_tasks, daemon=True).start()

# Setup routes
setup_routes(app, data_fetcher, model_trainer)
