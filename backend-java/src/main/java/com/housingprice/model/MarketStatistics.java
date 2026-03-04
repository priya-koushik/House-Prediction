package com.housingprice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketStatistics {
    private Integer totalProperties;
    private Double averagePrice;
    private Double averageSquareFootage;
    private Double pricePerSquareFoot;
    private Double minPrice;
    private Double maxPrice;
    private Map<Integer, Double> averagePriceByBedrooms;
    private Map<Integer, Long> propertyCountByBedrooms;
}
