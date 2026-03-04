package com.housingprice.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Property details")
public class Property {
    @Schema(description = "Unique property identifier", example = "1")
    private Long id;
    
    @Schema(description = "Property square footage", example = "1500.0")
    private Double squareFootage;
    
    @Schema(description = "Number of bedrooms", example = "3")
    private Integer bedrooms;
    
    @Schema(description = "Number of bathrooms", example = "2.0")
    private Double bathrooms;
    
    @Schema(description = "Year the property was built", example = "2010")
    private Integer yearBuilt;
    
    @Schema(description = "Lot size in square feet", example = "7000.0")
    private Double lotSize;
    
    @Schema(description = "Distance to city center in miles", example = "5.0")
    private Double distanceToCityCenter;
    
    @Schema(description = "School rating (0-10)", example = "7.5")
    private Double schoolRating;
    
    @Schema(description = "Property price in dollars", example = "285000.0")
    private Double price;
}
