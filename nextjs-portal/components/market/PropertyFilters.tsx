'use client'

import { FilterCriteria } from '@/app/market-analysis/page'

interface PropertyFiltersProps {
  filters: FilterCriteria
  onFilterChange: (filters: FilterCriteria) => void
}

export default function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  const handleChange = (field: keyof FilterCriteria, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value ? parseFloat(value) : undefined
    })
  }

  const clearFilters = () => {
    onFilterChange({})
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="input-field text-sm"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="input-field text-sm"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">Bedrooms</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="input-field text-sm"
              value={filters.minBedrooms || ''}
              onChange={(e) => handleChange('minBedrooms', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="input-field text-sm"
              value={filters.maxBedrooms || ''}
              onChange={(e) => handleChange('maxBedrooms', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">Square Feet</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="input-field text-sm"
              value={filters.minSquareFeet || ''}
              onChange={(e) => handleChange('minSquareFeet', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="input-field text-sm"
              value={filters.maxSquareFeet || ''}
              onChange={(e) => handleChange('maxSquareFeet', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
