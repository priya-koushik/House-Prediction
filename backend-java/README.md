# Housing Price Market Analysis - Java Backend

Spring Boot REST API for property market analysis with caching and ML model integration.

## Features

- ✅ REST API endpoints for market analysis
- ✅ Aggregate statistics generation
- ✅ ML model integration (connects to Node.js/Python backend)
- ✅ Caffeine caching for performance optimization
- ✅ Property filtering and segmentation
- ✅ What-if analysis with mortgage calculations

## Requirements

- Java 17 or higher
- Maven 3.6+

## Installation

```bash
cd backend-java
mvn clean install
```

## Running the Application

```bash
mvn spring-boot:run
```

The API will be available at: http://localhost:8080

**Swagger UI:** http://localhost:8080/swagger-ui.html  
**OpenAPI Docs:** http://localhost:8080/api-docs

## API Documentation

The API includes comprehensive Swagger/OpenAPI documentation. Once the application is running, visit:

- **Swagger UI (Interactive):** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/api-docs

You can test all endpoints directly from the Swagger UI interface.

## API Endpoints

### 1. Market Statistics
```
GET /api/market/statistics
```

Query Parameters:
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `minBedrooms` (optional): Minimum bedrooms filter
- `maxBedrooms` (optional): Maximum bedrooms filter
- `minSquareFootage` (optional): Minimum square footage filter
- `maxSquareFootage` (optional): Maximum square footage filter

Response:
```json
{
  "totalProperties": 50,
  "averagePrice": 285000.0,
  "averageSquareFootage": 1850.5,
  "pricePerSquareFoot": 154.0,
  "minPrice": 150000.0,
  "maxPrice": 500000.0,
  "averagePriceByBedrooms": {
    "2": 220000.0,
    "3": 285000.0,
    "4": 350000.0
  },
  "propertyCountByBedrooms": {
    "2": 12,
    "3": 25,
    "4": 13
  }
}
```

### 2. Property Listings
```
GET /api/market/properties
```

Query Parameters: Same as statistics endpoint

Response:
```json
[
  {
    "id": 1,
    "squareFootage": 1500.0,
    "bedrooms": 3,
    "bathrooms": 2.0,
    "yearBuilt": 2000,
    "lotSize": 7000.0,
    "distanceToCityCenter": 5.0,
    "schoolRating": 7.5,
    "price": 285000.0
  }
]
```

### 3. Property Segments
```
GET /api/market/segments
```

Response:
```json
{
  "priceSegments": {
    "Under 200K": 10,
    "200K-300K": 20,
    "300K-400K": 15,
    "Over 400K": 5
  },
  "bedroomSegments": {
    "2": 12,
    "3": 25,
    "4": 13
  },
  "ageSegments": {
    "New (0-5 years)": 8,
    "Modern (6-15 years)": 15,
    "Established (16-30 years)": 20,
    "Older (30+ years)": 7
  }
}
```

### 4. What-If Analysis
```
POST /api/market/what-if
```

Request Body:
```json
{
  "squareFootage": 1500,
  "bedrooms": 3,
  "bathrooms": 2,
  "yearBuilt": 2000,
  "lotSize": 7000,
  "distanceToCityCenter": 5,
  "schoolRating": 7.5,
  "priceChangePercent": 5,
  "interestRate": 4.5,
  "downPaymentPercent": 20
}
```

Response:
```json
{
  "predictedPrice": 285000.0,
  "adjustedPrice": 299250.0,
  "downPaymentAmount": 59850.0,
  "loanAmount": 239400.0,
  "monthlyPayment": 1213.37,
  "totalInterest": 197613.2
}
```

### 5. Health Check
```
GET /api/market/health
```

Response:
```json
{
  "status": "healthy",
  "service": "Market Analysis API",
  "version": "1.0.0"
}
```

## Caching

The application uses Caffeine cache with the following configuration:
- Maximum cache size: 500 entries
- Expiration: 5 minutes (300 seconds)
- Cached endpoints:
  - `/api/market/statistics`
  - `/api/market/segments`

