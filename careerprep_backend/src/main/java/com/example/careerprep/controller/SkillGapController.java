package com.example.careerprep.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/skills/gap")
public class SkillGapController {

    @PostMapping("/analyze")
    public Map<String, Object> analyzeSkillGap(@RequestBody Map<String, String> request) {
        String userSkills = request.getOrDefault("userSkills", "").toLowerCase();
        String targetJob = request.getOrDefault("targetJob", "Software Engineer").toLowerCase();
        
        // Job-specific required skills
        Map<String, List<String>> jobSkills = getJobRequiredSkills();
        List<String> requiredSkills = jobSkills.getOrDefault(targetJob, getDefaultSkills());
        
        // User's current skills
        List<String> userSkillList = Arrays.asList(userSkills.split(",\\s*"));
        
        // Calculate gaps
        List<String> skillGaps = new ArrayList<>();
        List<String> matches = new ArrayList<>();
        int matchPercentage = 0;
        
        for (String skill : requiredSkills) {
            if (userSkillList.stream().anyMatch(userSkill -> 
                userSkill.contains(skill.toLowerCase()) || skill.toLowerCase().contains(userSkill))) {
                matches.add(skill);
            } else {
                skillGaps.add(skill);
            }
        }
        
        matchPercentage = (int) ((matches.size() * 100.0) / requiredSkills.size());
        
        // Learning resources
        Map<String, String> resources = getLearningResources(skillGaps);
        
        return Map.of(
            "targetJob", targetJob,
            "matchPercentage", matchPercentage,
            "currentSkills", matches,
            "skillGaps", skillGaps,
            "requiredSkillsCount", requiredSkills.size(),
            "learningResources", resources,
            "recommendations", generateRecommendations(skillGaps, targetJob),
            "timeToLearn", estimateLearningTime(skillGaps.size())
        );
    }
    
    private Map<String, List<String>> getJobRequiredSkills() {
        return Map.of(
            "software engineer", Arrays.asList("react", "javascript", "node.js", "git", "aws", "sql", "docker"),
            "full stack developer", Arrays.asList("react", "node.js", "mongodb", "express", "aws", "docker"),
            "data scientist", Arrays.asList("python", "pandas", "sql", "machine learning", "tableau", "statistics"),
            "devops engineer", Arrays.asList("docker", "kubernetes", "jenkins", "terraform", "aws", "ci/cd"),
            "frontend developer", Arrays.asList("react", "javascript", "css", "html", "typescript", "next.js"),
            "backend developer", Arrays.asList("java", "spring boot", "sql", "redis", "kafka", "microservices")
        );
    }
    
    private List<String> getDefaultSkills() {
        return Arrays.asList("javascript", "python", "sql", "git");
    }
    
    private Map<String, String> getLearningResources(List<String> gaps) {
        Map<String, String> resources = new LinkedHashMap<>();
        for (String gap : gaps) {
            resources.put(gap, getResourceForSkill(gap));
        }
        return resources;
    }
    
    private String getResourceForSkill(String skill) {
        return switch (skill.toLowerCase()) {
            case "react" -> "freeCodeCamp React Course (30h) | Official Docs";
            case "node.js" -> "Node.js Tutorial - Net Ninja (20h) | nodejs.org";
            case "docker" -> "Docker for Beginners - freeCodeCamp (10h)";
            case "aws" -> "AWS Cloud Practitioner - A Cloud Guru (25h)";
            case "python" -> "Python for Everybody - Coursera (20h)";
            case "sql" -> "SQL for Data Analysis - Udacity (15h)";
            default -> "Search Udemy/Coursera for '" + skill + "'";
        };
    }
    
    private List<String> generateRecommendations(List<String> gaps, String job) {
        if (gaps.isEmpty()) {
            return List.of("🎉 Perfect match! You're ready for " + job + " roles!");
        }
        
        List<String> recs = new ArrayList<>();
        recs.add("Priority 1: Learn top 3 skills first");
        recs.add("Practice on LeetCode/HackerRank");
        recs.add("Build 2-3 projects with these skills");
        recs.add("Update LinkedIn + GitHub");
        return recs;
    }
    
    private String estimateLearningTime(int gapCount) {
        int hours = gapCount * 20;
        return String.format("%d- %d hours (2-4 weeks)", hours, hours * 2);
    }
}