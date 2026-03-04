package com.housingprice.model;

import io.swagger.v3.oas.annotations.media.Schema;

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
    
    public Double getPriceChangePercent() { return priceChangePercent; }
    public void setPriceChangePercent(Double priceChangePercent) { this.priceChangePercent = priceChangePercent; }
    
    public Double getInterestRate() { return interestRate; }
    public void setInterestRate(Double interestRate) { this.interestRate = interestRate; }
    
    public Double getDownPaymentPercent() { return downPaymentPercent; }
    public void setDownPaymentPercent(Double downPaymentPercent) { this.downPaymentPercent = downPaymentPercent; }
}
