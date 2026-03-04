'use client'

import { useState } from 'react'
import PropertyForm from '@/components/estimator/PropertyForm'
import PredictionResults from '@/components/estimator/PredictionResults'
import PredictionHistory from '@/components/estimator/PredictionHistory'
import PropertyComparison from '@/components/estimator/PropertyComparison'
import BatchPrediction from '@/components/estimator/BatchPrediction'
import BatchResults from '@/components/estimator/BatchResults'

export interface Prediction {
  id: string
  timestamp: Date
  features: PropertyFeatures
  predictedPrice: number
}

export interface PropertyFeatures {
  square_footage: number
  bedrooms: number
  bathrooms: number
  year_built: number
  lot_size: number
  distance_to_city_center: number
  school_rating: number
}

export default function EstimatorPage() {
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null)
  const [history, setHistory] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedForComparison, setSelectedForComparison] = useState<Prediction[]>([])
  const [batchResults, setBatchResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single')

  const handlePrediction = async (features: PropertyFeatures) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5001/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(features)
      })
      
      if (!response.ok) throw new Error('Prediction failed')
      
      const data = await response.json()
      
      const prediction: Prediction = {
        id: Date.now().toString(),
        timestamp: new Date(),
        features: features,
        predictedPrice: data.predicted_price
      }
      
      setCurrentPrediction(prediction)
      setHistory(prev => [prediction, ...prev])
    } catch (error) {
      alert('Error making prediction: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleBatchPrediction = async (properties: PropertyFeatures[]) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5001/api/batch-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: properties })
      })
      
      if (!response.ok) throw new Error('Batch prediction failed')
      
      const data = await response.json()
      
      const results = properties.map((features, index) => ({
        index,
        features,
        predictedPrice: data.predictions[index]
      }))
      
      setBatchResults(results)
      
      // Also add to history
      results.forEach((result) => {
        const prediction: Prediction = {
          id: Date.now().toString() + result.index,
          timestamp: new Date(),
          features: result.features,
          predictedPrice: result.predictedPrice
        }
        setHistory(prev => [prediction, ...prev])
      })
    } catch (error) {
      alert('Error making batch prediction: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const toggleComparison = (prediction: Prediction) => {
    setSelectedForComparison(prev => {
      const exists = prev.find(p => p.id === prediction.id)
      if (exists) {
        return prev.filter(p => p.id !== prediction.id)
      } else if (prev.length < 3) {
        return [...prev, prediction]
      }
      return prev
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Property Value Estimator</h1>
        <p className="text-gray-600">
          Enter property details to get an instant price estimate powered by machine learning
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('single')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'single'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Single Prediction
        </button>
        <button
          onClick={() => setActiveTab('batch')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'batch'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Batch Prediction
        </button>
      </div>

      {activeTab === 'single' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <PropertyForm onSubmit={handlePrediction} loading={loading} />
          </div>

          {/* Right Column - Results and History */}
          <div className="lg:col-span-2 space-y-6">
            {currentPrediction && (
              <PredictionResults prediction={currentPrediction} />
            )}
            
            {history.length > 0 && (
              <PredictionHistory 
                history={history}
                selectedForComparison={selectedForComparison}
                onToggleComparison={toggleComparison}
              />
            )}
            
            {selectedForComparison.length > 0 && (
              <PropertyComparison properties={selectedForComparison} />
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <BatchPrediction onBatchPredict={handleBatchPrediction} />
          
          {batchResults.length > 0 && (
            <BatchResults 
              results={batchResults}
              onClear={() => setBatchResults([])}
            />
          )}
        </div>
      )}
    </div>
  )
}
