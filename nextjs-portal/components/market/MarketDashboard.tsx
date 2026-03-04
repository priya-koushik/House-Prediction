'use client'

import { MarketData } from '@/app/market-analysis/page'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface MarketDashboardProps {
  data: MarketData[]
}

export default function MarketDashboard({ data }: MarketDashboardProps) {
  // Calculate statistics
  const avgPrice = data.reduce((sum, d) => sum + d.price, 0) / data.length
  const avgSqFt = data.reduce((sum, d) => sum + d.square_footage, 0) / data.length
  const pricePerSqFt = avgPrice / avgSqFt

  // Price distribution by bedrooms
  const bedroomData = [2, 3, 4, 5].map(beds => ({
    bedrooms: `${beds} BR`,
    avgPrice: data.filter(d => d.bedrooms === beds).reduce((sum, d) => sum + d.price, 0) / 
              data.filter(d => d.bedrooms === beds).length || 0,
    count: data.filter(d => d.bedrooms === beds).length
  }))

  // Price vs Square Footage
  const priceVsSqFt = data.slice(0, 20).map(d => ({
    sqft: Math.round(d.square_footage),
    price: Math.round(d.price / 1000)
  }))

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe']

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Properties</p>
          <p className="text-3xl font-bold text-primary">{data.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Avg Price</p>
          <p className="text-3xl font-bold text-primary">
            ${Math.round(avgPrice / 1000)}K
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Avg Sq Ft</p>
          <p className="text-3xl font-bold text-primary">
            {Math.round(avgSqFt).toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Price/Sq Ft</p>
          <p className="text-3xl font-bold text-primary">
            ${Math.round(pricePerSqFt)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Average Price by Bedrooms</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bedroomData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bedrooms" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${Math.round(value / 1000)}K`} />
              <Bar dataKey="avgPrice" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Price vs Square Footage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={priceVsSqFt}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sqft" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value}K`} />
              <Line type="monotone" dataKey="price" stroke="#764ba2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Property Listings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">ID</th>
                <th className="text-left py-2">Sq Ft</th>
                <th className="text-left py-2">Bed/Bath</th>
                <th className="text-left py-2">Year</th>
                <th className="text-right py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((property) => (
                <tr key={property.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{property.id}</td>
                  <td className="py-2">{Math.round(property.square_footage).toLocaleString()}</td>
                  <td className="py-2">{property.bedrooms}/{property.bathrooms}</td>
                  <td className="py-2">{property.year_built}</td>
                  <td className="py-2 text-right font-semibold">
                    ${Math.round(property.price / 1000)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
