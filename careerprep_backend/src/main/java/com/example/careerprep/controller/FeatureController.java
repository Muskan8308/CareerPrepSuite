package com.example.careerprep.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interview")  // Fixed path
public class FeatureController {

    @GetMapping("/questions")  // Fixed endpoint
    public List<Map<String, String>> getInterviewQuestions() {
        return List.of(
            Map.of("question", "Tell me about yourself.", "id", "1"),
            Map.of("question", "What are your strengths and weaknesses?", "id", "2"),
            Map.of("question", "Why do you want to work here?", "id", "3"),
            Map.of("question", "Describe a challenging project.", "id", "4"),
            Map.of("question", "Where do you see yourself in 5 years?", "id", "5")
        );
    }

    @PostMapping("/feedback")  // Fixed endpoint
    public Map<String, String> getFeedback(@RequestBody Map<String, String> request) {
        String answer = request.getOrDefault("answer", "");
        String feedback = answer.length() > 20 
            ? "Excellent answer! Clear structure and relevant examples. Tip: Add more metrics next time."
            : "Good start! Try to elaborate with specific examples and achievements.";
        
        return Map.of("feedback", feedback);
    }
}