package com.housingprice.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "What-if analysis request parameters")
public class WhatIfRequest {
    @Schema(description = "Property square footage", example = "1500.0", required = true)
    private Double squareFootage;
    
    @Schema(description = "Number of bedrooms", example = "3", required = true)
    private Integer bedrooms;
    
    @Schema(description = "Number of bathrooms", example = "2.0", required = true)
    private Double bathrooms;
    
    @Schema(description = "Year the property was built", example = "2010", required = true)
    private Integer yearBuilt;
    
    @Schema(description = "Lot size in square feet", example = "7000.0", required = true)
    private Double lotSize;
    
    @Schema(description = "Distance to city center in miles", example = "5.0", required = true)
    private Double distanceToCityCenter;
    
    @Schema(description = "School rating (0-10)", example = "7.5", required = true)
    private Double schoolRating;
    
    @Schema(description = "Expected price change percentage", example = "5.0", required = true)
    private Double priceChangePercent;
    
    @Schema(description = "Interest rate percentage", example = "4.5", required = true)
    private Double interestRate;
    
    @Schema(description = "Down payment percentage", example = "20.0", required = true)
    private Double downPaymentPercent;
}
