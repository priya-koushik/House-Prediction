package com.housingprice.model;

import io.swagger.v3.oas.annotations.media.Schema;

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

    public Property() {}

    public Property(Long id, Double squareFootage, Integer bedrooms, Double bathrooms, 
                   Integer yearBuilt, Double lotSize, Double distanceToCityCenter, 
                   Double schoolRating, Double price) {
        this.id = id;
        this.squareFootage = squareFootage;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.yearBuilt = yearBuilt;
        this.lotSize = lotSize;
        this.distanceToCityCenter = distanceToCityCenter;
        this.schoolRating = schoolRating;
        this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Double getSquareFootage() { return squareFootage; }
    public void setSquareFootage(Double squareFootage) { this.squareFootage = squareFootage; }
    
    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }
    
    public Double getBathrooms() { return bathrooms; }
    public void setBathrooms(Double bathrooms) { this.bathrooms = bathrooms; }
    
    public Integer getYearBuilt() { return yearBuilt; }
    public void setYearBuilt(Integer yearBuilt) { this.yearBuilt = yearBuilt; }
    
    public Double getLotSize() { return lotSize; }
    public void setLotSize(Double lotSize) { this.lotSize = lotSize; }
    
    public Double getDistanceToCityCenter() { return distanceToCityCenter; }
    public void setDistanceToCityCenter(Double distanceToCityCenter) { this.distanceToCityCenter = distanceToCityCenter; }
    
    public Double getSchoolRating() { return schoolRating; }
    public void setSchoolRating(Double schoolRating) { this.schoolRating = schoolRating; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
