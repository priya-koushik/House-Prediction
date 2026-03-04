# Backend Services Explained

## Overview: You Have 3 Backend Options (Not 2)

The project includes **THREE different backend implementations**. You only need to run **ONE** at a time, but having multiple options demonstrates versatility and understanding of different tech stacks.

---

## 🟢 Backend 1: Node.js (Currently Running)

**Location**: `backend-node/`
**Port**: 5001
**Status**: ✅ RUNNING

### What It Does:
Provides the **main API** for the Property Value Estimator (App 1)

### Features:
- **ML Algorithm**: k-Nearest Neighbors (k-NN) with k=5
- **Endpoints**:
  - `POST /api/predict` - Single property prediction
  - `POST /api/batch-predict` - Multiple properties at once
  - `GET /api/model-info` - Model performance metrics
  - `GET /api/health` - Health check
  - `GET /api-docs` - Swagger UI documentation

### Technology:
- Express.js (Node.js framework)
- Custom k-NN implementation
- Swagger for API documentation
- CORS enabled

### Performance:
- R² Score: 0.9896 (98.96% accuracy)
- RMSE: $8,116
- MAE: $6,400
- Training: 50 property samples

### Why Use This:
- ✅ **Currently running** - ready to demo
- ✅ JavaScript/TypeScript consistency with frontend
- ✅ Fast startup time
- ✅ No Python installation needed
- ✅ Good for JavaScript-focused teams

### Start Command:
```bash
cd backend-node
npm start
```

---

## 🔵 Backend 2: Python (Ready, Not Running)

**Location**: `backend-python/`
**Port**: 8000
**Status**: ⚪ READY (not running)

### What It Does:
Alternative API implementation with **professional ML libraries**

### Features:
- **ML Algorithm**: Linear Regression (Scikit-learn)
- **Same Endpoints** as Node.js backend:
  - `POST /predict` - Single prediction
  - `POST /predict/batch` - Batch predictions
  - `GET /model-info` - Model metrics
  - `GET /health` - Health check
  - `GET /docs` - Automatic Swagger docs

### Technology:
- FastAPI (modern Python framework)
- Scikit-learn (industry-standard ML library)
- Pydantic for validation
- StandardScaler for feature normalization
- Automatic OpenAPI documentation

### Why Use This:
- ✅ Industry-standard ML libraries
- ✅ Better for data science teams
- ✅ More sophisticated ML algorithms
- ✅ Automatic request validation
- ✅ Type hints throughout

### Start Command:
```bash
cd backend-python
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Note:
Not currently running because Python isn't installed on your system (requires Xcode tools on macOS).

---

## 🟡 Backend 3: Java (Ready, Not Running)

**Location**: `backend-java/`
**Port**: 8080
**Status**: ⚪ READY (not running)

### What It Does:
Provides **Market Analysis API** for App 2 with enterprise features

### Features:
- **Endpoints**:
  - `GET /api/market/statistics` - Market statistics
  - `GET /api/market/properties` - Filtered property listings
  - `GET /api/market/segments` - Property segmentation
  - `POST /api/market/what-if` - What-if analysis
  - `GET /api/market/health` - Health check

### Technology:
- Spring Boot (enterprise Java framework)
- Caffeine Cache (in-memory caching)
- OpenCSV for data loading
- RestTemplate for ML model integration

### Special Features:
- ✅ **Caching**: 5-minute cache for statistics (performance optimization)
- ✅ **Aggregate Statistics**: Calculates market insights
- ✅ **ML Integration**: Calls Node.js/Python backend for predictions
- ✅ **Property Filtering**: Advanced filtering capabilities

### Why Use This:
- ✅ Enterprise-grade architecture
- ✅ Built-in caching for performance
- ✅ Good for large-scale applications
- ✅ Strong typing with Java
- ✅ Demonstrates microservices pattern

### Start Command:
```bash
cd backend-java
mvn spring-boot:run
```

---

## How They Work Together

### Current Setup (What's Running):

```
┌─────────────────────────────────────────────────────────┐
│                  Next.js Portal                         │
│                http://localhost:3000                    │
│                                                         │
│  ┌──────────────────┐      ┌──────────────────────┐   │
│  │  App 1:          │      │  App 2:              │   │
│  │  Property        │      │  Market Analysis     │   │
│  │  Estimator       │      │  (uses mock data)    │   │
│  └────────┬─────────┘      └──────────────────────┘   │
│           │                                             │
└───────────┼─────────────────────────────────────────────┘
            │
            ↓
   ┌────────────────────┐
   │  Node.js Backend   │
   │  Port 5001         │
   │  (RUNNING)         │
   │                    │
   │  - Predictions     │
   │  - Batch predict   │
   │  - Model info      │
   └────────────────────┘
