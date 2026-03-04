package com.housingprice.controller;

import com.housingprice.model.*;
import com.housingprice.service.MarketAnalysisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "*")
@Tag(name = "Market Analysis", description = "Property market analysis and statistics API")
public class MarketAnalysisController {

    @Autowired
    private MarketAnalysisService marketAnalysisService;

    @Operation(
        summary = "Get market statistics",
        description = "Retrieve aggregate market statistics with optional filtering by price, bedrooms, and square footage. Results are cached for 5 minutes."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved statistics",
            content = @Content(schema = @Schema(implementation = MarketStatistics.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/statistics")
    public ResponseEntity<MarketStatistics> getStatistics(
            @Parameter(description = "Minimum price filter") @RequestParam(required = false) Double minPrice,
            @Parameter(description = "Maximum price filter") @RequestParam(required = false) Double maxPrice,
            @Parameter(description = "Minimum bedrooms filter") @RequestParam(required = false) Integer minBedrooms,
            @Parameter(description = "Maximum bedrooms filter") @RequestParam(required = false) Integer maxBedrooms,
            @Parameter(description = "Minimum square footage filter") @RequestParam(required = false) Double minSquareFootage,
            @Parameter(description = "Maximum square footage filter") @RequestParam(required = false) Double maxSquareFootage
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

    @Operation(
        summary = "Get property listings",
        description = "Retrieve filtered property listings based on price, bedrooms, and square footage criteria"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved properties",
            content = @Content(schema = @Schema(implementation = Property.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/properties")
    public ResponseEntity<List<Property>> getProperties(
            @Parameter(description = "Minimum price filter") @RequestParam(required = false) Double minPrice,
            @Parameter(description = "Maximum price filter") @RequestParam(required = false) Double maxPrice,
            @Parameter(description = "Minimum bedrooms filter") @RequestParam(required = false) Integer minBedrooms,
            @Parameter(description = "Maximum bedrooms filter") @RequestParam(required = false) Integer maxBedrooms,
            @Parameter(description = "Minimum square footage filter") @RequestParam(required = false) Double minSquareFootage,
            @Parameter(description = "Maximum square footage filter") @RequestParam(required = false) Double maxSquareFootage
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

    @Operation(
        summary = "Get property segments",
        description = "Retrieve property market segmentation by price ranges, bedrooms, and property age. Results are cached for 5 minutes."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved segments"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/segments")
    public ResponseEntity<Map<String, Object>> getSegments() {
        Map<String, Object> segments = marketAnalysisService.getPropertySegments();
        return ResponseEntity.ok(segments);
    }

    @Operation(
        summary = "Perform what-if analysis",
        description = "Calculate mortgage scenarios and property predictions using ML model integration. " +
                     "Provides adjusted price, loan calculations, and monthly payment estimates."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully calculated scenario",
            content = @Content(schema = @Schema(implementation = WhatIfResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request parameters"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/what-if")
    public ResponseEntity<WhatIfResponse> performWhatIfAnalysis(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "What-if analysis parameters including property details and financial assumptions",
                required = true,
                content = @Content(schema = @Schema(implementation = WhatIfRequest.class))
            )
            @RequestBody WhatIfRequest request
    ) {
        WhatIfResponse response = marketAnalysisService.performWhatIfAnalysis(request);
        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Health check",
        description = "Check if the Market Analysis API is running and healthy"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service is healthy")
    })
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "healthy",
                "service", "Market Analysis API",
                "version", "1.0.0"
        ));
    }
}
