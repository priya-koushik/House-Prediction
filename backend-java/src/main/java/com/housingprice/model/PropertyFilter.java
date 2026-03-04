package com.housingprice.model;

import lombok.Data;

@Data
public class PropertyFilter {
    private Double minPrice;
    private Double maxPrice;
    private Integer minBedrooms;
    private Integer maxBedrooms;
    private Double minSquareFootage;
    private Double maxSquareFootage;
}
