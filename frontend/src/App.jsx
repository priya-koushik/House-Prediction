import { useState } from 'react'
import PredictionForm from './components/PredictionForm'
import PredictionResult from './components/PredictionResult'
import './App.css'

function App() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="app">
      <header className="header">
        <h1>🏠 House Price Predictor</h1>
        <p>Get instant price predictions based on property features</p>
      </header>
      
      <main className="main">
        <PredictionForm 
          setPrediction={setPrediction}
          setLoading={setLoading}
          loading={loading}
        />
        
        {prediction && <PredictionResult prediction={prediction} />}
      </main>
      
      <footer className="footer">
        <p>Powered by Machine Learning</p>
      </footer>
    </div>
  )
}

export default App
