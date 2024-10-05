package org.example.api.mapper;

import org.example.api.dto.StoryDTO;
import org.example.api.entity.Story;

public class StoryMapper {
    public static StoryDTO toDTO(Story story) {
        if (story == null) {
            return null;
        }

        return new StoryDTO(
                story.getId(),
                story.getStoryImg(),
                story.getTitle(),
                story.getSlug(),
                story.getDescription(),
                story.getAuthor(),
                story.getUser() != null ? story.getUser().getId() : null,
                story.getUser() != null ? story.getUser().getFullName() : null,
                story.getGenre() != null ? story.getGenre().getGenreId() : null,
                story.getGenre() != null ? story.getGenre().getGenreName() : null,
                story.getStatus() != null ? story.getStatus().getStatusId() : null,
                story.getStatus() != null ? story.getStatus().getStatusName() : null,
                story.getType() != null ? story.getType().getTypeId() : null,
                story.getType() != null ? story.getType().getTypeName() : null,
                story.getCheckStory(),
                story.getCreatedAt(),
                story.getUpdatedAt()
        );
    }

    public static Story toEntity(StoryDTO storyDTO) {
        if (storyDTO == null) {
            return null;
        }

        Story story = new Story();
        story.setId(storyDTO.getId());
        story.setStoryImg(storyDTO.getStoryImg());
        story.setTitle(storyDTO.getTitle());
        story.setSlug(storyDTO.getSlug());
        story.setDescription(storyDTO.getDescription());
        story.setAuthor(storyDTO.getAuthor());
        // Set các mối quan hệ khác nếu cần (có thể cần truy vấn thêm để lấy thực thể đầy đủ)
        story.setCheckStory(storyDTO.getCheckStory());
        story.setCreatedAt(storyDTO.getCreatedAt());
        story.setUpdatedAt(storyDTO.getUpdatedAt());

        return story;
    }
}
