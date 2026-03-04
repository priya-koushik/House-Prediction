import express from 'express';
import cors from 'cors';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'House Price Prediction API',
      version: '1.0.0',
      description: 'API for predicting house prices using machine learning (k-NN algorithm)',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints'
      },
      {
        name: 'Prediction',
        description: 'House price prediction endpoints'
      },
      {
        name: 'Model',
        description: 'Model information endpoints'
      }
    ]
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'House Price Prediction API'
}));

// Swagger JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Store training data
let trainingData = [];

// Load training data
function loadTrainingData() {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(path.join(__dirname, '../House Price Dataset.csv'))
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          square_footage: parseFloat(row.square_footage),
          bedrooms: parseFloat(row.bedrooms),
          bathrooms: parseFloat(row.bathrooms),
          year_built: parseFloat(row.year_built),
          lot_size: parseFloat(row.lot_size),
          distance_to_city_center: parseFloat(row.distance_to_city_center),
          school_rating: parseFloat(row.school_rating),
          price: parseFloat(row.price)
        });
      })
      .on('end', () => {
        trainingData = data;
        console.log(`✅ Loaded ${data.length} training samples`);
        resolve(data);
      })
      .on('error', reject);
  });
}

// Simple k-NN based prediction
function predictPrice(features) {
  const k = 5; // number of neighbors
  
  // Calculate distances to all training samples
  const distances = trainingData.map(sample => {
    const dist = Math.sqrt(
      Math.pow((features.square_footage - sample.square_footage) / 1000, 2) +
      Math.pow((features.bedrooms - sample.bedrooms) * 50, 2) +
      Math.pow((features.bathrooms - sample.bathrooms) * 50, 2) +
      Math.pow((features.year_built - sample.year_built) / 10, 2) +
      Math.pow((features.lot_size - sample.lot_size) / 1000, 2) +
      Math.pow((features.distance_to_city_center - sample.distance_to_city_center) * 20, 2) +
      Math.pow((features.school_rating - sample.school_rating) * 30, 2)
    );
    return { distance: dist, price: sample.price };
  });
  
  // Sort by distance and take k nearest
  distances.sort((a, b) => a.distance - b.distance);
  const nearest = distances.slice(0, k);
  
  // Average price of k nearest neighbors
  const avgPrice = nearest.reduce((sum, n) => sum + n.price, 0) / k;
  
  return avgPrice;
}

// Routes
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is running and the model is loaded
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 model_loaded:
 *                   type: boolean
 *                   example: true
 *                 training_samples:
 *                   type: integer
 *                   example: 50
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    model_loaded: trainingData.length > 0,
    training_samples: trainingData.length
  });
});

/**
 * @swagger
 * /api/predict:
 *   post:
 *     summary: Predict house price for a single property
 *     description: Returns predicted price based on property features using k-NN algorithm
 *     tags: [Prediction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - square_footage
 *               - bedrooms
 *               - bathrooms
 *               - year_built
 *               - lot_size
 *               - distance_to_city_center
 *               - school_rating
 *             properties:
 *               square_footage:
 *                 type: number
 *                 description: Square footage of the house
 *                 example: 1500
 *               bedrooms:
 *                 type: integer
 *                 description: Number of bedrooms
 *                 example: 3
 *               bathrooms:
 *                 type: number
 *                 description: Number of bathrooms
 *                 example: 2
 *               year_built:
 *                 type: integer
 *                 description: Year the house was built
 *                 example: 2000
 *               lot_size:
 *                 type: number
 *                 description: Lot size in square feet
 *                 example: 7000
 *               distance_to_city_center:
 *                 type: number
 *                 description: Distance to city center in miles
 *                 example: 5
 *               school_rating:
 *                 type: number
 *                 description: School rating (0-10)
 *                 example: 7.5
 *     responses:
 *       200:
 *         description: Successful prediction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 predicted_price:
 *                   type: number
 *                   example: 285000
 *                 input_features:
 *                   type: object
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input values
 */
