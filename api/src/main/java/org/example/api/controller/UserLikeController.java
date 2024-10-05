package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.UserLikeDTO;
import org.example.api.entity.UserLike;
import org.example.api.service.UserLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/user-likes")
public class UserLikeController {
    private final UserLikeService userLikeService;

    // Endpoint để kiểm tra nếu người dùng đã thích câu chuyện
    @GetMapping("/check")
    public ResponseEntity<UserLikeDTO> checkIfLiked(
            @RequestParam Long userId,
            @RequestParam Long storyId) {
        UserLikeDTO userLikeDTO = userLikeService.checkIfLiked(userId, storyId);
        if (userLikeDTO != null) {
            return ResponseEntity.ok(userLikeDTO); // Trả về UserLikeDTO nếu tồn tại
        } else {
            return ResponseEntity.noContent().build(); // Trả về 204 nếu không tồn tại
        }
    }

    // Endpoint để thích câu chuyện
    @PostMapping("/like")
    public ResponseEntity<UserLikeDTO> likeStory(
            @RequestParam Long userId,
            @RequestParam Long storyId) {
        UserLikeDTO userLikeDTO = userLikeService.likeStory(userId, storyId);
        return ResponseEntity.ok(userLikeDTO);
    }

    // Endpoint để bỏ thích câu chuyện
    @PostMapping("/unlike")
    public ResponseEntity<UserLikeDTO> unlikeStory(
            @RequestParam Long userId,
            @RequestParam Long storyId) {

         userLikeService.unlikeStory(userId, storyId);
        return ResponseEntity.noContent().build();
    }
}
