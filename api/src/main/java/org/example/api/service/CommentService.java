package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.CommentDTO;
import org.example.api.entity.*;
import org.example.api.mapper.CommentMapper;
import org.example.api.repository.ChapterRepository;
import org.example.api.repository.CommentRepository;
import org.example.api.repository.StoryRepository;
import org.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    private final ChapterRepository chapterRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    private CommentMapper commentMapper;

    public CommentDTO getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found with ID: " + commentId));
        return CommentMapper.toDTO(comment);
    }


//    public List<CommentDTO> getCommentsByStoryId(Long storyId) {
//        List<Comment> comments = commentRepository.findByStoryId(storyId);
//        return comments.stream()
//                .map(CommentMapper::toDTO)
//                .collect(Collectors.toList());
//    }

    public List<CommentDTO> getCommentsByStoryId(Long storyId, String sortOrder) {
        List<Comment> comments;
        if ("asc".equalsIgnoreCase(sortOrder)) {
            comments = commentRepository.findByStoryIdOrderByCreatedAtAsc(storyId);
        } else {
            comments = commentRepository.findByStoryIdOrderByCreatedAtDesc(storyId); // Default to "desc"
        }
        return comments.stream()
                .map(CommentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<CommentDTO> getAllComments(Long chapterId, Long storyId, Long userId) {
        List<CommentDTO> comments = commentRepository.findAll().stream()
                .map(CommentMapper::toDTO)
                .collect(Collectors.toList());

        if (chapterId != null) {
            comments = comments.stream()
                    .filter(comment -> comment.getChapterId().equals(chapterId))
                    .collect(Collectors.toList());
        }

        if (storyId != null) {
            comments = comments.stream()
                    .filter(comment -> comment.getStoryId().equals(storyId))
                    .collect(Collectors.toList());
        }

        if (userId != null) {
            comments = comments.stream()
                    .filter(comment -> comment.getUserId().equals(userId))
                    .collect(Collectors.toList());
        }

        return comments;
    }

    public List<CommentDTO> getAll() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream()
                .sorted(Comparator.comparing(Comment::getCreatedAt).reversed())
                .map(CommentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CommentDTO createComment(CommentDTO commentDTO) {
        // Tìm và thiết lập chapter, story, và user từ các repository
        Chapter chapter = chapterRepository.findById(commentDTO.getChapterId())
                .orElseThrow(() -> new RuntimeException("Chapter not found"));
        Story story = storyRepository.findById(commentDTO.getStoryId())
                .orElseThrow(() -> new RuntimeException("Story not found"));
        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Chuyển đổi CommentDTO thành Comment
        Comment comment = commentMapper.toEntity(commentDTO);
        comment.setChapter(chapter);
        comment.setStory(story);
        comment.setUser(user);


        // Lưu comment và chuyển đổi lại thành CommentDTO
        Comment savedComment = commentRepository.save(comment);

        return CommentMapper.toDTO(savedComment);
    }

    public void deleteComment(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new RuntimeException("Comment not found with ID: " + commentId);
        }
        commentRepository.deleteById(commentId);
    }
}
