package org.example.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor
public class StoryDTO {
    private Long id;
    private String storyImg;
    private String title;
    private String slug;
    private String description;
    private String author;
    private Long userId;
    private String userName;
    private Long genreId;
    private String genreName;
    private Long statusId;
    private String statusName;
    private Long typeId;
    private String typeName;
    private Long checkStory;
    private Date createdAt;
    private Date updatedAt;
    private Long chapterCount;
    private Long ratingCount;
    private Double averageRating;
    private Long viewCount;
    private Long likeCount;

    public StoryDTO(Long id, String storyImg, String title, String slug, String description,
                    String author, Long userId, String userName, Long genreId, String genreName,
                    Long statusId, String statusName, Long typeId, String typeName,Long checkStory, Date createdAt,
                    Date updatedAt) {
        this.id = id;
        this.storyImg = storyImg;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.author = author;
        this.userId = userId;
        this.userName = userName;
        this.genreId = genreId;
        this.genreName = genreName;
        this.statusId = statusId;
        this.statusName = statusName;
        this.typeId = typeId;
        this.typeName = typeName;
        this.checkStory = checkStory;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    public StoryDTO(Long id, String storyImg, String title, String slug, String description,
                    String author, Long userId, String userName, Long genreId, String genreName,
                    Long statusId, String statusName, Long typeId, String typeName,Long checkStory, Date createdAt,
                    Date updatedAt, Long chapterCount, Long ratingCount, Double averageRating) {
        this.id = id;
        this.storyImg = storyImg;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.author = author;
        this.userId = userId;
        this.userName = userName;
        this.genreId = genreId;
        this.genreName = genreName;
        this.statusId = statusId;
        this.statusName = statusName;
        this.typeId = typeId;
        this.typeName = typeName;
        this.checkStory = checkStory;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.chapterCount = chapterCount;
        this.ratingCount = ratingCount;
        this.averageRating = averageRating;
    }
}
