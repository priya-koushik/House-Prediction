package com.housingprice.model;

public class PropertyFilter {
    private Double minPrice;
    private Double maxPrice;
    private Integer minBedrooms;
    private Integer maxBedrooms;
    private Double minSquareFootage;
    private Double maxSquareFootage;

    public Double getMinPrice() { return minPrice; }
    public void setMinPrice(Double minPrice) { this.minPrice = minPrice; }
    
    public Double getMaxPrice() { return maxPrice; }
    public void setMaxPrice(Double maxPrice) { this.maxPrice = maxPrice; }
    
    public Integer getMinBedrooms() { return minBedrooms; }
    public void setMinBedrooms(Integer minBedrooms) { this.minBedrooms = minBedrooms; }
    
    public Integer getMaxBedrooms() { return maxBedrooms; }
    public void setMaxBedrooms(Integer maxBedrooms) { this.maxBedrooms = maxBedrooms; }
    
    public Double getMinSquareFootage() { return minSquareFootage; }
    public void setMinSquareFootage(Double minSquareFootage) { this.minSquareFootage = minSquareFootage; }
    
    public Double getMaxSquareFootage() { return maxSquareFootage; }
    public void setMaxSquareFootage(Double maxSquareFootage) { this.maxSquareFootage = maxSquareFootage; }
}
