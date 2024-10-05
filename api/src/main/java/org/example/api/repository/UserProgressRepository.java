package org.example.api.repository;

import org.example.api.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    // Tìm tiến trình đọc theo người dùng, truyện, và chương
    Optional<UserProgress> findByUserIdAndStoryIdAndChapter_ChapterId(Long userId, Long storyId, Long chapterId);

    Optional<UserProgress> findByUserIdAndStoryId(Long userId, Long storyId);
    List<UserProgress> findByUserId(Long userId);

//    Optional<UserProgress> findByUserIdAndStoryId(Long userId, Long storyId);

}
