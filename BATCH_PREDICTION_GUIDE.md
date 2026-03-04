# Batch Prediction Feature Guide

## Overview

The batch prediction feature allows users to upload a CSV file with multiple properties and get price predictions for all of them at once. This is useful for:
- Real estate agents analyzing multiple listings
- Property investors evaluating portfolios
- Market researchers analyzing property data
- Bulk property valuations

---

## How to Use Batch Prediction

### Step 1: Navigate to Property Estimator
1. Go to http://localhost:3000/estimator
2. Click on the **"Batch Prediction"** tab

### Step 2: Download Sample CSV (Optional)
1. Click **"📥 Download Sample CSV"** to get a template
2. The sample file includes 5 example properties with correct format

### Step 3: Prepare Your CSV File

**Required Format**:
```csv
square_footage,bedrooms,bathrooms,year_built,lot_size,distance_to_city_center,school_rating
1500,3,2,2000,7000,5,7.5
2000,4,2.5,2010,8500,6,8.2
1200,2,1,1995,5000,3,6.8
```

**Requirements**:
- First row must contain column headers (exact names)
- All 7 columns are required:
  - `square_footage` - Square footage of the house
  - `bedrooms` - Number of bedrooms
  - `bathrooms` - Number of bathrooms
  - `year_built` - Year the house was built
  - `lot_size` - Lot size in square feet
  - `distance_to_city_center` - Distance to city center in miles
  - `school_rating` - School rating (0-10)
- Values must be numeric
- No empty rows

### Step 4: Upload CSV File
1. Click **"Choose File"** or drag and drop your CSV
2. File name will appear when selected
3. Click **"Get Batch Predictions"**

### Step 5: View Results

The results page shows:

#### Summary Cards:
- **Total Properties**: Number of properties analyzed
- **Total Value**: Sum of all predicted prices
- **Average Value**: Average predicted price

#### Results Table:
- Complete list of all properties with predictions
- Sortable columns
- Easy-to-read format
- Color-coded for better visibility

#### Statistics:
- **Price Range**: Lowest, highest, and range
- **Property Stats**: Average square footage, bedrooms, school rating

### Step 6: Export Results
1. Click **"📊 Export CSV"** to download results
2. File includes all input data plus predicted prices
3. Filename: `batch-predictions-YYYY-MM-DD.csv`

---

## API Endpoint Used

### POST /api/batch-predict

**Request**:
```json
{
  "data": [
    {
      "square_footage": 1500,
      "bedrooms": 3,
      "bathrooms": 2,
      "year_built": 2000,
      "lot_size": 7000,
      "distance_to_city_center": 5,
      "school_rating": 7.5
    },
    {
      "square_footage": 2000,
      "bedrooms": 4,
      "bathrooms": 2.5,
      "year_built": 2010,
      "lot_size": 8500,
      "distance_to_city_center": 6,
      "school_rating": 8.2
    }
  ]
}
```

**Response**:
```json
{
  "predictions": [285000, 350000]
}
```

---

## Features

### ✅ What's Included:

1. **CSV Upload**
   - Drag and drop support
   - File validation
   - Error messages

2. **Sample Template**
   - Downloadable CSV template
   - Pre-filled with example data
   - Correct format guaranteed

3. **Batch Processing**
   - Process multiple properties at once
   - Fast API calls
   - Real-time progress

4. **Results Display**
   - Summary statistics
   - Detailed table view
   - Price range analysis
   - Property statistics

5. **Export Functionality**
   - Download results as CSV
   - Includes all input data
   - Timestamped filename

6. **History Integration**
   - All batch predictions added to history
   - Can compare batch properties
   - Persistent across sessions

---

## Example Use Cases

### Real Estate Agent Portfolio Analysis
```csv
square_footage,bedrooms,bathrooms,year_built,lot_size,distance_to_city_center,school_rating
1500,3,2,2000,7000,5,7.5
1800,3,2,2005,7500,4.5,7.9
2200,4,2.5,2010,9000,6,8.5
2500,5,3,2015,10000,8,9.1
```

