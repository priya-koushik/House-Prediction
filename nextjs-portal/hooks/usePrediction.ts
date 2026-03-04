import { useState } from 'react'

export interface PropertyFeatures {
  square_footage: number
  bedrooms: number
  bathrooms: number
  year_built: number
  lot_size: number
  distance_to_city_center: number
  school_rating: number
}

export interface Prediction {
  id: string
  timestamp: Date
  features: PropertyFeatures
  predictedPrice: number
}

const API_URL = 'http://localhost:5001/api'

export function usePrediction() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const predict = async (features: PropertyFeatures): Promise<Prediction | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(features)
      })
      
      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      const prediction: Prediction = {
        id: Date.now().toString(),
        timestamp: new Date(),
        features: features,
        predictedPrice: data.predicted_price
      }
      
      return prediction
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const batchPredict = async (properties: PropertyFeatures[]): Promise<Prediction[] | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/batch-predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: properties })
      })
      
      if (!response.ok) {
        throw new Error(`Batch prediction failed: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      const predictions: Prediction[] = properties.map((features, index) => ({
        id: `${Date.now()}-${index}`,
        timestamp: new Date(),
        features: features,
        predictedPrice: data.predictions[index]
      }))
      
      return predictions
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { predict, batchPredict, loading, error }
}
