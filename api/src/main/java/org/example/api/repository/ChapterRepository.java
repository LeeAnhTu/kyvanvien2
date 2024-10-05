package org.example.api.repository;

import org.example.api.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    List<Chapter> findByStoryId(Long storyId);
    Optional<Chapter> findByChapterNumber(int chapterNumber);
    Chapter findByStorySlugAndChapterNumber(String slug, int chapterNumber);
    Chapter findByStoryIdAndChapterId(Long storyId, Long chapterId);

    Optional<Chapter> findByChapterNumberAndStoryId(int chapterNumber, Long storyId);


    @Query("SELECT COUNT(c) FROM Chapter c WHERE c.story.id = :storyId")
    Long countByStoryId(@Param("storyId") Long storyId);


    @Query("SELECT c FROM Chapter c WHERE c.story.id = :storyId ORDER BY c.createdAt DESC LIMIT 1")
    Chapter findTopByStoryIdOrderByCreatedAtDesc(@Param("storyId") Long storyId);
}
