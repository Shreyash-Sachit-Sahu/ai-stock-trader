# model_trainer.py
import numpy as np
from sklearn.linear_model import LinearRegression

class ModelTrainer:
    def __init__(self, data_store):
        self.data_store = data_store
        self.models = {}

    def train_models(self):
        for ticker, df in self.data_store.items():
            if len(df) > 10:
                df['time_index'] = np.arange(len(df))
                X = df['time_index'].values.reshape(-1, 1)
                y = df['Close'].values
                model = LinearRegression()
                model.fit(X, y)
                self.models[ticker] = model

    def predict(self):
        predictions = {}
        for ticker, model in self.models.items():
            if ticker in self.data_store:
                df = self.data_store[ticker]
                if len(df) > 10:
                    next_time_index = len(df)
                    predictions[ticker] = model.predict(np.array([[next_time_index]]))[0]
        return predictions
