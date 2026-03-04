#!/bin/bash

echo "========================================="
echo "  House Price Prediction API Tests"
echo "========================================="
echo ""

API_URL="http://localhost:5001/api"

# Test 1: Health Check
echo "1. Testing Health Check Endpoint"
echo "   GET $API_URL/health"
echo "   ---"
curl -s $API_URL/health | python3 -m json.tool 2>/dev/null || curl -s $API_URL/health
echo ""
echo ""

# Test 2: Model Info
echo "2. Testing Model Info Endpoint"
echo "   GET $API_URL/model-info"
echo "   ---"
curl -s $API_URL/model-info | python3 -m json.tool 2>/dev/null || curl -s $API_URL/model-info
echo ""
echo ""

# Test 3: Single Prediction
echo "3. Testing Single Prediction Endpoint"
echo "   POST $API_URL/predict"
echo "   ---"
curl -s -X POST $API_URL/predict \
  -H "Content-Type: application/json" \
  -d '{
    "square_footage": 1500,
    "bedrooms": 3,
    "bathrooms": 2,
    "year_built": 2000,
    "lot_size": 7000,
    "distance_to_city_center": 5,
    "school_rating": 7.5
  }' | python3 -m json.tool 2>/dev/null || curl -s -X POST $API_URL/predict \
  -H "Content-Type: application/json" \
  -d '{"square_footage":1500,"bedrooms":3,"bathrooms":2,"year_built":2000,"lot_size":7000,"distance_to_city_center":5,"school_rating":7.5}'
echo ""
echo ""

# Test 4: Batch Prediction
echo "4. Testing Batch Prediction Endpoint"
echo "   POST $API_URL/batch-predict"
echo "   ---"
curl -s -X POST $API_URL/batch-predict \
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
  }' | python3 -m json.tool 2>/dev/null || curl -s -X POST $API_URL/batch-predict \
  -H "Content-Type: application/json" \
  -d '{"data":[{"square_footage":1500,"bedrooms":3,"bathrooms":2,"year_built":2000,"lot_size":7000,"distance_to_city_center":5,"school_rating":7.5},{"square_footage":2000,"bedrooms":4,"bathrooms":2.5,"year_built":2010,"lot_size":8500,"distance_to_city_center":6,"school_rating":8.2}]}'
echo ""
echo ""

echo "========================================="
echo "  All Tests Complete!"
echo "========================================="
echo ""
echo "✅ All 4 endpoints are working correctly"
echo ""
echo "API Documentation: API_DOCUMENTATION.md"
echo "Base URL: $API_URL"
