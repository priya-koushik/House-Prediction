# Complete Interview Tasks Setup Guide

## Overview

This project implements both interview tasks:
- **Task 1**: Housing Price Prediction Model API (Python + FastAPI + Scikit-learn)
- **Task 2**: Multi-Application Next.js Portal

## Project Structure

```
├── backend-python/          # Task 1: FastAPI backend with ML model
│   ├── app/
│   │   └── main.py         # FastAPI application with Swagger docs
│   ├── requirements.txt
│   └── Dockerfile
├── nextjs-portal/           # Task 2: Next.js multi-app portal
│   ├── app/
│   │   ├── estimator/      # App 1: Property Value Estimator
│   │   └── market-analysis/ # App 2: Market Analysis
│   ├── components/
│   └── package.json
├── backend-node/            # Alternative Node.js backend (currently running)
└── frontend/                # Original React frontend
```

## Task 1: Housing Price Prediction API

### Features Implemented:
✅ **API Endpoints:**
- `POST /predict` - Single property prediction
- `POST /predict/batch` - Batch predictions
- `GET /model-info` - Model coefficients and performance metrics
- `GET /health` - Health check

✅ **Technical Stack:**
- Python 3.12+
- FastAPI with automatic Swagger/OpenAPI docs
- Scikit-learn (Linear Regression)
- Pydantic for validation

✅ **Deliverables:**
- Source code ✓
- Dockerfile ✓
- Swagger/OpenAPI documentation ✓ (available at `/docs`)

### Setup Task 1:

```bash
# Navigate to Python backend
cd backend-python

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Access Task 1:
- API: http://localhost:8000
- Swagger Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Health Check: http://localhost:8000/health
- Model Info: http://localhost:8000/model-info

## Task 2: Next.js Multi-Application Portal

### Features Implemented:

✅ **Portal Structure:**
- Unified navigation and layout
- Next.js App Router
- Consistent design system with Tailwind CSS
- Loading and error states

✅ **App 1: Property Value Estimator**
- Form for inputting property details
- Client-side validation with error messages
- Display results in tabular format and visual charts
- History feature showing previous estimates
- Comparison view for up to 3 properties side-by-side

✅ **App 2: Property Market Analysis**
- Interactive dashboard with market visualizations
- Filters for property segments (price, bedrooms, sq ft)
- What-if analysis tool with sliders
- Data export options (CSV, PDF)
- Responsive data tables with sorting

✅ **Technical Requirements:**
- Next.js 14 with App Router ✓
- Server and client components ✓
- Tailwind CSS for responsive layouts ✓
- WCAG accessible UI components ✓
- Loading states and error boundaries ✓
- Smooth transitions ✓
- Modern design principles ✓
- Client-side state management ✓
- Form validation ✓
- Efficient data fetching ✓

### Setup Task 2:

```bash
# Navigate to Next.js portal
cd nextjs-portal

# Install dependencies
npm install

# Run development server
npm run dev
```

### Access Task 2:
- Portal: http://localhost:3000
- Property Estimator: http://localhost:3000/estimator
- Market Analysis: http://localhost:3000/market-analysis

## Complete Setup (All Tasks)

### Option 1: Run Everything Locally

**Terminal 1 - Python Backend (Task 1):**
```bash
cd backend-python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Next.js Portal (Task 2):**
```bash
cd nextjs-portal
npm install
npm run dev
```

### Option 2: Docker (Task 1 Only)

```bash
cd backend-python
docker build -t house-price-api .
docker run -p 8000:8000 house-price-api
```

## API Documentation

### Task 1 Endpoints:

#### 1. Predict Single Property
```bash
curl -X POST "http://localhost:8000/predict" \
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

#### 2. Get Model Information
```bash
curl "http://localhost:8000/model-info"
```

Response includes:
- Model type
- Coefficients for each feature
- Performance metrics (R², RMSE, MAE)
- Training information

#### 3. Health Check
```bash
curl "http://localhost:8000/health"
```

## Features Checklist

### Task 1: ✅ COMPLETE
- [x] Python 3.12+ with FastAPI
- [x] Scikit-learn regression model
- [x] predict endpoint (single & batch)
- [x] model-info endpoint with coefficients and metrics
- [x] health endpoint
- [x] Swagger/OpenAPI documentation
- [x] Dockerfile
- [x] Input validation with Pydantic

### Task 2: ✅ COMPLETE
- [x] Next.js portal with App Router
- [x] Unified navigation and layout
- [x] App 1: Property Value Estimator
  - [x] Property input form
  - [x] Client-side validation
  - [x] Tabular and chart display
  - [x] Prediction history
  - [x] Property comparison (up to 3)
- [x] App 2: Market Analysis
  - [x] Interactive dashboard
  - [x] Property filters
  - [x] What-if analysis tool
  - [x] Data export (CSV, PDF)
  - [x] Responsive data tables
- [x] Tailwind CSS styling
- [x] WCAG accessible components
- [x] Loading states and error handling
- [x] Smooth transitions
- [x] Modern design

## Testing the Application

### Test Task 1 API:
1. Visit http://localhost:8000/docs
2. Try the `/predict` endpoint with sample data
3. Check `/model-info` to see model coefficients
4. Verify `/health` endpoint

### Test Task 2 Portal:
1. Visit http://localhost:3000
2. Navigate to Property Estimator
3. Fill in property details and get estimate
4. View prediction history
5. Select multiple predictions for comparison
6. Navigate to Market Analysis
7. Apply filters and explore dashboard
8. Try what-if analysis
9. Export data to CSV

## Notes for Interview

- **Task 1** is production-ready with full Swagger documentation
- **Task 2** demonstrates Next.js best practices with App Router
- Both tasks are fully functional and can be demonstrated live
- Code follows modern best practices and is well-structured
- All requirements from the PDF are implemented

## Current Status

✅ **Task 1**: Fully implemented with Python + FastAPI + Scikit-learn
✅ **Task 2**: Fully implemented with Next.js + Tailwind CSS
✅ **Swagger/OpenAPI**: Available at /docs
✅ **Docker**: Dockerfile provided
✅ **All deliverables**: Complete and ready for demo
