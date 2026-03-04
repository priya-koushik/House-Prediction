#!/bin/bash

echo "🏠 Starting Java Backend for Market Analysis"
echo "============================================"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed."
    echo ""
    echo "To install Java 17 and Maven:"
    echo "  brew install openjdk@17 maven"
    echo ""
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed."
    echo ""
    echo "To install Maven:"
    echo "  brew install maven"
    echo ""
    exit 1
fi

echo "✅ Java version:"
java -version 2>&1 | head -1

echo ""
echo "✅ Maven version:"
mvn -version 2>&1 | head -1

echo ""
echo "📦 Building Java backend..."
cd backend-java
mvn clean install -DskipTests

echo ""
echo "🚀 Starting Java backend on port 8080..."
echo ""
echo "📍 API Base URL: http://localhost:8080/api/market"
echo "📍 Health Check: http://localhost:8080/api/market/health"
echo ""
echo "Press Ctrl+C to stop"
echo ""

mvn spring-boot:run
