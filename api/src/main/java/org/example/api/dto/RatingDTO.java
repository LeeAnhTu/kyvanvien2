package org.example.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO {
    private Long ratingId;
    private Long userId;
    private Long storyId;
    private double rating;
    private Date createdAt;
}
