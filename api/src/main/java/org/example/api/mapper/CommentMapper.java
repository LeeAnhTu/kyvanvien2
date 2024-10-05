package org.example.api.mapper;

import org.example.api.dto.CommentDTO;
import org.example.api.entity.Comment;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    public static CommentDTO toDTO(Comment comment) {
        if (comment == null) {
            return null;
        }

        return new CommentDTO(
                comment.getCommentId(),
                comment.getChapter() != null ? comment.getChapter().getChapterId() : null,
                comment.getChapter() != null ? comment.getChapter().getTitle() : null,
                comment.getStory() != null ? comment.getStory().getId() : null,
                comment.getStory() != null ? comment.getStory().getTitle() : null,
                comment.getUser() != null ? comment.getUser().getId() : null,
                comment.getUser()!= null ? comment.getUser().getFullName() : null,
                comment.getCommentText(),
                comment.getCreatedAt()
        );
    }

    public Comment toEntity(CommentDTO commentDTO) {
        if (commentDTO == null) {
            return null;
        }

        Comment comment = new Comment();
        comment.setCommentId(commentDTO.getCommentId());
        // You may need to set chapter, story, and user entities based on the IDs provided
        comment.setCommentText(commentDTO.getCommentText());
        comment.setCreatedAt(commentDTO.getCreatedAt());

        return comment;
    }
}