app.post('/api/predict', (req, res) => {
  try {
    const features = {
      square_footage: parseFloat(req.body.square_footage),
      bedrooms: parseFloat(req.body.bedrooms),
      bathrooms: parseFloat(req.body.bathrooms),
      year_built: parseFloat(req.body.year_built),
      lot_size: parseFloat(req.body.lot_size),
      distance_to_city_center: parseFloat(req.body.distance_to_city_center),
      school_rating: parseFloat(req.body.school_rating)
    };
    
    // Validate inputs
    if (Object.values(features).some(v => isNaN(v))) {
      return res.status(400).json({ error: 'Invalid input values' });
    }
    
    const predictedPrice = predictPrice(features);
    
    res.json({
      predicted_price: Math.round(predictedPrice),
      input_features: req.body
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/batch-predict:
 *   post:
 *     summary: Predict house prices for multiple properties
 *     description: Returns predicted prices for an array of properties
 *     tags: [Prediction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - square_footage
 *                     - bedrooms
 *                     - bathrooms
 *                     - year_built
 *                     - lot_size
 *                     - distance_to_city_center
 *                     - school_rating
 *                   properties:
 *                     square_footage:
 *                       type: number
 *                       example: 1500
 *                     bedrooms:
 *                       type: integer
 *                       example: 3
 *                     bathrooms:
 *                       type: number
 *                       example: 2
 *                     year_built:
 *                       type: integer
 *                       example: 2000
 *                     lot_size:
 *                       type: number
 *                       example: 7000
 *                     distance_to_city_center:
 *                       type: number
 *                       example: 5
 *                     school_rating:
 *                       type: number
 *                       example: 7.5
 *     responses:
 *       200:
 *         description: Successful batch prediction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 predictions:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [285000, 350000, 195000]
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.post('/api/batch-predict', (req, res) => {
  try {
    const predictions = req.body.data.map(item => {
      const features = {
        square_footage: parseFloat(item.square_footage),
        bedrooms: parseFloat(item.bedrooms),
        bathrooms: parseFloat(item.bathrooms),
        year_built: parseFloat(item.year_built),
        lot_size: parseFloat(item.lot_size),
        distance_to_city_center: parseFloat(item.distance_to_city_center),
        school_rating: parseFloat(item.school_rating)
      };
      return Math.round(predictPrice(features));
    });
    
    res.json({ predictions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/model-info:
 *   get:
 *     summary: Get model information and performance metrics
 *     description: Returns model type, feature weights, and performance metrics
 *     tags: [Model]
 *     responses:
 *       200:
 *         description: Model information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 model_type:
 *                   type: string
 *                   example: k-Nearest Neighbors (k=5)
 *                 algorithm:
 *                   type: string
 *                   example: k-NN with weighted Euclidean distance
 *                 feature_weights:
 *                   type: object
 *                   properties:
 *                     square_footage:
 *                       type: number
 *                       example: 1000
 *                     bedrooms:
 *                       type: number
 *                       example: 500
 *                     bathrooms:
 *                       type: number
 *                       example: 500
 *                     year_built:
 *                       type: number
 *                       example: 10
 *                     lot_size:
 *                       type: number
 *                       example: 1000
 *                     distance_to_city_center:
 *                       type: number
 *                       example: 20
 *                     school_rating:
 *                       type: number
 *                       example: 30
 *                 performance_metrics:
 *                   type: object
 *                   properties:
 *                     r2_score:
 *                       type: number
 *                       description: R² coefficient of determination
 *                       example: 0.9896
 *                     rmse:
 *                       type: number
 *                       description: Root Mean Square Error in dollars
 *                       example: 8116.65
 *                     mae:
 *                       type: number
 *                       description: Mean Absolute Error in dollars
 *                       example: 6400
 *                     training_samples:
 *                       type: integer
 *                       example: 50
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [square_footage, bedrooms, bathrooms, year_built, lot_size, distance_to_city_center, school_rating]
 *                 description:
 *                   type: string
 *                   example: k-NN model that finds the 5 nearest neighbors and averages their prices
 *                 note:
 *                   type: string
 *                   example: Feature weights are used in distance calculation to normalize different scales
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/api/model-info', (req, res) => {
  try {
    // Calculate model statistics
    const predictions = trainingData.map(sample => predictPrice(sample));
    const actual = trainingData.map(sample => sample.price);
    
    // Calculate R² score
    const meanActual = actual.reduce((sum, val) => sum + val, 0) / actual.length;
    const ssTotal = actual.reduce((sum, val) => sum + Math.pow(val - meanActual, 2), 0);
    const ssResidual = actual.reduce((sum, val, i) => sum + Math.pow(val - predictions[i], 2), 0);
    const r2Score = 1 - (ssResidual / ssTotal);
    
    // Calculate RMSE
    const mse = ssResidual / actual.length;
    const rmse = Math.sqrt(mse);
    
    // Calculate MAE
    const mae = actual.reduce((sum, val, i) => sum + Math.abs(val - predictions[i]), 0) / actual.length;
    
    // Feature weights (normalized importance for k-NN)
    const featureWeights = {
      square_footage: 1000,
      bedrooms: 500,
      bathrooms: 500,
      year_built: 10,
      lot_size: 1000,
      distance_to_city_center: 20,
      school_rating: 30
    };
    
    res.json({
      model_type: 'k-Nearest Neighbors (k=5)',
      algorithm: 'k-NN with weighted Euclidean distance',
      feature_weights: featureWeights,
      performance_metrics: {
        r2_score: parseFloat(r2Score.toFixed(4)),
        rmse: parseFloat(rmse.toFixed(2)),
        mae: parseFloat(mae.toFixed(2)),
        training_samples: trainingData.length
      },
      features: [
        'square_footage',
        'bedrooms',
        'bathrooms',
        'year_built',
        'lot_size',
        'distance_to_city_center',
        'school_rating'
      ],
      description: 'k-NN model that finds the 5 nearest neighbors and averages their prices',
      note: 'Feature weights are used in distance calculation to normalize different scales'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 5001;

loadTrainingData().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`� Model: k-NN (k=5)`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health\n`);
  });
}).catch(err => {
  console.error('❌ Error loading training data:', err);
  process.exit(1);
});
