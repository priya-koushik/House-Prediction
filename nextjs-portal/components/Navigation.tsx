'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏠</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              House Price Portal
            </span>
          </Link>
          
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link 
              href="/estimator" 
              className={`font-medium transition-colors ${isActive('/estimator')}`}
            >
              Property Estimator
            </Link>
            <Link 
              href="/market-analysis" 
              className={`font-medium transition-colors ${isActive('/market-analysis')}`}
            >
              Market Analysis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
