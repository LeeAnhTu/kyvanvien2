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
public class CommentDTO {

    private Long commentId;
    private Long chapterId;
    private String chapterName;
    private Long storyId;
    private String storyName;
    private Long userId;
    private String userName;
    private String commentText;
    private Date createdAt;
}
