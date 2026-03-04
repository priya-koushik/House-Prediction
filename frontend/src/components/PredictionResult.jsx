function PredictionResult({ prediction }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="prediction-result">
      <h2>Predicted Price</h2>
      <div className="price-display">
        {formatPrice(prediction.predicted_price)}
      </div>
      
      <div className="input-summary">
        <h3>Property Details</h3>
        <div className="details-grid">
          <div><strong>Square Footage:</strong> {prediction.input_features.square_footage}</div>
          <div><strong>Bedrooms:</strong> {prediction.input_features.bedrooms}</div>
          <div><strong>Bathrooms:</strong> {prediction.input_features.bathrooms}</div>
          <div><strong>Year Built:</strong> {prediction.input_features.year_built}</div>
          <div><strong>Lot Size:</strong> {prediction.input_features.lot_size} sq ft</div>
          <div><strong>Distance to City:</strong> {prediction.input_features.distance_to_city_center} miles</div>
          <div><strong>School Rating:</strong> {prediction.input_features.school_rating}/10</div>
        </div>
      </div>
    </div>
  )
}

export default PredictionResult
