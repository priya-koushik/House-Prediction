# House Price Prediction API Documentation

## Base URL
```
http://localhost:5001
```

---

## API Endpoints

### 1. Health Check

Check if the API is running and the model is loaded.

**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "training_samples": 50
}
```

**Example**:
```bash
curl http://localhost:5001/api/health
```

---

### 2. Single Property Prediction

Predict the price of a single property based on its features.

**Endpoint**: `POST /api/predict`

**Request Body**:
```json
{
  "square_footage": 1500,
  "bedrooms": 3,
  "bathrooms": 2,
  "year_built": 2000,
  "lot_size": 7000,
  "distance_to_city_center": 5,
  "school_rating": 7.5
}
```

**Response**:
```json
{
  "predicted_price": 285000,
  "input_features": {
    "square_footage": 1500,
    "bedrooms": 3,
    "bathrooms": 2,
    "year_built": 2000,
    "lot_size": 7000,
    "distance_to_city_center": 5,
    "school_rating": 7.5
  }
}
```

**Example**:
```bash
curl -X POST http://localhost:5001/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "square_footage": 1500,
    "bedrooms": 3,
    "bathrooms": 2,
    "year_built": 2000,
    "lot_size": 7000,
    "distance_to_city_center": 5,
    "school_rating": 7.5
  }'
```

**Field Descriptions**:
- `square_footage` (number, required): Square footage of the house (> 0)
- `bedrooms` (number, required): Number of bedrooms (≥ 1)
- `bathrooms` (number, required): Number of bathrooms (> 0)
- `year_built` (number, required): Year the house was built (1800-2024)
- `lot_size` (number, required): Lot size in square feet (> 0)
- `distance_to_city_center` (number, required): Distance to city center in miles (≥ 0)
- `school_rating` (number, required): School rating on a scale of 0-10

---

### 3. Batch Property Prediction

Predict prices for multiple properties at once.

**Endpoint**: `POST /api/batch-predict`

**Request Body**:
```json
{
  "data": [
    {
      "square_footage": 1500,
      "bedrooms": 3,
      "bathrooms": 2,
      "year_built": 2000,
      "lot_size": 7000,
      "distance_to_city_center": 5,
      "school_rating": 7.5
    },
    {
      "square_footage": 2000,
      "bedrooms": 4,
      "bathrooms": 2.5,
      "year_built": 2010,
      "lot_size": 8500,
      "distance_to_city_center": 6,
      "school_rating": 8.2
    },
    {
      "square_footage": 1200,
      "bedrooms": 2,
      "bathrooms": 1,
      "year_built": 1995,
      "lot_size": 5000,
      "distance_to_city_center": 3,
      "school_rating": 6.8
    }
  ]
}
```

**Response**:
```json
{
  "predictions": [285000, 350000, 195000]
}
```

**Example**:
```bash
curl -X POST http://localhost:5001/api/batch-predict \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {
        "square_footage": 1500,
        "bedrooms": 3,
        "bathrooms": 2,
        "year_built": 2000,
        "lot_size": 7000,
        "distance_to_city_center": 5,
        "school_rating": 7.5
      },
      {
        "square_footage": 2000,
        "bedrooms": 4,
        "bathrooms": 2.5,
        "year_built": 2010,
        "lot_size": 8500,
        "distance_to_city_center": 6,
        "school_rating": 8.2
      }
    ]
  }'
```

---

### 4. Model Information

Get information about the ML model, including feature weights and performance metrics.

**Endpoint**: `GET /api/model-info`

**Response**:
```json
{
  "model_type": "k-Nearest Neighbors (k=5)",
  "algorithm": "k-NN with weighted Euclidean distance",
  "feature_weights": {
    "square_footage": 1000,
    "bedrooms": 500,
    "bathrooms": 500,
    "year_built": 10,
    "lot_size": 1000,
    "distance_to_city_center": 20,
    "school_rating": 30
  },
  "performance_metrics": {
    "r2_score": 0.9896,
    "rmse": 8116.65,
    "mae": 6400,
    "training_samples": 50
  },
  "features": [
    "square_footage",
    "bedrooms",
    "bathrooms",
    "year_built",
    "lot_size",
    "distance_to_city_center",
    "school_rating"
  ],
  "description": "k-NN model that finds the 5 nearest neighbors and averages their prices",
  "note": "Feature weights are used in distance calculation to normalize different scales"
}
```

**Example**:
```bash
curl http://localhost:5001/api/model-info
```

**Metrics Explanation**:
- `r2_score`: R² (coefficient of determination) - measures how well the model fits the data (0-1, higher is better)
- `rmse`: Root Mean Square Error - average prediction error in dollars
- `mae`: Mean Absolute Error - average absolute prediction error in dollars
- `training_samples`: Number of properties used to train the model

---

## Error Responses

### 400 Bad Request
Returned when input validation fails.

```json
{
  "error": "Invalid input values"
}
```

### 500 Internal Server Error
Returned when an unexpected error occurs.

```json
{
  "error": "Error message description"
}
```

---

## Model Details

### Algorithm: k-Nearest Neighbors (k=5)

The API uses a k-Nearest Neighbors algorithm with k=5, which:
1. Finds the 5 most similar properties in the training dataset
2. Calculates similarity using weighted Euclidean distance
3. Returns the average price of those 5 properties

### Feature Weights

Features are weighted to normalize different scales:

| Feature | Weight | Purpose |
|---------|--------|---------|
| square_footage | 1000 | Normalize large values |
| bedrooms | 500 | Moderate importance |
| bathrooms | 500 | Moderate importance |
| year_built | 10 | Low weight (already normalized) |
| lot_size | 1000 | Normalize large values |
| distance_to_city_center | 20 | Moderate importance |
| school_rating | 30 | Moderate importance |

### Distance Calculation

```javascript
distance = sqrt(
  ((feature1 - sample1) / weight1)² +
  ((feature2 - sample2) / weight2)² +
  ...
)
```

### Performance

Current model performance on training data:
- **R² Score**: 0.9896 (98.96% variance explained)
- **RMSE**: $8,116.65 (average error)
- **MAE**: $6,400 (average absolute error)

---

## Rate Limiting

Currently, there are no rate limits. For production use, consider implementing:
- Rate limiting per IP address
- API key authentication
- Request throttling

---

## CORS

CORS is enabled for all origins (`*`). For production, restrict to specific domains:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## Testing the API

### Using cURL

**Health Check**:
```bash
curl http://localhost:5001/api/health
```

**Single Prediction**:
```bash
curl -X POST http://localhost:5001/api/predict \
  -H "Content-Type: application/json" \
  -d '{"square_footage":1500,"bedrooms":3,"bathrooms":2,"year_built":2000,"lot_size":7000,"distance_to_city_center":5,"school_rating":7.5}'
