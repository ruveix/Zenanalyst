package com.example.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.example.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

/**
 * Encapsulates all S3 interactions.
 */
@Service
public class S3Service {
    private final AmazonS3 s3Client;
    @Value("${S3_BUCKET_NAME}")
    private String bucketName;

    public S3Service(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * Fetches a JSON file from S3 by key.
     * @param key object key in S3 bucket
     * @return file content as String
     */
    public String fetchJson(String key) {
        try {
            S3Object obj = s3Client.getObject(bucketName, key);
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(obj.getObjectContent()))) {
                return reader.lines().collect(Collectors.joining());
            }
        } catch (Exception e) {
            throw new ApiException("Error fetching " + key, e);
        }
    }
}
