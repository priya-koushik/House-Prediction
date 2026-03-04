from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler
import pickle
import os

app = FastAPI(
    title="House Price Prediction API",
    description="API for predicting house prices using machine learning",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
model = None
scaler = None
model_metrics = {}
feature_names = ['square_footage', 'bedrooms', 'bathrooms', 'year_built', 
                 'lot_size', 'distance_to_city_center', 'school_rating']

# Pydantic models
class HouseFeatures(BaseModel):
    square_footage: float = Field(..., gt=0, description="Square footage of the house")
    bedrooms: int = Field(..., ge=1, description="Number of bedrooms")
    bathrooms: float = Field(..., gt=0, description="Number of bathrooms")
    year_built: int = Field(..., ge=1800, le=2024, description="Year the house was built")
    lot_size: float = Field(..., gt=0, description="Lot size in square feet")
    distance_to_city_center: float = Field(..., ge=0, description="Distance to city center in miles")
    school_rating: float = Field(..., ge=0, le=10, description="School rating (0-10)")

class PredictionResponse(BaseModel):
    predicted_price: float
    input_features: dict

class BatchPredictionRequest(BaseModel):
    data: List[HouseFeatures]

class BatchPredictionResponse(BaseModel):
    predictions: List[float]

class ModelInfo(BaseModel):
    model_type: str
    coefficients: Optional[dict]
    feature_importance: Optional[dict]
    performance_metrics: dict
    training_samples: int
    features: List[str]

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_type: str

def load_and_train_model():
    """Load data and train the model"""
    global model, scaler, model_metrics
    
    # Load data
    df = pd.read_csv('../House Price Dataset.csv')
    
    # Prepare features and target
    X = df[feature_names]
    y = df['price']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Linear Regression model
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)
    
    # Evaluate model
    y_pred_train = model.predict(X_train_scaled)
    y_pred_test = model.predict(X_test_scaled)
    
    # Calculate metrics
    model_metrics = {
        'train_r2': float(r2_score(y_train, y_pred_train)),
        'test_r2': float(r2_score(y_test, y_pred_test)),
        'train_rmse': float(np.sqrt(mean_squared_error(y_train, y_pred_train))),
        'test_rmse': float(np.sqrt(mean_squared_error(y_test, y_pred_test))),
        'train_mae': float(mean_absolute_error(y_train, y_pred_train)),
        'test_mae': float(mean_absolute_error(y_test, y_pred_test)),
        'training_samples': len(X_train),
        'test_samples': len(X_test)
    }
    
    print("✅ Model trained successfully!")
    print(f"📊 Test R² Score: {model_metrics['test_r2']:.4f}")
    print(f"📊 Test RMSE: ${model_metrics['test_rmse']:,.2f}")
    print(f"📊 Test MAE: ${model_metrics['test_mae']:,.2f}")

@app.on_event("startup")
async def startup_event():
    """Load and train model on startup"""
    load_and_train_model()

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "message": "House Price Prediction API",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_type": "Linear Regression"
    }

@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict_price(features: HouseFeatures):
    """
    Predict house price based on features.
    
    - **square_footage**: Square footage of the house
    - **bedrooms**: Number of bedrooms
    - **bathrooms**: Number of bathrooms
    - **year_built**: Year the house was built
    - **lot_size**: Lot size in square feet
    - **distance_to_city_center**: Distance to city center in miles
    - **school_rating**: School rating (0-10)
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Prepare features
        feature_values = [
            features.square_footage,
            features.bedrooms,
            features.bathrooms,
            features.year_built,
            features.lot_size,
            features.distance_to_city_center,
            features.school_rating
        ]
        
        # Scale and predict
        features_scaled = scaler.transform([feature_values])
        prediction = model.predict(features_scaled)[0]
        
        return {
            "predicted_price": round(float(prediction), 2),
            "input_features": features.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict/batch", response_model=BatchPredictionResponse, tags=["Prediction"])
async def batch_predict(request: BatchPredictionRequest):
    """
    Predict house prices for multiple properties.
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        predictions = []
        for features in request.data:
            feature_values = [
                features.square_footage,
                features.bedrooms,
                features.bathrooms,
                features.year_built,
                features.lot_size,
                features.distance_to_city_center,
                features.school_rating
            ]
            features_scaled = scaler.transform([feature_values])
            prediction = model.predict(features_scaled)[0]
            predictions.append(round(float(prediction), 2))
        
        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/model-info", response_model=ModelInfo, tags=["Model"])
async def get_model_info():
    """
    Get model coefficients and performance metrics.
    
    Returns:
    - Model type
    - Coefficients for each feature
    - Performance metrics (R², RMSE, MAE)
    - Training information
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Get coefficients
    coefficients = dict(zip(feature_names, model.coef_.tolist()))
    
    return {
        "model_type": "Linear Regression",
        "coefficients": coefficients,
        "feature_importance": None,  # Linear regression doesn't have feature importance
        "performance_metrics": model_metrics,
        "training_samples": model_metrics.get('training_samples', 0),
        "features": feature_names
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
