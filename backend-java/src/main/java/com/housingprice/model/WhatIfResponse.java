package com.housingprice.model;

import io.swagger.v3.oas.annotations.media.Schema;

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

    public WhatIfResponse() {}

    public WhatIfResponse(Double predictedPrice, Double adjustedPrice, Double downPaymentAmount,
                         Double loanAmount, Double monthlyPayment, Double totalInterest) {
        this.predictedPrice = predictedPrice;
        this.adjustedPrice = adjustedPrice;
        this.downPaymentAmount = downPaymentAmount;
        this.loanAmount = loanAmount;
        this.monthlyPayment = monthlyPayment;
        this.totalInterest = totalInterest;
    }

    public Double getPredictedPrice() { return predictedPrice; }
    public void setPredictedPrice(Double predictedPrice) { this.predictedPrice = predictedPrice; }
    
    public Double getAdjustedPrice() { return adjustedPrice; }
    public void setAdjustedPrice(Double adjustedPrice) { this.adjustedPrice = adjustedPrice; }
    
    public Double getDownPaymentAmount() { return downPaymentAmount; }
    public void setDownPaymentAmount(Double downPaymentAmount) { this.downPaymentAmount = downPaymentAmount; }
    
    public Double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(Double loanAmount) { this.loanAmount = loanAmount; }
    
    public Double getMonthlyPayment() { return monthlyPayment; }
    public void setMonthlyPayment(Double monthlyPayment) { this.monthlyPayment = monthlyPayment; }
    
    public Double getTotalInterest() { return totalInterest; }
    public void setTotalInterest(Double totalInterest) { this.totalInterest = totalInterest; }
}
