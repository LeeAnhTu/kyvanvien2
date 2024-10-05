package org.example.api.repository;

import org.example.api.entity.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFollowRepository extends JpaRepository<UserFollow, Long> {
    List<UserFollow> findByUserId(Long userId);
    Optional<UserFollow> findByUserIdAndStoryId(Long userId, Long storyId);
    Optional<UserFollow> findByUserIdAndStoryIdAndChapter_ChapterId(Long userId, Long storyId, Long chapterId);

    @Query("SELECT COUNT(l) FROM UserFollow l WHERE l.story.id = :storyId AND l.statusFollow = 1")
    Long countByStoryId(@Param("storyId") Long storyId);

}
