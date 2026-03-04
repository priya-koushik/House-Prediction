package com.housingprice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    private Long id;
    private Double squareFootage;
    private Integer bedrooms;
    private Double bathrooms;
    private Integer yearBuilt;
    private Double lotSize;
    private Double distanceToCityCenter;
    private Double schoolRating;
    private Double price;
}
