package com.example.controller;

import com.example.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * REST API exposing JSON files from S3.
 */
@Tag(name = "Data API", description = "Endpoints to retrieve JSON analyses")
@RestController
@RequestMapping("/api/v1")
public class DataController {
    private final S3Service s3Service;

    public DataController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @Operation(summary = "Quarterly Revenue & QoQ Growth")
    @GetMapping(value = "/quarterly-revenue", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getQuarterly() {
        return s3Service.fetchJson("A._Quarterly_Revenue_and_QoQ_growth.json");
    }

    @Operation(summary = "Revenue Bridge & Churn Analysis")
    @GetMapping(value = "/revenue-bridge", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getBridge() {
        return s3Service.fetchJson("B._Revenue_Bridge_and_Churned_Analysis.json");
    }

    @Operation(summary = "Country-wise Revenue Analysis")
    @GetMapping(value = "/country-revenue", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getCountry() {
        return s3Service.fetchJson("C._Country_wise_Revenue_Analysis.json");
    }

    @Operation(summary = "Region-wise Revenue Analysis")
    @GetMapping(value = "/region-revenue", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getRegion() {
        return s3Service.fetchJson("D._Region_wise_Revenue_Analysis.json");
    }

    @Operation(summary = "Customer Concentration Analysis")
    @GetMapping(value = "/customer-concentration", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getConcentration() {
        return s3Service.fetchJson("E._Customer_Concentration_Analysis.json");
    }
}