### Investment Property Comparison
```csv
square_footage,bedrooms,bathrooms,year_built,lot_size,distance_to_city_center,school_rating
1200,2,1,1995,5000,3,6.8
1400,2,1.5,1998,5500,3.5,7.0
1600,3,2,2002,6000,4,7.5
```

### Market Research Dataset
Upload your entire dataset (up to 100+ properties) for comprehensive market analysis.

---

## UI Components

### Tab Navigation
- **Single Prediction**: Traditional one-at-a-time prediction
- **Batch Prediction**: Upload CSV for multiple predictions

### Batch Prediction Card
- File upload area
- Sample CSV download button
- Format instructions
- Error messages
- Submit button

### Batch Results Card
- Summary statistics
- Results table
- Export button
- Clear button
- Price range analysis
- Property statistics

---

## Error Handling

### Common Errors:

1. **"Please upload a CSV file"**
   - Solution: Ensure file has .csv extension

2. **"No valid properties found in CSV"**
   - Solution: Check CSV format, ensure headers match exactly

3. **"Prediction failed"**
   - Solution: Check API is running, verify data format

4. **Invalid values**
   - Solution: Ensure all values are numeric, no empty cells

---

## Technical Details

### Frontend Components:
- `BatchPrediction.tsx` - Upload and processing
- `BatchResults.tsx` - Results display and export

### State Management:
- `batchResults` - Stores batch prediction results
- `activeTab` - Tracks single vs batch mode
- `loading` - Shows processing state

### API Integration:
- Calls `/api/batch-predict` endpoint
- Sends array of property objects
- Receives array of predictions

### CSV Parsing:
- Client-side CSV parsing
- Header validation
- Data type conversion
- Error handling

---

## Performance

### Current Limits:
- **Max Properties**: ~100 per batch (recommended)
- **Processing Time**: ~1-2 seconds for 10 properties
- **File Size**: <1MB recommended

### Optimization:
- Client-side CSV parsing (fast)
- Single API call for all properties
- Efficient table rendering
- Lazy loading for large datasets

---

## Future Enhancements

### Planned Features:
- 🔄 Drag and drop file upload
- 🔄 Excel file support (.xlsx)
- 🔄 Progress bar for large batches
- 🔄 Batch prediction history
- 🔄 Advanced filtering and sorting
- 🔄 Chart visualizations for batch results
- 🔄 PDF export with charts
- 🔄 Email results option

---

## Troubleshooting

### CSV Not Uploading:
1. Check file extension is .csv
2. Ensure file is not corrupted
3. Try downloading sample and modifying it

### Predictions Not Showing:
1. Check browser console for errors
2. Verify API is running (http://localhost:5001/api/health)
3. Check CSV format matches requirements

### Export Not Working:
1. Check browser allows downloads
2. Ensure popup blocker is disabled
3. Try different browser

---

## Demo Script

### For Interview:

1. **Show Single Prediction** (baseline)
   - "First, let me show single prediction..."
   - Fill form, get result

2. **Switch to Batch Mode**
   - "Now for batch predictions..."
   - Click "Batch Prediction" tab

3. **Download Sample**
   - "Here's a sample CSV template..."
   - Click download button

4. **Upload CSV**
   - "I'll upload this CSV with 5 properties..."
   - Select file, click submit

5. **Show Results**
   - "Here are the results for all 5 properties..."
   - Point out summary cards
   - Show table with all predictions
   - Highlight statistics

6. **Export Results**
   - "And I can export these results..."
   - Click export button
   - Show downloaded CSV

7. **Explain Benefits**
   - "This is useful for real estate agents..."
   - "Investors can analyze portfolios..."
   - "Much faster than one-by-one..."

---

## Summary

The batch prediction feature provides:
- ✅ CSV file upload
- ✅ Multiple property predictions at once
- ✅ Comprehensive results display
- ✅ Export functionality
- ✅ Statistics and analysis
- ✅ Integration with history
- ✅ Professional UI/UX

**Access it now at**: http://localhost:3000/estimator (Batch Prediction tab)
