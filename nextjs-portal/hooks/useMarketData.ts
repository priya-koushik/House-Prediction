import { useState, useEffect, useMemo } from 'react'

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

const API_URL = 'http://localhost:8080/api/market'

export function useMarketData(filters?: FilterCriteria) {
  const [data, setData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Build query string from filters
        const params = new URLSearchParams()
        if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
        if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
        if (filters?.minBedrooms) params.append('minBedrooms', filters.minBedrooms.toString())
        if (filters?.maxBedrooms) params.append('maxBedrooms', filters.maxBedrooms.toString())
        if (filters?.minSquareFeet) params.append('minSquareFootage', filters.minSquareFeet.toString())
        if (filters?.maxSquareFeet) params.append('maxSquareFootage', filters.maxSquareFeet.toString())
        
        const queryString = params.toString()
        const url = queryString ? `${API_URL}/properties?${queryString}` : `${API_URL}/properties`
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch market data: ${response.statusText}`)
        }
        
        const marketData = await response.json()
        setData(marketData)
      } catch (err) {
        // Fallback to mock data if API is not available
        console.warn('API not available, using mock data:', err)
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
        setData(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filters])

  // Memoized filtered data (client-side filtering as backup)
  const filteredData = useMemo(() => {
    if (!filters) return data
    
    return data.filter(item => {
      if (filters.minPrice && item.price < filters.minPrice) return false
      if (filters.maxPrice && item.price > filters.maxPrice) return false
      if (filters.minBedrooms && item.bedrooms < filters.minBedrooms) return false
      if (filters.maxBedrooms && item.bedrooms > filters.maxBedrooms) return false
      if (filters.minSquareFeet && item.square_footage < filters.minSquareFeet) return false
      if (filters.maxSquareFeet && item.square_footage > filters.maxSquareFeet) return false
      return true
    })
  }, [data, filters])

  return { data: filteredData, loading, error }
}
