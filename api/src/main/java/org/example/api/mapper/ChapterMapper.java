package org.example.api.mapper;

import lombok.AllArgsConstructor;
import org.example.api.dto.ChapterDTO;
import org.example.api.entity.Chapter;
import org.example.api.entity.Story;
import org.example.api.repository.StoryRepository;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ChapterMapper {

    private StoryRepository storyRepository;

    public static ChapterDTO toDTO(Chapter chapter) {
        if (chapter == null) {
            return null;
        }

        return new ChapterDTO(
                chapter.getChapterId(),
                chapter.getStory() != null ? chapter.getStory().getId() : null, // Lấy ID của Story
                chapter.getChapterNumber(),
                chapter.getTitle(),
                chapter.getContent(),
                chapter.getCreatedAt(),
                chapter.getUpdatedAt()
        );
    }

    public Chapter toEntity(ChapterDTO chapterDTO) {
        if (chapterDTO == null) {
            return null;
        }

        Chapter chapter = new Chapter();
        chapter.setChapterId(chapterDTO.getChapterId());

        // Fetch the story entity using the storyRepository
        Story story = storyRepository.findById(chapterDTO.getStoryId()).orElse(null);
        chapter.setStory(story);

        chapter.setChapterNumber(chapterDTO.getChapterNumber());
        chapter.setTitle(chapterDTO.getTitle());
        chapter.setContent(chapterDTO.getContent());
        chapter.setCreatedAt(chapterDTO.getCreatedAt());
        chapter.setUpdatedAt(chapterDTO.getUpdatedAt());

        return chapter;
    }
}
