package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.ChapterDTO;
import org.example.api.entity.Chapter;
import org.example.api.entity.Story;
import org.example.api.mapper.ChapterMapper;
import org.example.api.repository.ChapterRepository;
import org.example.api.repository.StoryRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChapterService {
    private final ChapterRepository chapterRepository;
    private final StoryRepository storyRepository;
    private ChapterMapper chapterMapper;


    public List<ChapterDTO> getChaptersByStoryId(Long storyId) {
        List<Chapter> chapters = chapterRepository.findByStoryId(storyId);
        return chapters.stream()
                .map(ChapterMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ChapterDTO> getChaptersByStoryIdByOrder(Long storyId) {
        // Fetch chapters by storyId
        List<Chapter> chapters = chapterRepository.findByStoryId(storyId);

        // Sort chapters by chapterId in descending order
        chapters.sort(Comparator.comparingLong(Chapter::getChapterId).reversed());

        // Convert the sorted list of Chapter entities to ChapterDTO objects
        return chapters.stream()
                .map(ChapterMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ChapterDTO addChapter(ChapterDTO chapterDTO) {
        Chapter chapter = chapterMapper.toEntity(chapterDTO);
        chapter.setCreatedAt(new Date());
        chapter.setUpdatedAt(new Date());
        chapter = chapterRepository.save(chapter);
        return ChapterMapper.toDTO(chapter);
    }


    public void deleteChapter(Long chapterId) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new RuntimeException("Chapter not found with ID: " + chapterId));
        chapterRepository.delete(chapter);
    }


    public List<ChapterDTO> getChaptersByStorySlug(String slug) {
        Story story = storyRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Story not found with slug: " + slug));

        List<Chapter> chapters = chapterRepository.findByStoryId(story.getId());

        return chapters.stream()
                .map(ChapterMapper::toDTO)
                .collect(Collectors.toList());
    }


    public ChapterDTO getChapterByStoryAndl(String slug, int chapterNumber) {
        Story story = storyRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Story not found with slug: " + slug));


        Chapter chapter = chapterRepository.findByStorySlugAndChapterNumber(slug, chapterNumber);
        return chapter != null ? ChapterMapper.toDTO(chapter) : null;
    }

    public ChapterDTO getChapterByStoryAndChapterId(Long storyId, Long chapterId) {
        Chapter chapter = chapterRepository.findByStoryIdAndChapterId(storyId, chapterId);
        return chapter != null ? ChapterMapper.toDTO(chapter) : null;
    }

    // update chapter
    public ChapterDTO updateChapter(Long storyId, Long chapterId, ChapterDTO chapterDTO) {
        Chapter chapter = chapterRepository.findByStoryIdAndChapterId(storyId, chapterId);

        if (chapter == null) {
            throw new RuntimeException("Chapter not found");
        }


        chapter.setTitle(chapterDTO.getTitle());
        chapter.setChapterNumber(chapterDTO.getChapterNumber());
        chapter.setContent(chapterDTO.getContent());
        chapter.setUpdatedAt(new Date());
        // Cập nhật các trường khác nếu cần

        chapterRepository.save(chapter);

        return ChapterMapper.toDTO(chapter);
    }
}
