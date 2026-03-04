// Example of Server Component with initial data loading
// This demonstrates proper use of React Server Components
// Rename this file to page.tsx to use it (backup current page.tsx first)

import Link from 'next/link'
import { getModelInfo, getHealthStatus } from '@/lib/api'

export default async function Home() {
  // Server-side data fetching - runs on the server
  // This data is fetched at build time or on-demand (depending on caching strategy)
  const [modelInfo, healthStatus] = await Promise.all([
    getModelInfo(),
    getHealthStatus()
  ])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          House Price Portal
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive property analysis and valuation platform
        </p>
        
        {/* Server-rendered status indicator */}
        {healthStatus && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System Status: {healthStatus.status}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* App 1: Property Value Estimator */}
        <Link href="/estimator" className="group">
          <div className="card hover:shadow-xl transition-shadow duration-300 h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white text-2xl mr-4">
                🏠
              </div>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                Property Value Estimator
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Get instant property valuations using our advanced machine learning model.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Instant price predictions
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Historical estimates tracking
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Side-by-side property comparison
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Visual charts and analytics
              </li>
            </ul>
            <div className="mt-6">
              <span className="text-primary font-semibold group-hover:underline">
                Start Estimating →
              </span>
            </div>
          </div>
        </Link>

        {/* App 2: Property Market Analysis */}
        <Link href="/market-analysis" className="group">
          <div className="card hover:shadow-xl transition-shadow duration-300 h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
                📊
              </div>
              <h2 className="text-2xl font-bold group-hover:text-purple-600 transition-colors">
                Market Analysis
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Explore property market trends and perform what-if analysis.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Interactive market dashboard
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Property segment filters
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                What-if scenario analysis
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Export data (CSV, PDF)
              </li>
            </ul>
            <div className="mt-6">
              <span className="text-purple-600 font-semibold group-hover:underline">
                Explore Market →
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Features Section with Server-rendered Model Info */}
      <div className="mt-16 card">
        <h3 className="text-2xl font-bold mb-6 text-center">Platform Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h4 className="font-semibold mb-2">ML-Powered</h4>
            <p className="text-sm text-gray-600">
              Advanced machine learning models for accurate predictions
            </p>
            {modelInfo && (
              <p className="text-xs text-primary mt-2">
                R² Score: {(modelInfo.r2_score * 100).toFixed(2)}%
              </p>
            )}
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-semibold mb-2">Real-Time</h4>
            <p className="text-sm text-gray-600">
              Instant analysis and predictions with optimized performance
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📈</div>
            <h4 className="font-semibold mb-2">Data-Driven</h4>
            <p className="text-sm text-gray-600">
              Comprehensive analytics and visualizations for better insights
            </p>
            {modelInfo && (
              <p className="text-xs text-primary mt-2">
                {modelInfo.training_samples} training samples
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
