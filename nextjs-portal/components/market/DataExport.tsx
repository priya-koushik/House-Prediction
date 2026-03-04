'use client'

import { MarketData } from '@/app/market-analysis/page'

interface DataExportProps {
  data: MarketData[]
}

export default function DataExport({ data }: DataExportProps) {
  const exportToCSV = () => {
    const headers = ['ID', 'Square Footage', 'Bedrooms', 'Bathrooms', 'Year Built', 'Lot Size', 'Distance', 'School Rating', 'Price']
    const rows = data.map(d => [
      d.id,
      d.square_footage,
      d.bedrooms,
      d.bathrooms,
      d.year_built,
      d.lot_size,
      d.distance_to_city_center,
      d.school_rating,
      d.price
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `market-data-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToPDF = () => {
    alert('PDF export would be implemented with a library like jsPDF')
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Export Data</h3>
      <div className="space-y-2">
        <button
          onClick={exportToCSV}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          📊 Export to CSV
        </button>
        <button
          onClick={exportToPDF}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          📄 Export to PDF
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {data.length} properties will be exported
      </p>
    </div>
  )
}
