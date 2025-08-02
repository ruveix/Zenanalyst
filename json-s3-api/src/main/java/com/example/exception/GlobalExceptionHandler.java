package com.example.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Handles exceptions globally and returns JSON error responses.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApi(ApiException ex) {
        var err = new ErrorResponse("API_ERROR", ex.getMessage());
        return ResponseEntity.status(500).body(err);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        var err = new ErrorResponse("SERVER_ERROR", "An unexpected error occurred.");
        return ResponseEntity.status(500).body(err);
    }
}
