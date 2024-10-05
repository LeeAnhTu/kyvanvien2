package org.example.api.mapper;

import org.example.api.dto.RatingDTO;
import org.example.api.entity.Rating;
import org.springframework.stereotype.Component;

@Component
public class RatingMapper {
    // Chuyển đổi từ Rating entity sang RatingDTO
    public RatingDTO toDTO(Rating rating) {
        if (rating == null) {
            return null;
        }

        RatingDTO dto = new RatingDTO();
        dto.setRatingId(rating.getRatingId());
        dto.setUserId(rating.getUser() != null ? rating.getUser().getId() : null);
        dto.setStoryId(rating.getStory() != null ? rating.getStory().getId() : null);
        dto.setRating(rating.getRating());
        dto.setCreatedAt(rating.getCreatedAt());
        return dto;
    }
}