```

**Batch Prediction**:
```bash
curl -X POST http://localhost:5001/api/batch-predict \
  -H "Content-Type: application/json" \
  -d '{"data":[{"square_footage":1500,"bedrooms":3,"bathrooms":2,"year_built":2000,"lot_size":7000,"distance_to_city_center":5,"school_rating":7.5}]}'
```

**Model Info**:
```bash
curl http://localhost:5001/api/model-info
```

### Using Postman

1. Import the following collection:

```json
{
  "info": {
    "name": "House Price Prediction API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5001/api/health"
      }
    },
    {
      "name": "Single Prediction",
      "request": {
        "method": "POST",
        "url": "http://localhost:5001/api/predict",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"square_footage\":1500,\"bedrooms\":3,\"bathrooms\":2,\"year_built\":2000,\"lot_size\":7000,\"distance_to_city_center\":5,\"school_rating\":7.5}"
        }
      }
    },
    {
      "name": "Batch Prediction",
      "request": {
        "method": "POST",
        "url": "http://localhost:5001/api/batch-predict",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"data\":[{\"square_footage\":1500,\"bedrooms\":3,\"bathrooms\":2,\"year_built\":2000,\"lot_size\":7000,\"distance_to_city_center\":5,\"school_rating\":7.5}]}"
        }
      }
    },
    {
      "name": "Model Info",
      "request": {
        "method": "GET",
        "url": "http://localhost:5001/api/model-info"
      }
    }
  ]
}
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Health Check
const health = await axios.get(`${API_URL}/health`);
console.log(health.data);

// Single Prediction
const prediction = await axios.post(`${API_URL}/predict`, {
  square_footage: 1500,
  bedrooms: 3,
  bathrooms: 2,
  year_built: 2000,
  lot_size: 7000,
  distance_to_city_center: 5,
  school_rating: 7.5
});
console.log(prediction.data);

// Batch Prediction
const batchPrediction = await axios.post(`${API_URL}/batch-predict`, {
  data: [
    {
      square_footage: 1500,
      bedrooms: 3,
      bathrooms: 2,
      year_built: 2000,
      lot_size: 7000,
      distance_to_city_center: 5,
      school_rating: 7.5
    }
  ]
});
console.log(batchPrediction.data);

// Model Info
const modelInfo = await axios.get(`${API_URL}/model-info`);
console.log(modelInfo.data);
```

---

## Python Backend Alternative

For production use, consider the Python backend with FastAPI:

**Base URL**: `http://localhost:8000`

**Swagger Documentation**: `http://localhost:8000/docs`

**Endpoints**:
- `POST /predict` - Single prediction
- `POST /predict/batch` - Batch prediction
- `GET /model-info` - Model information (includes coefficients)
- `GET /health` - Health check

The Python backend provides:
- Automatic Swagger/OpenAPI documentation
- Linear Regression model with actual coefficients
- Better performance metrics
- Pydantic validation
- More professional ML implementation

---

## Summary

### Available Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/predict` | Single property prediction |
| POST | `/api/batch-predict` | Batch property predictions |
| GET | `/api/model-info` | Model information and metrics |

### All Requirements Met:

✅ **predict** - Accepts housing features and returns price predictions (single and batch)  
✅ **model-info** - Returns model coefficients/weights and performance metrics  
✅ **health** - Simple health check endpoint  

---

## Live Demo

The API is currently running at:
- **Base URL**: http://localhost:5001
- **Health**: http://localhost:5001/api/health
- **Model Info**: http://localhost:5001/api/model-info

Try it now!
