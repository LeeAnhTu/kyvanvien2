package org.example.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProgressDTO {
    private Long progressId;
    private Long userId;
    private Long storyId;
    private String storyTitle;
    private Long chapterId;
    private int chapterNumber;
    private Integer statusProgress;
    private Date lastRead;
}
