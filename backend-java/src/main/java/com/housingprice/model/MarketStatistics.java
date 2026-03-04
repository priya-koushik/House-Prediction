package com.housingprice.model;

import java.util.Map;

public class MarketStatistics {
    private Integer totalProperties;
    private Double averagePrice;
    private Double averageSquareFootage;
    private Double pricePerSquareFoot;
    private Double minPrice;
    private Double maxPrice;
    private Map<Integer, Double> averagePriceByBedrooms;
    private Map<Integer, Long> propertyCountByBedrooms;

    public MarketStatistics() {}

    public MarketStatistics(Integer totalProperties, Double averagePrice, Double averageSquareFootage,
                           Double pricePerSquareFoot, Double minPrice, Double maxPrice,
                           Map<Integer, Double> averagePriceByBedrooms, Map<Integer, Long> propertyCountByBedrooms) {
        this.totalProperties = totalProperties;
        this.averagePrice = averagePrice;
        this.averageSquareFootage = averageSquareFootage;
        this.pricePerSquareFoot = pricePerSquareFoot;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.averagePriceByBedrooms = averagePriceByBedrooms;
        this.propertyCountByBedrooms = propertyCountByBedrooms;
    }

    public Integer getTotalProperties() { return totalProperties; }
    public void setTotalProperties(Integer totalProperties) { this.totalProperties = totalProperties; }
    
    public Double getAveragePrice() { return averagePrice; }
    public void setAveragePrice(Double averagePrice) { this.averagePrice = averagePrice; }
    
    public Double getAverageSquareFootage() { return averageSquareFootage; }
    public void setAverageSquareFootage(Double averageSquareFootage) { this.averageSquareFootage = averageSquareFootage; }
    
    public Double getPricePerSquareFoot() { return pricePerSquareFoot; }
    public void setPricePerSquareFoot(Double pricePerSquareFoot) { this.pricePerSquareFoot = pricePerSquareFoot; }
    
    public Double getMinPrice() { return minPrice; }
    public void setMinPrice(Double minPrice) { this.minPrice = minPrice; }
    
    public Double getMaxPrice() { return maxPrice; }
    public void setMaxPrice(Double maxPrice) { this.maxPrice = maxPrice; }
    
    public Map<Integer, Double> getAveragePriceByBedrooms() { return averagePriceByBedrooms; }
    public void setAveragePriceByBedrooms(Map<Integer, Double> averagePriceByBedrooms) { this.averagePriceByBedrooms = averagePriceByBedrooms; }
    
    public Map<Integer, Long> getPropertyCountByBedrooms() { return propertyCountByBedrooms; }
    public void setPropertyCountByBedrooms(Map<Integer, Long> propertyCountByBedrooms) { this.propertyCountByBedrooms = propertyCountByBedrooms; }
}
