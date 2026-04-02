package com.example.careerprep.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class FeatureController {

    @GetMapping("/api/interview/questions")
    public List<Map<String, String>> getInterviewQuestions() {
        return List.of(
                Map.of("question", "Tell me about yourself.", "id", "1"),
                Map.of("question", "What are your strengths?", "id", "2"),
                Map.of("question", "Why do you want this job?", "id", "3")
        );
    }

    @GetMapping("/api/interview/feedback")
    public Map<String, String> getFeedback() {
        return Map.of("feedback", "Great answer! You demonstrated confidence. Tip: Add more specific examples next time.");
    }
}