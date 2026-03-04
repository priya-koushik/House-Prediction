#!/bin/bash

echo "🏠 Starting House Price Predictor (Docker Mode)"
echo "=============================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "🐳 Starting Docker containers..."
docker-compose up --build

echo ""
echo "To stop the application, press Ctrl+C or run:"
echo "  docker-compose down"
