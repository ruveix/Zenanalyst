package com.example.exception;

/**
 * Custom exception for API-specific errors.
 */
public class ApiException extends RuntimeException {
    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }
    public ApiException(String message) {
        super(message);
    }
}
