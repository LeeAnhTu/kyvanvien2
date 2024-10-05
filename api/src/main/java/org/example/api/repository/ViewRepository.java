package org.example.api.repository;

import org.example.api.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ViewRepository extends JpaRepository<View, Long> {

    @Query("SELECT COUNT(v) FROM View v WHERE v.story.id = :storyId")
    Long countByStoryId(@Param("storyId") Long storyId);
}
