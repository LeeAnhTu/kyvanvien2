package org.example.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserLikeDTO {
    private Long likeId;
    private Long userId;
    private Long storyId;
    private int statusLike;
    private Date likeAt;
}
