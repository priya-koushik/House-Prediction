import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          House Price Portal
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive property analysis and valuation platform
        </p>
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

      {/* Features Section */}
      <div className="mt-16 card">
        <h3 className="text-2xl font-bold mb-6 text-center">Platform Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h4 className="font-semibold mb-2">ML-Powered</h4>
            <p className="text-sm text-gray-600">
              Advanced machine learning models for accurate predictions
            </p>
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
          </div>
        </div>
      </div>
    </div>
  )
}
