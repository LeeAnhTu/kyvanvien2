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
public class UserFollowDTO {
    private Long followId;
    private Long userId;
    private Long storyId;
    private Long chapterId;
    private int chapterNumber;
    private int statusFollow;
    private Date followedAt;
}
