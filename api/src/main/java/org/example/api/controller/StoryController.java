package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.ChapterDTO;
import org.example.api.dto.StoryDTO;
import org.example.api.service.ChapterService;
import org.example.api.service.StoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/stories")
public class StoryController {
    private final StoryService storyService;
    private final ChapterService chapterService;

    @GetMapping
    public List<StoryDTO> getAllStories() {
        return storyService.fetchAllStories(); // Phương thức sẽ trả về danh sách StoryDTO
    }

    @GetMapping("/check")
    public List<StoryDTO> getAllStoriesByCheck() {
        return storyService.fetchAllStoriesByCheck(); // Phương thức sẽ trả về danh sách StoryDTO
    }

    // API để lấy danh sách các truyện với chương mới nhất
    @GetMapping("/new-chapters")
    public List<StoryDTO> getNewChapterStories() {
        return storyService.getNewChapterStories();
    }

    // API để lấy danh sách các truyện với chương mới nhất
    @GetMapping("/completed-stories")
    public List<StoryDTO> getCompletedStories() {
        return storyService.getStoriesCompleted();
    }

    // API để lấy danh sách các truyện với lượt đọc
    @GetMapping("/view-count-stories")
    public List<StoryDTO> getViewCountStories() {
        return storyService.getStoriesByViewCount();
    }

    // API để lấy danh sách các truyện với điểm đánh giá
    @GetMapping("/average-rating-stories")
    public List<StoryDTO> getAverageRatingStories() {
        return storyService.getStoriesByAverageRating();
    }

    // API để lấy danh sách các truyện với số lượt Follow
    @GetMapping("/follow-stories")
    public List<StoryDTO> getFollowStories() {
        return storyService.getStoriesByFollowCount();
    }

    // API để đếm số lượng truyện
    @GetMapping("/count")
    public Long countUsers() {
        return storyService.countAllStories(); // Gọi đến phương thức count từ service
    }

    // API để lấy danh sách các truyện của user đã post
    @GetMapping("/user/{userId}")
    public List<StoryDTO> getUserPostStories(@PathVariable Long userId) {
        return storyService.fetchStoriesByUserId(userId);
    }

    // API để lấy danh sách các truyện của user đang chờ duyệt
    @GetMapping("/user/{userId}/awaiting")
    public List<StoryDTO> getUserPostStoriesAwaitingApproval(@PathVariable Long userId) {
        return storyService.fetchStoriesAwaitingApprovalByUserId(userId);
    }

    // API để lấy danh sách các truyện của user không được duyệt
    @GetMapping("/user/{userId}/not")
    public List<StoryDTO> getUserPostStoriesNotApproval(@PathVariable Long userId) {
        return storyService.fetchStoriesNotApprovalByUserId(userId);
    }

    @GetMapping("/{id}")
    public StoryDTO getStoryById(@PathVariable Long id) {
        return storyService.getStoryById(id); // Phương thức sẽ trả về StoryDTO
    }

    @PostMapping
    public StoryDTO createStory(@RequestBody StoryDTO storyDTO) {
        return storyService.createStory(storyDTO); // Phương thức sẽ nhận StoryDTO và trả về StoryDTO
    }

    @PutMapping("/{id}")
    public StoryDTO updateStory(@PathVariable Long id, @RequestBody StoryDTO storyDTO) {
        return storyService.updateStory(id, storyDTO); // Phương thức sẽ nhận StoryDTO và trả về StoryDTO
    }

    // Duyệt truyện
    @PutMapping("/approve/{id}")
    public ResponseEntity<StoryDTO> approveStory(@PathVariable Long id, @RequestParam Long isApproved) {
        StoryDTO updatedStory = storyService.approveStory(id, isApproved);
        return ResponseEntity.ok(updatedStory);
    }

    @DeleteMapping("/{id}")
    public void deleteStory(@PathVariable Long id) {
        storyService.deleteStory(id); // Phương thức sẽ xóa câu chuyện theo id
    }

    @GetMapping("/search")
    public List<StoryDTO> searchStories(@RequestParam("query") String query) {
        return storyService.searchStories(query);
    }


    @GetMapping("/filter")
    public List<StoryDTO> filterStories(
            @RequestParam(value = "typeId", required = false) Long typeId,
            @RequestParam(value = "genreId", required = false) Long genreId,
            @RequestParam(value = "statusId", required = false) Long statusId,
            @RequestParam(value = "sortBy", defaultValue = "lastChapter") String sortBy) {
        return storyService.filterStories(typeId, genreId, statusId, sortBy);
    }

    @GetMapping("/filter1")
    public List<StoryDTO> filterStories1(
            @RequestParam(value = "typeId", required = false) Long typeId,
            @RequestParam(value = "genreId", required = false) Long genreId,
            @RequestParam(value = "statusId", required = false) Long statusId) {
        return storyService.filterStories1(typeId, genreId, statusId );
    }

    @GetMapping("/{storyId}/chapters")
    public List<ChapterDTO> getChaptersByStoryIdByOrder(@PathVariable Long storyId) {
        return chapterService.getChaptersByStoryIdByOrder(storyId);
    }

    @GetMapping("/{storyId}/chapters1")
    public List<ChapterDTO> getChaptersByStoryId(@PathVariable Long storyId) {
        return chapterService.getChaptersByStoryId(storyId);
    }

    @GetMapping("/{slug}/chapters2")
    public ResponseEntity<List<ChapterDTO>> getChaptersByStorySlug(@PathVariable String slug) {
        List<ChapterDTO> chapters = chapterService.getChaptersByStorySlug(slug);
        return ResponseEntity.ok(chapters);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<StoryDTO> getStoryBySlug(@PathVariable String slug) {
        StoryDTO storyDTO = storyService.getStoryBySlug(slug);
        return ResponseEntity.ok(storyDTO);
    }

}
