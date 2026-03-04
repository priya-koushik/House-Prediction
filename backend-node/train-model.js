import fs from 'fs';
import csv from 'csv-parser';
import { RandomForestRegression } from 'ml-random-forest';

const trainingData = [];

console.log('📊 Loading training data...');

fs.createReadStream('../House Price Dataset.csv')
  .pipe(csv())
  .on('data', (row) => {
    trainingData.push({
      features: [
        parseFloat(row.square_footage),
        parseFloat(row.bedrooms),
        parseFloat(row.bathrooms),
        parseFloat(row.year_built),
        parseFloat(row.lot_size),
        parseFloat(row.distance_to_city_center),
        parseFloat(row.school_rating)
      ],
      price: parseFloat(row.price)
    });
  })
  .on('end', () => {
    console.log(`✅ Loaded ${trainingData.length} training samples`);
    
    // Prepare data
    const X = trainingData.map(d => d.features);
    const y = trainingData.map(d => d.price);
    
    // Normalize features
    const means = [];
    const stds = [];
    
    for (let i = 0; i < X[0].length; i++) {
      const column = X.map(row => row[i]);
      const mean = column.reduce((a, b) => a + b) / column.length;
      const std = Math.sqrt(column.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / column.length);
      means.push(mean);
      stds.push(std);
    }
    
    const X_normalized = X.map(row => 
      row.map((val, i) => (val - means[i]) / (stds[i] || 1))
    );
    
    console.log('🤖 Training Random Forest model...');
    
    const options = {
      seed: 42,
      maxFeatures: 0.8,
      replacement: true,
      nEstimators: 100
    };
    
    const model = new RandomForestRegression(options);
    model.train(X_normalized, y);
    
    // Calculate R² score
    const predictions = model.predict(X_normalized);
    const yMean = y.reduce((a, b) => a + b) / y.length;
    const ssRes = predictions.reduce((sum, pred, i) => sum + Math.pow(y[i] - pred, 2), 0);
    const ssTot = y.reduce((sum, val) => sum + Math.pow(val - yMean, 2), 0);
    const r2 = 1 - (ssRes / ssTot);
    
    const mae = predictions.reduce((sum, pred, i) => sum + Math.abs(y[i] - pred), 0) / y.length;
    const rmse = Math.sqrt(predictions.reduce((sum, pred, i) => sum + Math.pow(y[i] - pred, 2), 0) / y.length);
    
    console.log('\n📈 Model Performance:');
    console.log(`   R² Score: ${r2.toFixed(4)}`);
    console.log(`   MAE: $${mae.toFixed(2)}`);
    console.log(`   RMSE: $${rmse.toFixed(2)}`);
    
    // Save model and normalization parameters
    const modelData = {
      model: model.toJSON(),
      means,
      stds
    };
    
    fs.writeFileSync('model.json', JSON.stringify(modelData));
    console.log('\n✅ Model saved to model.json');
  });
