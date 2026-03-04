package com.housingprice.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "What-if analysis response with financial calculations")
public class WhatIfResponse {
    @Schema(description = "ML model predicted price", example = "285000.0")
    private Double predictedPrice;
    
    @Schema(description = "Price adjusted by change percentage", example = "299250.0")
    private Double adjustedPrice;
    
    @Schema(description = "Down payment amount in dollars", example = "59850.0")
    private Double downPaymentAmount;
    
    @Schema(description = "Loan amount after down payment", example = "239400.0")
    private Double loanAmount;
    
    @Schema(description = "Monthly mortgage payment", example = "1213.37")
    private Double monthlyPayment;
    
    @Schema(description = "Total interest paid over loan term", example = "197613.2")
    private Double totalInterest;
}
