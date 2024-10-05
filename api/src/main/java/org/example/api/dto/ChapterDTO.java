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
public class ChapterDTO {
    private Long chapterId;
    private Long storyId;
    private int chapterNumber;
    private String title;
    private String content;
    private Date createdAt;
    private Date updatedAt;
}
