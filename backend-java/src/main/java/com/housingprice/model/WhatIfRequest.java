package com.housingprice.model;

import lombok.Data;

@Data
public class WhatIfRequest {
    private Double squareFootage;
    private Integer bedrooms;
    private Double bathrooms;
    private Integer yearBuilt;
    private Double lotSize;
    private Double distanceToCityCenter;
    private Double schoolRating;
    private Double priceChangePercent;
    private Double interestRate;
    private Double downPaymentPercent;
}
