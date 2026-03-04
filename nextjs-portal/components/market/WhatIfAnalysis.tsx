'use client'

import { useState } from 'react'

export default function WhatIfAnalysis() {
  const [scenario, setScenario] = useState({
    priceChange: 0,
    interestRate: 4.5,
    downPayment: 20
  })

  const [result, setResult] = useState<any>(null)

  const calculateScenario = async () => {
    try {
      // Call Java backend what-if analysis endpoint
      const response = await fetch('http://localhost:8080/api/market/what-if', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          squareFootage: 1500,
          bedrooms: 3,
          bathrooms: 2,
          yearBuilt: 2010,
          lotSize: 7000,
          distanceToCityCenter: 5,
          schoolRating: 7.5,
          priceChangePercent: scenario.priceChange,
          interestRate: scenario.interestRate,
          downPaymentPercent: scenario.downPayment
        })
      })

      if (!response.ok) {
        throw new Error('Failed to calculate scenario')
      }

      const data = await response.json()
      setResult({
        newPrice: data.adjustedPrice,
        downPaymentAmount: data.downPaymentAmount,
        loanAmount: data.loanAmount,
        monthlyPayment: data.monthlyPayment
      })
    } catch (error) {
      console.error('Error calculating scenario:', error)
      // Fallback to client-side calculation
      const basePrice = 300000
      const newPrice = basePrice * (1 + scenario.priceChange / 100)
      const loanAmount = newPrice * (1 - scenario.downPayment / 100)
      const monthlyRate = scenario.interestRate / 100 / 12
      const numPayments = 360 // 30 years
      
      const monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)

      setResult({
        newPrice,
        downPaymentAmount: newPrice * (scenario.downPayment / 100),
        loanAmount,
        monthlyPayment
      })
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">What-If Analysis</h3>
      <p className="text-sm text-gray-600 mb-4">
        Explore different scenarios and see how they affect your investment
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="label">
            Price Change (%)
            <span className="ml-2 text-primary font-semibold">{scenario.priceChange}%</span>
          </label>
          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={scenario.priceChange}
            onChange={(e) => setScenario({ ...scenario, priceChange: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="label">
            Interest Rate (%)
            <span className="ml-2 text-primary font-semibold">{scenario.interestRate}%</span>
          </label>
          <input
            type="range"
            min="2"
            max="8"
            step="0.1"
            value={scenario.interestRate}
            onChange={(e) => setScenario({ ...scenario, interestRate: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="label">
            Down Payment (%)
            <span className="ml-2 text-primary font-semibold">{scenario.downPayment}%</span>
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={scenario.downPayment}
            onChange={(e) => setScenario({ ...scenario, downPayment: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      <button
        onClick={calculateScenario}
        className="btn-primary w-full mb-4"
      >
        Calculate Scenario
      </button>

      {result && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">New Price:</span>
            <span className="font-semibold">${Math.round(result.newPrice).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Down Payment:</span>
            <span className="font-semibold">${Math.round(result.downPaymentAmount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Loan Amount:</span>
            <span className="font-semibold">${Math.round(result.loanAmount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600">Monthly Payment:</span>
            <span className="font-bold text-primary text-lg">
              ${Math.round(result.monthlyPayment).toLocaleString()}/mo
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
