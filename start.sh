#!/bin/bash

echo "🏠 House Price Predictor - Quick Start"
echo "======================================"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend-node
npm install

# Check if model exists
if [ ! -f "model.json" ]; then
    echo ""
    echo "🤖 Training ML model (first time only)..."
    npm run train
    echo ""
fi

# Start backend
echo "🚀 Starting backend server..."
npm start &
BACKEND_PID=$!

cd ..

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Wait for backend
sleep 3

# Start frontend
echo ""
echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "✅ Application started!"
echo ""
echo "📍 Backend:  http://localhost:5000"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Trap Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Wait
wait
