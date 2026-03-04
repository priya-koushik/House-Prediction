import { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5001/api'

function PredictionForm({ setPrediction, setLoading, loading }) {
  const [formData, setFormData] = useState({
    square_footage: '',
    bedrooms: '',
    bathrooms: '',
    year_built: '',
    lot_size: '',
    distance_to_city_center: '',
    school_rating: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await axios.post(`${API_URL}/predict`, formData)
      setPrediction(response.data)
    } catch (error) {
      alert('Error making prediction: ' + (error.response?.data?.error || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <h2>Enter Property Details</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Square Footage</label>
          <input
            type="number"
            name="square_footage"
            value={formData.square_footage}
            onChange={handleChange}
            required
            placeholder="e.g., 1500"
          />
        </div>

        <div className="form-group">
          <label>Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            placeholder="e.g., 3"
          />
        </div>

        <div className="form-group">
          <label>Bathrooms</label>
          <input
            type="number"
            step="0.5"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            placeholder="e.g., 2"
          />
        </div>

        <div className="form-group">
          <label>Year Built</label>
          <input
            type="number"
            name="year_built"
            value={formData.year_built}
            onChange={handleChange}
            required
            placeholder="e.g., 2000"
          />
        </div>

        <div className="form-group">
          <label>Lot Size (sq ft)</label>
          <input
            type="number"
            name="lot_size"
            value={formData.lot_size}
            onChange={handleChange}
            required
            placeholder="e.g., 7000"
          />
        </div>

        <div className="form-group">
          <label>Distance to City Center (miles)</label>
          <input
            type="number"
            step="0.1"
            name="distance_to_city_center"
            value={formData.distance_to_city_center}
            onChange={handleChange}
            required
            placeholder="e.g., 4.5"
          />
        </div>

        <div className="form-group">
          <label>School Rating (1-10)</label>
          <input
            type="number"
            step="0.1"
            name="school_rating"
            value={formData.school_rating}
            onChange={handleChange}
            required
            min="1"
            max="10"
            placeholder="e.g., 7.5"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Predicting...' : 'Predict Price'}
      </button>
    </form>
  )
}

export default PredictionForm
