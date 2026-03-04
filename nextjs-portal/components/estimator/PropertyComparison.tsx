'use client'

import { Prediction } from '@/app/estimator/page'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PropertyComparisonProps {
  properties: Prediction[]
}

export default function PropertyComparison({ properties }: PropertyComparisonProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const chartData = [
    {
      name: 'Price',
      ...properties.reduce((acc, p, i) => ({
        ...acc,
        [`Property ${i + 1}`]: p.predictedPrice
      }), {})
    },
    {
      name: 'Sq Ft',
      ...properties.reduce((acc, p, i) => ({
        ...acc,
        [`Property ${i + 1}`]: p.features.square_footage
      }), {})
    },
    {
      name: 'Bedrooms',
      ...properties.reduce((acc, p, i) => ({
        ...acc,
        [`Property ${i + 1}`]: p.features.bedrooms
      }), {})
    }
  ]

  const colors = ['#667eea', '#764ba2', '#f093fb']

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Property Comparison</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {properties.map((property, index) => (
          <div key={property.id} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3" style={{ color: colors[index] }}>
              Property {index + 1}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">{formatPrice(property.predictedPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sq Ft:</span>
                <span>{property.features.square_footage.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bed/Bath:</span>
                <span>{property.features.bedrooms}/{property.features.bathrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span>{property.features.year_built}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">School:</span>
                <span>{property.features.school_rating}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Visual Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {properties.map((_, index) => (
              <Bar 
                key={index}
                dataKey={`Property ${index + 1}`}
                fill={colors[index]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
