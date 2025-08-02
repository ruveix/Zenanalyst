package com.example.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class AiChatController {

    private final WebClient webClient;
    private final String geminiApiKey;

    public AiChatController(@Value("${GEMINI_API_KEY}") String apiKey) {
        this.geminiApiKey = apiKey;
        this.webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com")
            .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    public static class AiChatRequest {
        public String userPrompt;
        public String datasetJson;
    }

    @PostMapping("/ask-ai")
    public Mono<ResponseEntity<String>> askAi(@RequestBody AiChatRequest request) {
        if (request.userPrompt == null || request.userPrompt.isBlank()) {
            return Mono.just(ResponseEntity.badRequest().body("User prompt cannot be empty."));
        }

        String fullPrompt = "Analyze this dataset and answer the following question.\nDataset:\n"
                + request.datasetJson + "\n\nQuestion: " + request.userPrompt;

        Map<String, Object> payload = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", fullPrompt)
                ))
            )
        );

        // FIX: use v1beta instead of v1
String url = "/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey;

        return webClient.post()
                .uri(url)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(resp -> {
                    // Log raw Gemini API response for debugging
                    System.out.println("Gemini raw response: " + resp);
                })
                .map(resp -> {
                    Object candidatesObj = resp.get("candidates");
                    if (!(candidatesObj instanceof List<?> candidates) || candidates.isEmpty()) {
                        return ResponseEntity.status(500).body("No candidates returned from Gemini.");
                    }

                    Object firstCandidate = candidates.get(0);
                    if (!(firstCandidate instanceof Map<?, ?> fc)) {
                        return ResponseEntity.status(500).body("Invalid Gemini response format.");
                    }

                    Object contentObj = fc.get("content");
                    if (!(contentObj instanceof Map<?, ?> contentMap)) {
                        return ResponseEntity.status(500).body("No content in Gemini response.");
                    }

                    Object partsObj = contentMap.get("parts");
                    if (!(partsObj instanceof List<?> parts) || parts.isEmpty()) {
                        return ResponseEntity.status(500).body("No parts in Gemini response.");
                    }

                    Object part0 = parts.get(0);
                    if (!(part0 instanceof Map<?, ?> partMap)) {
                        return ResponseEntity.status(500).body("No part data in Gemini response.");
                    }

                    Object text = partMap.get("text");
                    if (text == null) {
                        return ResponseEntity.status(500).body("No text in Gemini response.");
                    }

                    return ResponseEntity.ok(text.toString().trim());
                })
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.just(ResponseEntity.status(500)
                        .body("Gemini API error: " + e.getMessage()));
                });
    }
}
