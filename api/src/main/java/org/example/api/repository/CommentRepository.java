package org.example.api.repository;

import org.example.api.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByStoryId(Long storyId);

    List<Comment> findByStoryIdOrderByCreatedAtAsc(Long storyId);

    List<Comment> findByStoryIdOrderByCreatedAtDesc(Long storyId);
}
