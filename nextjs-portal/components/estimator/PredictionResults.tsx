'use client'

import { Prediction } from '@/app/estimator/page'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PredictionResultsProps {
  prediction: Prediction
}

export default function PredictionResults({ prediction }: PredictionResultsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const chartData = [
    { name: 'Sq Ft', value: prediction.features.square_footage },
    { name: 'Bedrooms', value: prediction.features.bedrooms * 500 },
    { name: 'Bathrooms', value: prediction.features.bathrooms * 500 },
    { name: 'Lot Size', value: prediction.features.lot_size / 10 },
    { name: 'School', value: prediction.features.school_rating * 100 },
  ]

  return (
    <div className="card animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Estimated Value</h2>
      
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-center mb-6">
        <p className="text-white text-sm mb-2">Predicted Price</p>
        <p className="text-white text-5xl font-bold">
          {formatPrice(prediction.predictedPrice)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Square Footage</p>
          <p className="text-lg font-semibold">{prediction.features.square_footage.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Bedrooms</p>
          <p className="text-lg font-semibold">{prediction.features.bedrooms}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Bathrooms</p>
          <p className="text-lg font-semibold">{prediction.features.bathrooms}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Year Built</p>
          <p className="text-lg font-semibold">{prediction.features.year_built}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Lot Size</p>
          <p className="text-lg font-semibold">{prediction.features.lot_size.toLocaleString()} sq ft</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Distance to City</p>
          <p className="text-lg font-semibold">{prediction.features.distance_to_city_center} mi</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg col-span-2">
          <p className="text-sm text-gray-600">School Rating</p>
          <p className="text-lg font-semibold">{prediction.features.school_rating}/10</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Feature Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
