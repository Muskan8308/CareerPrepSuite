package com.example.careerprep.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/career/path")
@CrossOrigin(origins = "http://localhost:3000") // ✅ CORS Fixed
public class CareerPathController {

    @PostMapping("/recommend")
    public List<Map<String, Object>> recommendCareerPaths(@RequestBody Map<String, String> request) {
        String skills = request.getOrDefault("skills", "").toLowerCase();
        String experience = request.getOrDefault("experience", "0").trim();
        int expYears;
        
        try {
            expYears = Integer.parseInt(experience.replaceAll("[^0-9]", ""));
        } catch (NumberFormatException e) {
            expYears = 0;
        }
        
        List<Map<String, Object>> allPaths = getAllCareerPaths();
        
        // ✅ FIXED: Safe casting with Integer
        for (Map<String, Object> path : allPaths) {
            @SuppressWarnings("unchecked")
            List<String> requiredSkills = (List<String>) path.get("requiredSkills");
            int skillMatch = calculateSkillMatch(skills, requiredSkills);
            
            // ✅ FIXED: Integer use kiya instead of Long
            int idealExp = (Integer) path.get("idealExperience");
            int expMatch = calculateExperienceMatch(expYears, idealExp);
            int totalScore = (skillMatch * 70) + (expMatch * 30);
            
            path.put("matchScore", totalScore);
            path.put("skillMatchCount", skillMatch);
        }
        
        // Sort and return top 5
        allPaths.sort((a, b) -> Integer.compare((Integer) b.get("matchScore"), (Integer) a.get("matchScore")));
        return allPaths.subList(0, Math.min(5, allPaths.size()));
    }
    
    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> getAllCareerPaths() {
        return Arrays.asList(
            createPath("Full Stack Developer", "$90k-$150k", "High", 
                      Arrays.asList("react", "node.js", "sql", "git", "aws"), 2, "Build full-stack projects"),
            createPath("Frontend Developer", "$80k-$130k", "Very High",
                      Arrays.asList("react", "javascript", "css", "typescript"), 1, "Master React + portfolio"),
            createPath("DevOps Engineer", "$110k-$170k", "Very High",
                      Arrays.asList("docker", "kubernetes", "aws", "jenkins"), 3, "Get Docker/AWS certs"),
            createPath("Data Scientist", "$100k-$160k", "High",
                      Arrays.asList("python", "sql", "pandas", "machine learning"), 2, "Kaggle + ML projects"),
            createPath("Backend Developer", "$85k-$140k", "High",
                      Arrays.asList("java", "spring", "sql", "redis"), 2, "Build REST APIs"),
            createPath("Mobile Developer", "$90k-$145k", "Medium",
                      Arrays.asList("react native", "flutter"), 2, "Publish mobile apps"),
            createPath("Cloud Engineer", "$120k-$180k", "Very High",
                      Arrays.asList("aws", "azure", "terraform", "docker"), 3, "Cloud certifications")
        );
    }
    
    private Map<String, Object> createPath(String title, String salary, String growth, 
                                         List<String> skills, int exp, String steps) {
        Map<String, Object> path = new HashMap<>();
        path.put("title", title);
        path.put("salary", salary);
        path.put("growth", growth);
        path.put("requiredSkills", skills);
        path.put("idealExperience", exp); // ✅ Already Integer
        path.put("nextSteps", steps);
        return path;
    }
    
    private int calculateSkillMatch(String userSkills, List<String> requiredSkills) {
        if (userSkills.isEmpty()) return 0;
        List<String> userSkillsList = Arrays.asList(userSkills.split(",\\s*"));
        int matches = 0;
        
        for (String reqSkill : requiredSkills) {
            for (String userSkill : userSkillsList) {
                if (userSkill.contains(reqSkill.toLowerCase()) || 
                    reqSkill.toLowerCase().contains(userSkill)) {
                    matches++;
                    break;
                }
            }
        }
        return Math.min(matches, requiredSkills.size());
    }
    
    private int calculateExperienceMatch(int userExp, int idealExp) {
        if (idealExp == 0) return 100;
        if (userExp >= idealExp) return 100;
        return (int) (userExp * 100.0 / idealExp);
    }
}