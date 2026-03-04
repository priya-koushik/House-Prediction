package com.housingprice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WhatIfResponse {
    private Double predictedPrice;
    private Double adjustedPrice;
    private Double downPaymentAmount;
    private Double loanAmount;
    private Double monthlyPayment;
    private Double totalInterest;
}
