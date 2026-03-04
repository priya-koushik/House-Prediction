package com.housingprice.service;

import com.housingprice.model.Property;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DataLoaderService {
    
    private List<Property> properties = new ArrayList<>();

    @PostConstruct
    public void loadData() {
        try {
            String csvFile = "../House Price Dataset.csv";
            CSVReader reader = new CSVReader(new FileReader(csvFile));
            List<String[]> rows = reader.readAll();
            
            // Skip header row
            for (int i = 1; i < rows.size(); i++) {
                String[] row = rows.get(i);
                Property property = new Property();
                property.setId((long) i);
                property.setSquareFootage(Double.parseDouble(row[0]));
                property.setBedrooms(Integer.parseInt(row[1]));
                property.setBathrooms(Double.parseDouble(row[2]));
                property.setYearBuilt(Integer.parseInt(row[3]));
                property.setLotSize(Double.parseDouble(row[4]));
                property.setDistanceToCityCenter(Double.parseDouble(row[5]));
                property.setSchoolRating(Double.parseDouble(row[6]));
                property.setPrice(Double.parseDouble(row[7]));
                properties.add(property);
            }
            
            System.out.println("✅ Loaded " + properties.size() + " properties from CSV");
            reader.close();
        } catch (IOException | CsvException e) {
            System.err.println("❌ Error loading CSV: " + e.getMessage());
            // Generate mock data if CSV not found
            generateMockData();
        }
    }

    private void generateMockData() {
        for (int i = 1; i <= 50; i++) {
            Property property = new Property();
            property.setId((long) i);
            property.setSquareFootage(1000 + Math.random() * 2000);
            property.setBedrooms((int) (2 + Math.random() * 3));
            property.setBathrooms(1 + Math.random() * 3);
            property.setYearBuilt((int) (1980 + Math.random() * 44));
            property.setLotSize(4000 + Math.random() * 7000);
            property.setDistanceToCityCenter(Math.random() * 10);
            property.setSchoolRating(5 + Math.random() * 5);
            property.setPrice(150000 + Math.random() * 350000);
            properties.add(property);
        }
        System.out.println("✅ Generated " + properties.size() + " mock properties");
    }

    public List<Property> getAllProperties() {
        return new ArrayList<>(properties);
    }
}
