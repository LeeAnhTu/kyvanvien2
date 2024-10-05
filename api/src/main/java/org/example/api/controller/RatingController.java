package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.RatingDTO;
import org.example.api.entity.Rating;
import org.example.api.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/ratings")
public class RatingController {

    private final RatingService ratingService;

    @PostMapping("/rate")
    public ResponseEntity<RatingDTO> createOrUpdateRating(@RequestParam Long userId,
                                                          @RequestParam Long storyId,
                                                          @RequestParam double ratingValue) {
        RatingDTO ratingDTO = ratingService.createOrUpdateRating(userId, storyId, ratingValue);
        return ResponseEntity.ok(ratingDTO);
    }
}
