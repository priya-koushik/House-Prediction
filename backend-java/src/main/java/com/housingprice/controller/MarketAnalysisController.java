package com.housingprice.controller;

import com.housingprice.model.*;
import com.housingprice.service.MarketAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "*")
public class MarketAnalysisController {

    @Autowired
    private MarketAnalysisService marketAnalysisService;

    /**
     * Get market statistics
     * Supports filtering by price, bedrooms, and square footage
     */
    @GetMapping("/statistics")
    public ResponseEntity<MarketStatistics> getStatistics(
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer maxBedrooms,
            @RequestParam(required = false) Double minSquareFootage,
            @RequestParam(required = false) Double maxSquareFootage
    ) {
        PropertyFilter filter = new PropertyFilter();
        filter.setMinPrice(minPrice);
        filter.setMaxPrice(maxPrice);
        filter.setMinBedrooms(minBedrooms);
        filter.setMaxBedrooms(maxBedrooms);
        filter.setMinSquareFootage(minSquareFootage);
        filter.setMaxSquareFootage(maxSquareFootage);
        
        MarketStatistics stats = marketAnalysisService.getMarketStatistics(filter);
        return ResponseEntity.ok(stats);
    }

    /**
     * Get filtered property listings
     */
    @GetMapping("/properties")
    public ResponseEntity<List<Property>> getProperties(
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer minBedrooms,
            @RequestParam(required = false) Integer maxBedrooms,
            @RequestParam(required = false) Double minSquareFootage,
            @RequestParam(required = false) Double maxSquareFootage
    ) {
        PropertyFilter filter = new PropertyFilter();
        filter.setMinPrice(minPrice);
        filter.setMaxPrice(maxPrice);
        filter.setMinBedrooms(minBedrooms);
        filter.setMaxBedrooms(maxBedrooms);
        filter.setMinSquareFootage(minSquareFootage);
        filter.setMaxSquareFootage(maxSquareFootage);
        
        List<Property> properties = marketAnalysisService.getFilteredProperties(filter);
        return ResponseEntity.ok(properties);
    }

    /**
     * Get property segments analysis
     */
    @GetMapping("/segments")
    public ResponseEntity<Map<String, Object>> getSegments() {
        Map<String, Object> segments = marketAnalysisService.getPropertySegments();
        return ResponseEntity.ok(segments);
    }

    /**
     * Perform what-if analysis
     * Integrates with ML model for predictions
     */
    @PostMapping("/what-if")
    public ResponseEntity<WhatIfResponse> performWhatIfAnalysis(@RequestBody WhatIfRequest request) {
        WhatIfResponse response = marketAnalysisService.performWhatIfAnalysis(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "healthy",
                "service", "Market Analysis API",
                "version", "1.0.0"
        ));
    }
}