## ML Model Integration

The what-if analysis endpoint integrates with the ML model container:
- Default URL: `http://localhost:5001/api` (Node.js backend)
- Falls back to simple estimation if ML model is unavailable
- Calls `/predict` endpoint for price predictions

## Data Loading

The application loads data from `../House Price Dataset.csv` on startup.
If the CSV file is not found, it generates mock data for testing.

## Testing

### Test Statistics Endpoint
```bash
curl http://localhost:8080/api/market/statistics
```

### Test with Filters
```bash
curl "http://localhost:8080/api/market/statistics?minPrice=200000&maxPrice=400000&minBedrooms=3"
```

### Test Properties Endpoint
```bash
curl http://localhost:8080/api/market/properties
```

### Test Segments Endpoint
```bash
curl http://localhost:8080/api/market/segments
```

### Test What-If Analysis
```bash
curl -X POST http://localhost:8080/api/market/what-if \
  -H "Content-Type: application/json" \
  -d '{
    "squareFootage": 1500,
    "bedrooms": 3,
    "bathrooms": 2,
    "yearBuilt": 2000,
    "lotSize": 7000,
    "distanceToCityCenter": 5,
    "schoolRating": 7.5,
    "priceChangePercent": 5,
    "interestRate": 4.5,
    "downPaymentPercent": 20
  }'
```

## Docker Support

### Build Docker Image
```bash
docker build -t housing-price-java .
```

### Run Docker Container
```bash
docker run -p 8080:8080 housing-price-java
```

## Frontend Integration

Update the Next.js frontend to use the Java backend:

```typescript
// In nextjs-portal/app/market-analysis/page.tsx
const API_URL = 'http://localhost:8080/api/market'

// Fetch statistics
const response = await fetch(`${API_URL}/statistics`)
const stats = await response.json()

// Fetch properties with filters
const response = await fetch(`${API_URL}/properties?minPrice=200000&maxPrice=400000`)
const properties = await response.json()

// What-if analysis
const response = await fetch(`${API_URL}/what-if`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(whatIfRequest)
})
const result = await response.json()
```

## Architecture

```
backend-java/
├── src/main/java/com/housingprice/
│   ├── HousingPriceApplication.java    # Main application
│   ├── controller/
│   │   └── MarketAnalysisController.java  # REST endpoints
│   ├── service/
│   │   ├── DataLoaderService.java         # CSV data loading
│   │   └── MarketAnalysisService.java     # Business logic
│   └── model/
│       ├── Property.java                  # Property entity
│       ├── MarketStatistics.java          # Statistics DTO
│       ├── PropertyFilter.java            # Filter criteria
│       ├── WhatIfRequest.java             # What-if request
│       └── WhatIfResponse.java            # What-if response
├── src/main/resources/
│   └── application.properties             # Configuration
├── pom.xml                                # Maven dependencies
└── README.md                              # This file
```

## Dependencies

- Spring Boot 3.2.0
- Spring Boot Web
- Spring Boot Cache
- Caffeine Cache
- OpenCSV
- Lombok

## Performance Optimization

1. **Caching**: Statistics and segments are cached for 5 minutes
2. **Lazy Loading**: Data is loaded once on startup
3. **Stream API**: Efficient filtering and aggregation
4. **Connection Pooling**: RestTemplate for ML model calls

## Notes

- Ensure the ML model backend (Node.js on port 5001 or Python on port 8000) is running for what-if analysis
- The application will work without the ML model but will use fallback estimation
- Cache can be configured in `application.properties`
- CORS is enabled for all origins (configure for production)

## Production Considerations

1. Configure proper CORS origins
2. Add authentication/authorization
3. Use Redis for distributed caching
4. Add rate limiting
5. Implement proper error handling
6. Add API documentation (Swagger/OpenAPI)
7. Configure logging levels
8. Add monitoring and metrics
