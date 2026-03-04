'use client'

interface BatchResult {
  index: number
  features: any
  predictedPrice: number
}

interface BatchResultsProps {
  results: BatchResult[]
  onClear: () => void
}

export default function BatchResults({ results, onClear }: BatchResultsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const totalValue = results.reduce((sum, r) => sum + r.predictedPrice, 0)
  const avgValue = totalValue / results.length

  const exportToCSV = () => {
    const headers = ['Property #', 'Square Footage', 'Bedrooms', 'Bathrooms', 'Year Built', 'Lot Size', 'Distance', 'School Rating', 'Predicted Price']
    const rows = results.map(r => [
      r.index + 1,
      r.features.square_footage,
      r.features.bedrooms,
      r.features.bathrooms,
      r.features.year_built,
      r.features.lot_size,
      r.features.distance_to_city_center,
      r.features.school_rating,
      r.predictedPrice
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `batch-predictions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Batch Prediction Results</h2>
          <p className="text-gray-600">{results.length} properties analyzed</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            📊 Export CSV
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Total Properties</p>
          <p className="text-3xl font-bold">{results.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Total Value</p>
          <p className="text-3xl font-bold">{formatPrice(totalValue)}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Average Value</p>
          <p className="text-3xl font-bold">{formatPrice(avgValue)}</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 px-2">#</th>
              <th className="text-left py-3 px-2">Sq Ft</th>
              <th className="text-left py-3 px-2">Bed</th>
              <th className="text-left py-3 px-2">Bath</th>
              <th className="text-left py-3 px-2">Year</th>
              <th className="text-left py-3 px-2">Lot Size</th>
              <th className="text-left py-3 px-2">Distance</th>
              <th className="text-left py-3 px-2">School</th>
              <th className="text-right py-3 px-2 font-semibold">Predicted Price</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr 
                key={result.index} 
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-2 font-semibold">{result.index + 1}</td>
                <td className="py-3 px-2">{result.features.square_footage.toLocaleString()}</td>
                <td className="py-3 px-2">{result.features.bedrooms}</td>
                <td className="py-3 px-2">{result.features.bathrooms}</td>
                <td className="py-3 px-2">{result.features.year_built}</td>
                <td className="py-3 px-2">{result.features.lot_size.toLocaleString()}</td>
                <td className="py-3 px-2">{result.features.distance_to_city_center} mi</td>
                <td className="py-3 px-2">{result.features.school_rating}/10</td>
                <td className="py-3 px-2 text-right font-bold text-primary">
                  {formatPrice(result.predictedPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Lowest:</span>
              <span className="font-semibold">
                {formatPrice(Math.min(...results.map(r => r.predictedPrice)))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Highest:</span>
              <span className="font-semibold">
                {formatPrice(Math.max(...results.map(r => r.predictedPrice)))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Range:</span>
              <span className="font-semibold">
                {formatPrice(
                  Math.max(...results.map(r => r.predictedPrice)) - 
                  Math.min(...results.map(r => r.predictedPrice))
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Property Stats</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Square Footage:</span>
              <span className="font-semibold">
                {Math.round(results.reduce((sum, r) => sum + r.features.square_footage, 0) / results.length).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Bedrooms:</span>
              <span className="font-semibold">
                {(results.reduce((sum, r) => sum + r.features.bedrooms, 0) / results.length).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg School Rating:</span>
              <span className="font-semibold">
                {(results.reduce((sum, r) => sum + r.features.school_rating, 0) / results.length).toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
