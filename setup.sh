#!/bin/bash

echo "🏠 House Price Predictor Setup Script"
echo "======================================"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python3 found: $(python3 --version)"
    PYTHON_AVAILABLE=true
else
    echo "❌ Python3 not found"
    PYTHON_AVAILABLE=false
fi

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "✅ Docker found: $(docker --version)"
    DOCKER_AVAILABLE=true
else
    echo "❌ Docker not found"
    DOCKER_AVAILABLE=false
fi

echo ""
echo "Setup Options:"
echo "1. Local Python Setup (requires Python 3.8+)"
echo "2. Docker Setup (requires Docker)"
echo "3. Exit"
echo ""
read -p "Choose an option (1-3): " choice

case $choice in
    1)
        if [ "$PYTHON_AVAILABLE" = false ]; then
            echo ""
            echo "❌ Python is not installed. Please install Python first:"
            echo "   - Install Xcode Command Line Tools: xcode-select --install"
            echo "   - Or install via Homebrew: brew install python"
            exit 1
        fi
        
        echo ""
        echo "🔧 Setting up Python environment..."
        
        cd backend
        python3 -m venv venv
        source venv/bin/activate
        
        echo "📦 Installing Python dependencies..."
        pip install -r requirements.txt
        
        echo "🤖 Training ML model..."
        python train_model.py
        
        echo ""
        echo "✅ Backend setup complete!"
        echo ""
        echo "To start the backend:"
        echo "  cd backend"
        echo "  source venv/bin/activate"
        echo "  python app.py"
        echo ""
        echo "To start the frontend (in a new terminal):"
        echo "  cd frontend"
        echo "  npm install"
        echo "  npm run dev"
        ;;
        
    2)
        if [ "$DOCKER_AVAILABLE" = false ]; then
            echo ""
            echo "❌ Docker is not installed. Please install Docker first:"
            echo "   Visit: https://docs.docker.com/desktop/install/mac-install/"
            exit 1
        fi
        
        echo ""
        echo "🐳 Building Docker containers..."
        docker-compose build
        
        echo ""
        echo "✅ Docker setup complete!"
        echo ""
        echo "To start the application:"
        echo "  docker-compose up"
        echo ""
        echo "To stop the application:"
        echo "  docker-compose down"
        ;;
        
    3)
        echo "Exiting..."
        exit 0
        ;;
        
    *)
        echo "Invalid option"
        exit 1
        ;;
esac
