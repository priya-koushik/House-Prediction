# 🏠 House Price Prediction - Fullstack Application

A comprehensive fullstack house price prediction system with a unified Next.js portal containing two applications: Property Value Estimator and Market Analysis.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-yellow)](https://www.python.org/)
[![Java](https://img.shields.io/badge/Java-17+-red)](https://www.java.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Documentation](#documentation)

## 🎯 Overview

This project is a complete fullstack application for house price prediction and market analysis. It features:

- **Unified Next.js Portal** with two integrated applications
- **Three Backend Options** (Node.js, Python, Java) demonstrating versatility
- **Machine Learning Models** for accurate price predictions
- **Interactive Dashboards** for market analysis
- **Responsive Design** with accessibility compliance (WCAG 2.1 AA)
- **Production-Ready** with Docker support

## ✨ Features

### App 1: Property Value Estimator
- 🏡 Single property price predictions
- 📊 Visual charts and analytics
- 📝 Prediction history tracking
- 🔄 Property comparison (up to 3 properties)
- 📤 Batch predictions via CSV upload
- ✅ Real-time form validation

### App 2: Property Market Analysis
- 📈 Interactive market dashboard
- 🎯 Advanced property filtering
- 💡 What-if analysis tool
- 📥 Data export (CSV/PDF)
- 📊 Market statistics and trends
- 🔍 Property segmentation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks

### Backend Options

#### Node.js (Currently Running)
- Express.js
- k-NN Algorithm
- Swagger Documentation
- Port: 5001

#### Python (Alternative)
- FastAPI
- Scikit-learn (Linear Regression)
- Pydantic Validation
- Port: 8000

#### Java (Market Analysis)
- Spring Boot
- Caffeine Cache
- REST API
- Port: 8080

### DevOps
- Docker & Docker Compose
- GitHub Actions (ready)
- Environment Configuration

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Next.js Portal (Port 3000)             │
│  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │  Property Estimator  │  │  Market Analysis     │   │
│  │  /estimator          │  │  /market-analysis    │   │
│  └──────────┬───────────┘  └──────────┬───────────┘   │
└─────────────┼──────────────────────────┼───────────────┘
              │                          │
              ↓                          ↓
     ┌────────────────┐         ┌────────────────┐
     │  Node.js API   │         │  Java API      │
     │  Port 5001     │         │  Port 8080     │
     │  - Predictions │         │  - Statistics  │
     │  - ML Model    │         │  - Caching     │
     └────────────────┘         └────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ (optional)
- Java 17+ and Maven (optional)
- Git

### Quick Start

1. **Clone the repository**
```bash
git clone git@github.com:priya-koushik/House-Prediction.git
cd House-Prediction
```

2. **Start the Node.js Backend**
```bash
cd backend-node
npm install
npm start
# Running on http://localhost:5001
```

3. **Start the Next.js Portal**
```bash
cd nextjs-portal
npm install
npm run dev
# Running on http://localhost:3000
```

4. **Access the Application**
- Portal: http://localhost:3000
- API Docs: http://localhost:5001/api-docs

### Docker Setup (Alternative)

```bash
docker-compose up
```

## 📁 Project Structure

```
House-Prediction/
├── backend-node/              # Node.js API (Express + k-NN)
│   ├── server.js
│   ├── train-model.js
│   └── package.json
├── backend-python/            # Python API (FastAPI + Scikit-learn)
│   └── app/
│       └── main.py
├── backend-java/              # Java API (Spring Boot + Cache)
│   └── src/main/java/
├── nextjs-portal/             # Next.js Portal
│   ├── app/                   # App Router
│   │   ├── estimator/        # App 1
│   │   └── market-analysis/  # App 2
│   ├── components/           # React Components
│   ├── hooks/                # Custom Hooks
│   └── lib/                  # Utilities
├── House Price Dataset.csv   # Training Data
├── docker-compose.yml
└── README.md
```

## 📚 API Documentation

### Node.js API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/predict` | POST | Single prediction |
| `/api/batch-predict` | POST | Batch predictions |
| `/api/model-info` | GET | Model metrics |
| `/api-docs` | GET | Swagger UI |

### Example Request

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

### Example Response

```json
{
  "predicted_price": 285000.00,
  "features": {
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

## 📸 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Property Estimator
![Property Estimator](docs/screenshots/estimator.png)

### Market Analysis
![Market Analysis](docs/screenshots/market-analysis.png)

## 📖 Documentation

Comprehensive documentation is available in the repository:

- [Complete Setup Guide](COMPLETE_SETUP.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Architecture Details](ARCHITECTURE.md)
- [Interview Demo Guide](INTERVIEW_DEMO_GUIDE.md)
- [UI/UX Requirements](UIUX_REQUIREMENTS_VERIFICATION.md)
- [State Management](STATE_MANAGEMENT_CODE_QUALITY.md)

## 🎯 Model Performance

### Node.js k-NN Model
- **R² Score**: 0.9896 (98.96% accuracy)
- **RMSE**: $8,116.65
- **MAE**: $6,400
- **Training Samples**: 50 properties
- **Algorithm**: k-Nearest Neighbors (k=5)

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend-node
npm test

# Frontend tests
cd nextjs-portal
npm test
```

### API Testing
```bash
# Test all endpoints
./test-api.sh
```

## 🚢 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Manual Deployment

**Backend**:
```bash
cd backend-node
npm install --production
npm start
```

**Frontend**:
```bash
cd nextjs-portal
npm install
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Priya Koushik**
- GitHub: [@priya-koushik](https://github.com/priya-koushik)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Recharts for beautiful visualizations
- Tailwind CSS for the design system
- All open-source contributors

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**⭐ Star this repository if you find it helpful!**

