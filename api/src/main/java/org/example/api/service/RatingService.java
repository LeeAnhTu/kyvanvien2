package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.RatingDTO;
import org.example.api.entity.Rating;
import org.example.api.entity.Story;
import org.example.api.entity.User;
import org.example.api.mapper.RatingMapper;
import org.example.api.repository.RatingRepository;
import org.example.api.repository.StoryRepository;
import org.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final RatingMapper ratingMapper;


    public RatingDTO createOrUpdateRating(Long userId, Long storyId, double ratingValue) {
        Optional<Rating> existingRating = ratingRepository.findByUserIdAndStoryId(userId, storyId);
        Rating rating;

        if (existingRating.isPresent()) {
            rating = existingRating.get();
            rating.setRating(ratingValue);
        } else {
            rating = new Rating();
            Story story = storyRepository.findById(storyId).orElseThrow(() -> new RuntimeException("Story not found"));
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            rating.setStory(story);
            rating.setUser(user);
            rating.setRating(ratingValue);
            rating.setCreatedAt(new Date());
        }

        rating = ratingRepository.save(rating);
        return ratingMapper.toDTO(rating);
    }
}
