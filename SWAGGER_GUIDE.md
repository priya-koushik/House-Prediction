# 🎉 Swagger/OpenAPI Documentation Now Available!

## ✅ Swagger UI is Live!

Your API now has interactive Swagger documentation where you can test all endpoints directly from your browser.

---

## 🚀 Access Swagger UI

### **Swagger Interactive Documentation**
**URL**: http://localhost:5001/api-docs

Open this in your browser to:
- View all API endpoints
- See request/response schemas
- Test endpoints interactively
- Download OpenAPI specification

### **OpenAPI JSON Specification**
**URL**: http://localhost:5001/api-docs.json

Raw OpenAPI 3.0 specification in JSON format.

---

## 📖 What's Available in Swagger

### 1. Interactive API Explorer
- **Try it out** button on each endpoint
- Fill in parameters and execute requests
- See real responses
- Copy cURL commands

### 2. Complete Documentation
- Request body schemas
- Response schemas
- Parameter descriptions
- Example values
- Error responses

### 3. Organized by Tags
- **Health**: Health check endpoints
- **Prediction**: Single and batch predictions
- **Model**: Model information and metrics

---

## 🎯 How to Use Swagger UI

### Step 1: Open Swagger UI
```
http://localhost:5001/api-docs
```

### Step 2: Explore Endpoints

You'll see 4 endpoints organized by category:

#### Health
- `GET /api/health` - Check API status

#### Prediction
- `POST /api/predict` - Single property prediction
- `POST /api/batch-predict` - Multiple properties prediction

#### Model
- `GET /api/model-info` - Model information and metrics

### Step 3: Test an Endpoint

1. Click on any endpoint to expand it
2. Click **"Try it out"** button
3. Fill in the request body (for POST requests)
4. Click **"Execute"**
5. See the response below

### Example: Testing Single Prediction

1. Expand `POST /api/predict`
2. Click "Try it out"
3. You'll see a pre-filled example:
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
4. Click "Execute"
5. See the predicted price in the response!

---

## 📋 All Endpoints in Swagger

### 1. GET /api/health
**Description**: Check if API is running and model is loaded

**Response**:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "training_samples": 50
}
```

### 2. POST /api/predict
**Description**: Predict price for a single property

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
  "input_features": {...}
}
```

### 3. POST /api/batch-predict
**Description**: Predict prices for multiple properties

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
    }
  ]
}
```

**Response**:
```json
{
  "predictions": [285000, 350000]
}
```

### 4. GET /api/model-info
**Description**: Get model information and performance metrics

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
  "features": [...],
  "description": "k-NN model that finds the 5 nearest neighbors and averages their prices",
  "note": "Feature weights are used in distance calculation to normalize different scales"
}
```

---

## 🎨 Swagger UI Features

### Interactive Testing
- Click "Try it out" on any endpoint
- Modify request parameters
- Execute requests directly
- See real-time responses

### Schema Validation
- Request bodies are validated
- Required fields are marked
- Data types are enforced
- Example values provided

### Response Examples
- See example responses for each status code
- Understand data structures
- Copy example payloads

### cURL Commands
- Auto-generated cURL commands
- Copy and paste into terminal
- Test from command line

---

## 📥 Download OpenAPI Specification

### JSON Format
```bash
curl http://localhost:5001/api-docs.json > openapi.json
```

### Use in Other Tools
Import the OpenAPI spec into:
- Postman
- Insomnia
- API testing tools
- Code generators

---

## 🔧 Technical Details

### Swagger Configuration

**Packages Used**:
- `swagger-jsdoc` - Generate OpenAPI spec from JSDoc comments
- `swagger-ui-express` - Serve Swagger UI

**OpenAPI Version**: 3.0.0

**Annotations**: JSDoc comments in `server.js`

### Customization

The Swagger UI is customized with:
- Hidden top bar for cleaner look
- Custom site title
- Organized by tags
- Example values for all fields

---

## 🎯 For Interview Demo

### Show Swagger Documentation:

1. **Open Swagger UI**
   ```
   http://localhost:5001/api-docs
   ```

2. **Demonstrate Interactive Testing**
   - Click on `POST /api/predict`
   - Click "Try it out"
   - Show pre-filled example
   - Click "Execute"
   - Show the response

3. **Explain Features**
   - "All endpoints are documented"
   - "Can test directly in browser"
   - "Request/response schemas are defined"
   - "OpenAPI 3.0 compliant"

4. **Show Model Info**
   - Click on `GET /api/model-info`
   - Click "Try it out"
   - Click "Execute"
   - Show model metrics and weights

5. **Highlight Benefits**
   - "No need for Postman"
   - "Self-documenting API"
   - "Easy for frontend developers"
   - "Industry standard (OpenAPI)"

---

## 📊 Comparison: Node.js vs Python Backend

### Node.js Backend (Current)
- **Swagger**: ✅ Available at `/api-docs`
- **Technology**: swagger-jsdoc + swagger-ui-express
- **Features**: Interactive UI, OpenAPI 3.0 spec

### Python Backend (Alternative)
- **Swagger**: ✅ Built-in with FastAPI at `/docs`
- **Technology**: FastAPI automatic docs
- **Features**: Interactive UI, ReDoc, OpenAPI 3.0 spec

Both provide professional Swagger documentation!

---

## 🎉 Summary

### What You Now Have:

✅ **Interactive Swagger UI** at http://localhost:5001/api-docs  
✅ **OpenAPI 3.0 Specification** at http://localhost:5001/api-docs.json  
✅ **All 4 endpoints documented**  
✅ **Try it out** functionality for testing  
✅ **Request/response schemas** with examples  
✅ **Professional API documentation**  

### Quick Links:

- **Swagger UI**: http://localhost:5001/api-docs
- **OpenAPI JSON**: http://localhost:5001/api-docs.json
- **API Base**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/api/health

---

**🎊 Your API now has professional Swagger documentation ready for the interview!**