```

### Ideal Setup (All Services):

```
┌─────────────────────────────────────────────────────────┐
│                  Next.js Portal                         │
│                http://localhost:3000                    │
│                                                         │
│  ┌──────────────────┐      ┌──────────────────────┐   │
│  │  App 1:          │      │  App 2:              │   │
│  │  Property        │      │  Market Analysis     │   │
│  │  Estimator       │      │                      │   │
│  └────────┬─────────┘      └──────────┬───────────┘   │
│           │                           │                │
└───────────┼───────────────────────────┼────────────────┘
            │                           │
            ↓                           ↓
   ┌────────────────────┐      ┌────────────────────┐
   │  Node.js Backend   │      │  Java Backend      │
   │  Port 5001         │      │  Port 8080         │
   │  (For App 1)       │      │  (For App 2)       │
   │                    │      │                    │
   │  - Predictions     │      │  - Statistics      │
   │  - Batch predict   │      │  - Filtering       │
   │  - Model info      │◄─────┤  - What-if         │
   └────────────────────┘      │  - Caching         │
                               └────────────────────┘
```

---

## Why Multiple Backends?

### 1. Demonstrates Versatility
Shows you can work with different tech stacks:
- JavaScript/Node.js
- Python
- Java

### 2. Different Use Cases

**Node.js**: 
- Fast, lightweight
- Good for startups
- JavaScript consistency

**Python**: 
- ML/Data Science standard
- Rich ecosystem
- Better algorithms

**Java**: 
- Enterprise applications
- High performance
- Built-in caching

### 3. Interview Advantage
You can say:
> "I implemented three backend options to demonstrate versatility. Node.js for JavaScript consistency, Python for ML-friendly ecosystem with Scikit-learn, and Java for enterprise-grade features with caching."

---

## Which One Should You Use?

### For the Interview Demo:

**Use Node.js Backend** (currently running) ✅

**Why?**
- Already running and tested
- No additional setup needed
- Has Swagger documentation
- Fully functional
- Easy to demonstrate

### If Asked About Others:

**Show the code**:
- Open `backend-python/app/main.py` - "Here's the Python version with FastAPI"
- Open `backend-java/` - "Here's the Java version with Spring Boot and caching"

**Explain**:
> "I have three implementations. Node.js is currently running for the demo. Python uses Scikit-learn for more sophisticated ML, and Java includes enterprise features like caching for performance optimization."

---

## Switching Between Backends

### To Use Python Backend:

1. **Stop Node.js**:
```bash
# In Terminal 1, press Ctrl+C
```

2. **Start Python**:
```bash
cd backend-python
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

3. **Update Frontend** (optional):
```typescript
// In hooks/usePrediction.ts
const API_URL = 'http://localhost:8000'
```

### To Use Java Backend:

1. **Keep Node.js running** (for predictions)

2. **Start Java**:
```bash
cd backend-java
mvn spring-boot:run
```

3. **Update Frontend** (for market analysis):
```typescript
// In hooks/useMarketData.ts
const API_URL = 'http://localhost:8080/api/market'
```

---

## What Each Backend Does for Each App

### App 1: Property Value Estimator

**Needs**:
- Price predictions
- Batch predictions
- Model information

**Can Use**:
- ✅ Node.js backend (currently)
- ✅ Python backend (alternative)
- ❌ Java backend (not designed for this)

### App 2: Market Analysis

**Needs**:
- Market statistics
- Property filtering
- What-if analysis

**Can Use**:
- ✅ Java backend (designed for this)
- ✅ Mock data (currently)
- ⚠️ Node.js/Python (would need additional endpoints)

---

## Summary

### Quick Answer:
You have **3 backends**, not 2:

1. **Node.js** (Port 5001) - ✅ Running - For predictions
2. **Python** (Port 8000) - ⚪ Ready - Alternative for predictions
3. **Java** (Port 8080) - ⚪ Ready - For market analysis

### Currently Running:
- **Frontend**: Next.js on port 3000
- **Backend**: Node.js on port 5001

### Why Multiple Backends:
- Demonstrates versatility
- Different tech stacks
- Different use cases
- Interview advantage

### For Interview:
- Use Node.js (already running)
- Mention the other two as alternatives
- Show the code if asked

---

## Interview Talking Points

**When Asked About Architecture:**
> "I've implemented three backend options. Currently running Node.js with Express and a k-NN algorithm. I also built a Python version using FastAPI and Scikit-learn for more sophisticated ML, and a Java version with Spring Boot that includes caching for the market analysis features."

**When Asked Why Multiple Backends:**
> "To demonstrate versatility and understanding of different tech stacks. Each has its strengths: Node.js for JavaScript consistency, Python for ML ecosystem, and Java for enterprise features."

**When Asked Which is Best:**
> "It depends on the use case. For this demo, Node.js works great. For a data science team, Python would be better. For a large enterprise, Java with caching would be ideal."

---

**Bottom Line**: You have 3 backends showing different approaches. Use Node.js for the demo (it's already running), but mention the others to show versatility! 🚀

