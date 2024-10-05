package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.UserProgressDTO;
import org.example.api.entity.UserProgress;
import org.example.api.service.UserProgressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/reading-history")
public class UserProgressController {

    private final UserProgressService userProgressService;


    //lấy Danh sách lịch sử đọc
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserProgressDTO>> getUserProgressByUserId(@PathVariable Long userId) {
        List<UserProgressDTO> userProgressDTOs = userProgressService.getUserProgressByUserId(userId);
        return ResponseEntity.ok(userProgressDTOs);
    }

    //lấy 1
    @GetMapping("/by-story")
    public ResponseEntity<UserProgressDTO> getUserProgressByStory(
            @RequestParam Long userId,
            @RequestParam Long storyId) {

        UserProgressDTO userProgress = userProgressService.getUserProgressByStory(userId, storyId);

        if (userProgress != null) {
            return ResponseEntity.ok(userProgress);
        } else {
            return ResponseEntity.noContent().build(); // Trả về 204 No Content nếu không có dữ liệu
        }
    }

    //Tạo bằng storyId và chapterId
    @PostMapping("/save-or-update")
    public ResponseEntity<UserProgress> saveOrUpdateUserProgress(
            @RequestParam Long userId,
            @RequestParam Long storyId,
            @RequestParam Long chapterId) {

        // Gọi phương thức service để cập nhật hoặc tạo mới tiến trình đọc
        UserProgress updatedProgress = userProgressService.saveOrUpdateUserProgress(userId, storyId, chapterId);

        // Trả về phản hồi với mã trạng thái 200 OK và đối tượng UserProgress
        return ResponseEntity.ok(updatedProgress);
    }


    //Sửa bằng storyId và chapterId
    @PutMapping("/delete")
    public ResponseEntity<?> deleteUserProgress(@RequestParam Long userId,
                                                @RequestParam Long storyId,
                                                @RequestParam Long chapterId) {
        try {
            UserProgress updatedProgress = userProgressService.updateUserProgressStatusToDeleted(userId, storyId, chapterId);
            if (updatedProgress != null) {
                return ResponseEntity.ok(updatedProgress);
            } else {
                return ResponseEntity.notFound().build(); // Hoặc trả về một thông báo lỗi tùy chọn
            }
        } catch (Exception e) {
            // Xử lý lỗi
            return ResponseEntity.status(500).body("Có lỗi xảy ra khi cập nhật tiến trình đọc.");
        }
    }



    //Tạo bằng slug và chapterNumber
    @PostMapping("/saveOrUpdate")
    public ResponseEntity<UserProgress> saveOrUpdateUserProgress(
            @RequestParam Long userId,
            @RequestParam String slug,
            @RequestParam int chapterNumber) {

        UserProgress userProgress = userProgressService.saveOrUpdateUserProgress(userId, slug, chapterNumber);

        return ResponseEntity.ok(userProgress);
    }


    //Sửa bằng slug và chapterNumber
    @PutMapping("/update-status-to-deleted")
    public ResponseEntity<?> updateUserProgressStatusToDeleted(
            @RequestParam Long userId,
            @RequestParam String slug,
            @RequestParam int chapterNumber) {

        UserProgress updatedProgress = userProgressService.updateUserProgressStatusToDeleted(userId, slug, chapterNumber);

        if (updatedProgress != null) {
            return ResponseEntity.ok(updatedProgress);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User progress not found or could not be updated");
        }
    }
}
