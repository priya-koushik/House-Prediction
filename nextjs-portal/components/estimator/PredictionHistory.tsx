'use client'

import { Prediction } from '@/app/estimator/page'

interface PredictionHistoryProps {
  history: Prediction[]
  selectedForComparison: Prediction[]
  onToggleComparison: (prediction: Prediction) => void
}

export default function PredictionHistory({ 
  history, 
  selectedForComparison,
  onToggleComparison 
}: PredictionHistoryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const isSelected = (prediction: Prediction) => {
    return selectedForComparison.some(p => p.id === prediction.id)
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Prediction History</h2>
        <span className="text-sm text-gray-600">
          {selectedForComparison.length}/3 selected for comparison
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2">Time</th>
              <th className="text-left py-3 px-2">Sq Ft</th>
              <th className="text-left py-3 px-2">Bed/Bath</th>
              <th className="text-right py-3 px-2">Price</th>
              <th className="text-center py-3 px-2">Compare</th>
            </tr>
          </thead>
          <tbody>
            {history.map((prediction) => (
              <tr 
                key={prediction.id} 
                className={`border-b hover:bg-gray-50 transition-colors ${
                  isSelected(prediction) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="py-3 px-2 text-sm">
                  {formatDate(prediction.timestamp)}
                </td>
                <td className="py-3 px-2">
                  {prediction.features.square_footage.toLocaleString()}
                </td>
                <td className="py-3 px-2">
                  {prediction.features.bedrooms}bd / {prediction.features.bathrooms}ba
                </td>
                <td className="py-3 px-2 text-right font-semibold">
                  {formatPrice(prediction.predictedPrice)}
                </td>
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => onToggleComparison(prediction)}
                    className={`px-3 py-1 rounded text-sm ${
                      isSelected(prediction)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    disabled={!isSelected(prediction) && selectedForComparison.length >= 3}
                  >
                    {isSelected(prediction) ? 'Remove' : 'Compare'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
