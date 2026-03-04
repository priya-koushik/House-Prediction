from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import pickle
import os

app = Flask(__name__)
CORS(app)

# Global variables for model and scaler
model = None
scaler = None

def load_model():
    global model, scaler
    if os.path.exists('model.pkl') and os.path.exists('scaler.pkl'):
        with open('model.pkl', 'rb') as f:
            model = pickle.load(f)
        with open('scaler.pkl', 'rb') as f:
            scaler = pickle.load(f)
        return True
    return False

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = pd.DataFrame([{
            'square_footage': data['square_footage'],
            'bedrooms': data['bedrooms'],
            'bathrooms': data['bathrooms'],
            'year_built': data['year_built'],
            'lot_size': data['lot_size'],
            'distance_to_city_center': data['distance_to_city_center'],
            'school_rating': data['school_rating']
        }])
        
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        
        return jsonify({
            'predicted_price': round(prediction, 2),
            'input_features': data
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/batch-predict', methods=['POST'])
def batch_predict():
    try:
        data = request.json['data']
        df = pd.DataFrame(data)
        features_scaled = scaler.transform(df)
        predictions = model.predict(features_scaled)
        
        return jsonify({
            'predictions': predictions.tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    if not load_model():
        print("Model not found. Please train the model first.")
    app.run(debug=True, host='0.0.0.0', port=5000)
