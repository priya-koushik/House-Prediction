#!/bin/bash

# Git Setup Script for House Price Prediction Project
# This script initializes git and pushes to GitHub

echo "🚀 Setting up Git repository..."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if README.md exists
if [ ! -f README.md ]; then
    echo "❌ README.md not found. Please create it first."
    exit 1
fi

# Add all files
echo ""
echo "📝 Adding files to Git..."
git add .

# Show status
echo ""
echo "📊 Git status:"
git status

# Commit
echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Complete fullstack house price prediction system

Features:
- Next.js 14 portal with two applications
- Property Value Estimator with ML predictions
- Market Analysis dashboard
- Three backend options (Node.js, Python, Java)
- Responsive design with WCAG compliance
- Comprehensive documentation
- Docker support"

# Set main branch
echo ""
echo "🌿 Setting main branch..."
git branch -M main

# Add remote (update with your repository URL)
echo ""
echo "🔗 Adding remote repository..."
REPO_URL="git@github.com:priya-koushik/House-Prediction.git"
git remote add origin $REPO_URL || git remote set-url origin $REPO_URL

# Show remote
echo ""
echo "📡 Remote repository:"
git remote -v

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
echo "⚠️  Make sure you have:"
echo "   1. Created the repository on GitHub"
echo "   2. Set up SSH keys or use HTTPS"
echo ""
read -p "Press Enter to push to GitHub (or Ctrl+C to cancel)..."

git push -u origin main

echo ""
echo "✅ Done! Your code is now on GitHub!"
echo "🌐 Visit: https://github.com/priya-koushik/House-Prediction"
echo ""
echo "📝 Next steps:"
echo "   1. Add a description to your GitHub repository"
echo "   2. Add topics/tags for better discoverability"
echo "   3. Enable GitHub Pages if you want to host documentation"
echo "   4. Set up GitHub Actions for CI/CD (optional)"
