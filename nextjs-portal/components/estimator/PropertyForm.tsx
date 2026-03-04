'use client'

import { useState } from 'react'
import { PropertyFeatures } from '@/app/estimator/page'

interface PropertyFormProps {
  onSubmit: (features: PropertyFeatures) => void
  loading: boolean
}

export default function PropertyForm({ onSubmit, loading }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFeatures>({
    square_footage: 1500,
    bedrooms: 3,
    bathrooms: 2,
    year_built: 2000,
    lot_size: 7000,
    distance_to_city_center: 5,
    school_rating: 7.5
  })

  const [errors, setErrors] = useState<Partial<Record<keyof PropertyFeatures, string>>>({})

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyFeatures, string>> = {}

    if (formData.square_footage <= 0) {
      newErrors.square_footage = 'Must be greater than 0'
    }
    if (formData.bedrooms < 1) {
      newErrors.bedrooms = 'Must be at least 1'
    }
    if (formData.bathrooms <= 0) {
      newErrors.bathrooms = 'Must be greater than 0'
    }
    if (formData.year_built < 1800 || formData.year_built > 2024) {
      newErrors.year_built = 'Must be between 1800 and 2024'
    }
    if (formData.lot_size <= 0) {
      newErrors.lot_size = 'Must be greater than 0'
    }
    if (formData.distance_to_city_center < 0) {
      newErrors.distance_to_city_center = 'Must be 0 or greater'
    }
    if (formData.school_rating < 0 || formData.school_rating > 10) {
      newErrors.school_rating = 'Must be between 0 and 10'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof PropertyFeatures, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Property Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="square_footage">
            Square Footage
          </label>
          <input
            id="square_footage"
            type="number"
            className={`input-field ${errors.square_footage ? 'border-red-500' : ''}`}
            value={formData.square_footage}
            onChange={(e) => handleChange('square_footage', e.target.value)}
            required
            aria-describedby={errors.square_footage ? 'square_footage-error' : undefined}
          />
          {errors.square_footage && (
            <p id="square_footage-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.square_footage}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="bedrooms">
            Bedrooms
          </label>
          <input
            id="bedrooms"
            type="number"
            className={`input-field ${errors.bedrooms ? 'border-red-500' : ''}`}
            value={formData.bedrooms}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
            required
            aria-describedby={errors.bedrooms ? 'bedrooms-error' : undefined}
          />
          {errors.bedrooms && (
            <p id="bedrooms-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.bedrooms}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="bathrooms">
            Bathrooms
          </label>
          <input
            id="bathrooms"
            type="number"
            step="0.5"
            className={`input-field ${errors.bathrooms ? 'border-red-500' : ''}`}
            value={formData.bathrooms}
            onChange={(e) => handleChange('bathrooms', e.target.value)}
            required
            aria-describedby={errors.bathrooms ? 'bathrooms-error' : undefined}
          />
          {errors.bathrooms && (
            <p id="bathrooms-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.bathrooms}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="year_built">
            Year Built
          </label>
          <input
            id="year_built"
            type="number"
            className={`input-field ${errors.year_built ? 'border-red-500' : ''}`}
            value={formData.year_built}
            onChange={(e) => handleChange('year_built', e.target.value)}
            required
            aria-describedby={errors.year_built ? 'year_built-error' : undefined}
          />
          {errors.year_built && (
            <p id="year_built-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.year_built}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="lot_size">
            Lot Size (sq ft)
          </label>
          <input
            id="lot_size"
            type="number"
            className={`input-field ${errors.lot_size ? 'border-red-500' : ''}`}
            value={formData.lot_size}
            onChange={(e) => handleChange('lot_size', e.target.value)}
            required
            aria-describedby={errors.lot_size ? 'lot_size-error' : undefined}
          />
          {errors.lot_size && (
            <p id="lot_size-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.lot_size}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="distance_to_city_center">
            Distance to City Center (miles)
          </label>
          <input
            id="distance_to_city_center"
            type="number"
            step="0.1"
            className={`input-field ${errors.distance_to_city_center ? 'border-red-500' : ''}`}
            value={formData.distance_to_city_center}
            onChange={(e) => handleChange('distance_to_city_center', e.target.value)}
            required
            aria-describedby={errors.distance_to_city_center ? 'distance_error' : undefined}
          />
          {errors.distance_to_city_center && (
            <p id="distance_error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.distance_to_city_center}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="school_rating">
            School Rating (0-10)
          </label>
          <input
            id="school_rating"
            type="number"
            step="0.1"
            className={`input-field ${errors.school_rating ? 'border-red-500' : ''}`}
            value={formData.school_rating}
            onChange={(e) => handleChange('school_rating', e.target.value)}
            required
            aria-describedby={errors.school_rating ? 'school_rating-error' : undefined}
          />
          {errors.school_rating && (
            <p id="school_rating-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.school_rating}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Estimating...' : 'Get Estimate'}
        </button>
      </form>
    </div>
  )
}
