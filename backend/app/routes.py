# routes.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

def setup_routes(app, data_fetcher, model_trainer):
    @app.get("/")
    def root():
        return JSONResponse(
            content={
                "message": "Welcome to the AI Stock Trader API!",
                "endpoints": {
                    "/live-data": "Fetch real-time stock data for all tracked tickers.",
                    "/predict": "Get AI-driven predictions for the next day's closing prices.",
                },
                "tickers": data_fetcher.tickers,
            }
        )

    @app.get("/live-data")
    def get_live_data():
        try:
            response = {ticker: data_fetcher.data_store[ticker].tail(5).to_dict() for ticker in data_fetcher.tickers}
            return JSONResponse(content=response)
        except Exception as e:
            return JSONResponse(content={"error": str(e)})

    @app.get("/predict")
    def predict():
        predictions = model_trainer.predict()
        return JSONResponse(content=predictions)
