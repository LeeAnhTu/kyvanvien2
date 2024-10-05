package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.UserFollowDTO;
import org.example.api.service.UserFollowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/user-follows")
public class UserFollowController {

    private final UserFollowService userFollowService;

    //lấy danh sách các bản ghi theo dõi của người dùng
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserFollowDTO>> getActiveUserFollows(@PathVariable Long userId) {
        List<UserFollowDTO> follows = userFollowService.getActiveUserFollows(userId);
        return ResponseEntity.ok(follows);
    }

    @GetMapping("one-follow")
    public ResponseEntity<UserFollowDTO> getUserFollow(
            @RequestParam Long userId,
            @RequestParam Long storyId,
            @RequestParam(required = false) Long chapterId
    ) {
        UserFollowDTO follow = userFollowService.getUserFollow(userId, storyId, chapterId);

        if (follow != null) {
            return ResponseEntity.ok(follow);
        } else {
            return ResponseEntity.noContent().build();
        }
    }



    // tạo follow
    @PostMapping("/follow")
    public ResponseEntity<UserFollowDTO> followStory(
            @RequestParam Long userId,
            @RequestParam Long storyId,
            @RequestParam(required = false) Long chapterId) { // chapterId có thể là null
        UserFollowDTO responseDTO = userFollowService.followStory(userId, storyId, chapterId);
        return ResponseEntity.ok(responseDTO);
    }

    // unfollow
    @PostMapping("/unfollow")
    public ResponseEntity<Void> unfollowStory(
            @RequestParam Long userId,
            @RequestParam Long storyId,
            @RequestParam(required = false) Long chapterId) { // chapterId có thể là null
        userFollowService.unfollowStory(userId, storyId, chapterId);
        return ResponseEntity.ok().build();
    }
}
