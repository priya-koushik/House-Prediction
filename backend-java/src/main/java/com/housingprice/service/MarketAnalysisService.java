package com.housingprice.service;

import com.housingprice.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MarketAnalysisService {

    @Autowired
    private DataLoaderService dataLoaderService;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String ML_MODEL_URL = "http://localhost:5001/api";

    /**
     * Get market statistics with caching
     */
    @Cacheable("marketStatistics")
    public MarketStatistics getMarketStatistics(PropertyFilter filter) {
        List<Property> properties = getFilteredProperties(filter);
        
        if (properties.isEmpty()) {
            return new MarketStatistics();
        }

        MarketStatistics stats = new MarketStatistics();
        stats.setTotalProperties(properties.size());
        
        // Calculate averages
        double avgPrice = properties.stream()
                .mapToDouble(Property::getPrice)
                .average()
                .orElse(0.0);
        stats.setAveragePrice(avgPrice);
        
        double avgSqFt = properties.stream()
                .mapToDouble(Property::getSquareFootage)
                .average()
                .orElse(0.0);
        stats.setAverageSquareFootage(avgSqFt);
        
        stats.setPricePerSquareFoot(avgPrice / avgSqFt);
        
        // Min/Max price
        stats.setMinPrice(properties.stream()
                .mapToDouble(Property::getPrice)
                .min()
                .orElse(0.0));
        stats.setMaxPrice(properties.stream()
                .mapToDouble(Property::getPrice)
                .max()
                .orElse(0.0));
        
        // Average price by bedrooms
        Map<Integer, Double> avgPriceByBedrooms = properties.stream()
                .collect(Collectors.groupingBy(
                        Property::getBedrooms,
                        Collectors.averagingDouble(Property::getPrice)
                ));
        stats.setAveragePriceByBedrooms(avgPriceByBedrooms);
        
        // Property count by bedrooms
        Map<Integer, Long> countByBedrooms = properties.stream()
                .collect(Collectors.groupingBy(
                        Property::getBedrooms,
                        Collectors.counting()
                ));
        stats.setPropertyCountByBedrooms(countByBedrooms);
        
        return stats;
    }

    /**
     * Get filtered properties
     */
    public List<Property> getFilteredProperties(PropertyFilter filter) {
        List<Property> properties = dataLoaderService.getAllProperties();
        
        if (filter == null) {
            return properties;
        }
        
        return properties.stream()
                .filter(p -> filter.getMinPrice() == null || p.getPrice() >= filter.getMinPrice())
                .filter(p -> filter.getMaxPrice() == null || p.getPrice() <= filter.getMaxPrice())
                .filter(p -> filter.getMinBedrooms() == null || p.getBedrooms() >= filter.getMinBedrooms())
                .filter(p -> filter.getMaxBedrooms() == null || p.getBedrooms() <= filter.getMaxBedrooms())
                .filter(p -> filter.getMinSquareFootage() == null || p.getSquareFootage() >= filter.getMinSquareFootage())
                .filter(p -> filter.getMaxSquareFootage() == null || p.getSquareFootage() <= filter.getMaxSquareFootage())
                .collect(Collectors.toList());
    }

    /**
     * Perform what-if analysis using ML model
     */
    public WhatIfResponse performWhatIfAnalysis(WhatIfRequest request) {
        try {
            // Call ML model for prediction
            Map<String, Object> predictionRequest = new HashMap<>();
            predictionRequest.put("square_footage", request.getSquareFootage());
            predictionRequest.put("bedrooms", request.getBedrooms());
            predictionRequest.put("bathrooms", request.getBathrooms());
            predictionRequest.put("year_built", request.getYearBuilt());
            predictionRequest.put("lot_size", request.getLotSize());
            predictionRequest.put("distance_to_city_center", request.getDistanceToCityCenter());
            predictionRequest.put("school_rating", request.getSchoolRating());
            
            Map<String, Object> predictionResponse = restTemplate.postForObject(
                    ML_MODEL_URL + "/predict",
                    predictionRequest,
                    Map.class
            );
            
            Double predictedPrice = (Double) predictionResponse.get("predicted_price");
            
            // Apply price change
            Double adjustedPrice = predictedPrice * (1 + request.getPriceChangePercent() / 100);
            
            // Calculate mortgage details
            Double downPaymentAmount = adjustedPrice * (request.getDownPaymentPercent() / 100);
            Double loanAmount = adjustedPrice - downPaymentAmount;
            
            Double monthlyRate = request.getInterestRate() / 100 / 12;
            int numPayments = 360; // 30 years
            
            Double monthlyPayment = loanAmount * 
                    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                    (Math.pow(1 + monthlyRate, numPayments) - 1);
            
            Double totalInterest = (monthlyPayment * numPayments) - loanAmount;
            
            return new WhatIfResponse(
                    predictedPrice,
                    adjustedPrice,
                    downPaymentAmount,
                    loanAmount,
                    monthlyPayment,
                    totalInterest
            );
            
        } catch (Exception e) {
            System.err.println("Error calling ML model: " + e.getMessage());
            // Fallback calculation without ML model
            return performFallbackAnalysis(request);
        }
    }

    private WhatIfResponse performFallbackAnalysis(WhatIfRequest request) {
        // Simple estimation: $150 per sq ft
        Double estimatedPrice = request.getSquareFootage() * 150;
        Double adjustedPrice = estimatedPrice * (1 + request.getPriceChangePercent() / 100);
        
        Double downPaymentAmount = adjustedPrice * (request.getDownPaymentPercent() / 100);
        Double loanAmount = adjustedPrice - downPaymentAmount;
        
        Double monthlyRate = request.getInterestRate() / 100 / 12;
        int numPayments = 360;
        
        Double monthlyPayment = loanAmount * 
                (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1);
        
        Double totalInterest = (monthlyPayment * numPayments) - loanAmount;
        
        return new WhatIfResponse(
                estimatedPrice,
                adjustedPrice,
                downPaymentAmount,
                loanAmount,
                monthlyPayment,
                totalInterest
        );
    }

    /**
     * Get property segments analysis
     */
    @Cacheable("propertySegments")
    public Map<String, Object> getPropertySegments() {
        List<Property> properties = dataLoaderService.getAllProperties();
        
        Map<String, Object> segments = new HashMap<>();
        
        // Segment by price range
        Map<String, Long> priceSegments = new HashMap<>();
        priceSegments.put("Under 200K", properties.stream().filter(p -> p.getPrice() < 200000).count());
        priceSegments.put("200K-300K", properties.stream().filter(p -> p.getPrice() >= 200000 && p.getPrice() < 300000).count());
        priceSegments.put("300K-400K", properties.stream().filter(p -> p.getPrice() >= 300000 && p.getPrice() < 400000).count());
        priceSegments.put("Over 400K", properties.stream().filter(p -> p.getPrice() >= 400000).count());
        segments.put("priceSegments", priceSegments);
        
        // Segment by bedrooms
        Map<Integer, Long> bedroomSegments = properties.stream()
                .collect(Collectors.groupingBy(Property::getBedrooms, Collectors.counting()));
        segments.put("bedroomSegments", bedroomSegments);
        
        // Segment by age
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        Map<String, Long> ageSegments = new HashMap<>();
        ageSegments.put("New (0-5 years)", properties.stream().filter(p -> currentYear - p.getYearBuilt() <= 5).count());
        ageSegments.put("Modern (6-15 years)", properties.stream().filter(p -> currentYear - p.getYearBuilt() > 5 && currentYear - p.getYearBuilt() <= 15).count());
        ageSegments.put("Established (16-30 years)", properties.stream().filter(p -> currentYear - p.getYearBuilt() > 15 && currentYear - p.getYearBuilt() <= 30).count());
        ageSegments.put("Older (30+ years)", properties.stream().filter(p -> currentYear - p.getYearBuilt() > 30).count());
        segments.put("ageSegments", ageSegments);
        
        return segments;
    }
}
