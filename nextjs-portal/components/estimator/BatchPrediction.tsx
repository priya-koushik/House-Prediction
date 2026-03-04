'use client'

import { useState } from 'react'
import { PropertyFeatures } from '@/app/estimator/page'

interface BatchPredictionProps {
  onBatchPredict: (properties: PropertyFeatures[]) => void
}

export default function BatchPrediction({ onBatchPredict }: BatchPredictionProps) {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file')
      return
    }

    setCsvFile(file)
    setError(null)
  }

  const parseCSV = (text: string): PropertyFeatures[] => {
    const lines = text.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim())
    
    const properties: PropertyFeatures[] = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const property: any = {}
      
      headers.forEach((header, index) => {
        const value = values[index]
        property[header] = parseFloat(value) || 0
      })
      
      properties.push(property as PropertyFeatures)
    }
    
    return properties
  }

  const handleSubmit = async () => {
    if (!csvFile) {
      setError('Please select a CSV file')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const text = await csvFile.text()
      const properties = parseCSV(text)
      
      if (properties.length === 0) {
        throw new Error('No valid properties found in CSV')
      }

      await onBatchPredict(properties)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const downloadSampleCSV = () => {
    const sampleData = `square_footage,bedrooms,bathrooms,year_built,lot_size,distance_to_city_center,school_rating
1500,3,2,2000,7000,5,7.5
2000,4,2.5,2010,8500,6,8.2
1200,2,1,1995,5000,3,6.8
1800,3,2,2005,7500,4.5,7.9
2500,5,3,2015,10000,8,9.1`

    const blob = new Blob([sampleData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample-properties.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Batch Prediction</h2>
      <p className="text-gray-600 mb-6">
        Upload a CSV file with multiple properties to get predictions for all at once
      </p>

      <div className="space-y-4">
        {/* Download Sample */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 mb-2">
            Need a template? Download our sample CSV file
          </p>
          <button
            onClick={downloadSampleCSV}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            📥 Download Sample CSV
          </button>
        </div>

        {/* File Upload */}
        <div>
          <label className="label">Upload CSV File</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="input-field"
          />
          {csvFile && (
            <p className="text-sm text-green-600 mt-2">
              ✓ {csvFile.name} selected
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!csvFile || loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Get Batch Predictions'}
        </button>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">CSV Format Requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>First row must contain column headers</li>
            <li>Required columns: square_footage, bedrooms, bathrooms, year_built, lot_size, distance_to_city_center, school_rating</li>
            <li>Values should be numeric</li>
            <li>No empty rows</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
