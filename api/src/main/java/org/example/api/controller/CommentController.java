package org.example.api.controller;

import lombok.AllArgsConstructor;
import org.example.api.dto.CommentDTO;
import org.example.api.entity.Genre;
import org.example.api.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getAllGenres() {
        List<CommentDTO> comments = commentService.getAll();
        return ResponseEntity.ok(comments);
    }

    // Lấy tất cả các comment theo story ID
    @GetMapping("/story/{storyId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByStoryId(
            @PathVariable Long storyId,
            @RequestParam(value = "sortOrder", required = false, defaultValue = "desc") String sortOrder) {
        List<CommentDTO> comments = commentService.getCommentsByStoryId(storyId, sortOrder);
        return ResponseEntity.ok(comments);
    }

    // Tạo mới một comment
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO) {
        CommentDTO createdComment = commentService.createComment(commentDTO);
        return ResponseEntity.ok(createdComment);
    }

    // Xóa một comment theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

}
