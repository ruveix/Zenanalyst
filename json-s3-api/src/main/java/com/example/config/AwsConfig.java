package com.example.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configures AWS S3 client using credentials from environment variables.
 */
@Configuration
public class AwsConfig {
    @Value("${AWS_ACCESS_KEY_ID}")
    private String accessKey;
    @Value("${AWS_SECRET_ACCESS_KEY}")
    private String secretKey;
    @Value("${AWS_REGION}")
    private String region;

    @Bean
    public AmazonS3 amazonS3() {
        var creds = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonS3ClientBuilder.standard()
            .withRegion(Regions.fromName(region))
            .withCredentials(new AWSStaticCredentialsProvider(creds))
            .build();
    }
}
