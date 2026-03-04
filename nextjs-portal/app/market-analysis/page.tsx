'use client'

import { useState, useEffect } from 'react'
import MarketDashboard from '@/components/market/MarketDashboard'
import PropertyFilters from '@/components/market/PropertyFilters'
import WhatIfAnalysis from '@/components/market/WhatIfAnalysis'
import DataExport from '@/components/market/DataExport'

export interface MarketData {
  id: number
  square_footage: number
  bedrooms: number
  bathrooms: number
  year_built: number
  lot_size: number
  distance_to_city_center: number
  school_rating: number
  price: number
}

export interface FilterCriteria {
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
  maxBedrooms?: number
  minSquareFeet?: number
  maxSquareFeet?: number
}

export default function MarketAnalysisPage() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [filteredData, setFilteredData] = useState<MarketData[]>([])
  const [filters, setFilters] = useState<FilterCriteria>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load market data from Java backend
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/market/properties')
        
        if (!response.ok) {
          throw new Error('Failed to fetch market data')
        }
        
        const data = await response.json()
        setMarketData(data)
        setFilteredData(data)
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to mock data if Java backend is not available
        const mockData: MarketData[] = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          square_footage: 1000 + Math.random() * 2000,
          bedrooms: Math.floor(2 + Math.random() * 3),
          bathrooms: 1 + Math.floor(Math.random() * 3),
          year_built: 1980 + Math.floor(Math.random() * 44),
          lot_size: 4000 + Math.random() * 7000,
          distance_to_city_center: Math.random() * 10,
          school_rating: 5 + Math.random() * 5,
          price: 150000 + Math.random() * 350000
        }))
        
        setMarketData(mockData)
        setFilteredData(mockData)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = [...marketData]

    if (filters.minPrice) {
      filtered = filtered.filter(d => d.price >= filters.minPrice!)
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(d => d.price <= filters.maxPrice!)
    }
    if (filters.minBedrooms) {
      filtered = filtered.filter(d => d.bedrooms >= filters.minBedrooms!)
    }
    if (filters.maxBedrooms) {
      filtered = filtered.filter(d => d.bedrooms <= filters.maxBedrooms!)
    }
    if (filters.minSquareFeet) {
      filtered = filtered.filter(d => d.square_footage >= filters.minSquareFeet!)
    }
    if (filters.maxSquareFeet) {
      filtered = filtered.filter(d => d.square_footage <= filters.maxSquareFeet!)
    }

    setFilteredData(filtered)
  }, [filters, marketData])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Property Market Analysis</h1>
        <p className="text-gray-600">
          Explore market trends and perform what-if analysis on property data
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilters filters={filters} onFilterChange={setFilters} />
          <div className="mt-6">
            <DataExport data={filteredData} />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <MarketDashboard data={filteredData} />
          <WhatIfAnalysis />
        </div>
      </div>
    </div>
  )
}
