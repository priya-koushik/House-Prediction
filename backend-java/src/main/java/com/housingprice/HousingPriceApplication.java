package com.housingprice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class HousingPriceApplication {
    public static void main(String[] args) {
        SpringApplication.run(HousingPriceApplication.class, args);
    }
}
