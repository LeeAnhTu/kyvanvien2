package org.example.api.repository;

import org.example.api.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLikeRepository extends JpaRepository<UserLike, Long> {
    Optional<UserLike> findByUserIdAndStoryId(Long userId,Long storyId);

    @Query("SELECT COUNT(l) FROM UserLike l WHERE l.story.id = :storyId AND l.statusLike = 1")
    Long countByStoryId(@Param("storyId") Long storyId);
}
