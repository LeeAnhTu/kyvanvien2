package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.ChapterDTO;
import org.example.api.entity.Chapter;
import org.example.api.service.ChapterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/chapters")
public class ChapterController {
    private final ChapterService chapterService;

    @GetMapping("/story/{storyId}")
    public List<ChapterDTO> getChaptersByStoryId(@PathVariable Long storyId) {
        return chapterService.getChaptersByStoryId(storyId);
    }
//    @GetMapping("/story/{slug}")
//    public ResponseEntity<List<Chapter>> getChaptersByStorySlug(@PathVariable String slug) {
//        List<Chapter> chapters = chapterService.getChaptersByStorySlug(slug);
//        return ResponseEntity.ok(chapters);
//    }

    // Lấy 1 chapter theo storyId và chapterId
    @GetMapping("/stories/{storyId}/chapters/{chapterId}")
    public ResponseEntity<ChapterDTO> getChapterByStoryAndChapterId(
            @PathVariable("storyId") Long storyId,
            @PathVariable("chapterId") Long chapterId) {
        ChapterDTO chapter = chapterService.getChapterByStoryAndChapterId(storyId, chapterId);
        if (chapter == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(chapter);
    }

    @GetMapping("/story/{slug}/number/{chapterNumber}")
    public ResponseEntity<ChapterDTO> getChaptersBySlugAndChapterNumber(
            @PathVariable String slug,
            @PathVariable int chapterNumber) {
        ChapterDTO chapter = chapterService.getChapterByStoryAndl(slug, chapterNumber);
        return ResponseEntity.ok(chapter);
    }

    @PostMapping
    public ResponseEntity<ChapterDTO> addChapter(@RequestBody ChapterDTO chapterDTO) {
        ChapterDTO newChapter = chapterService.addChapter(chapterDTO);
        return ResponseEntity.ok(newChapter);
    }

//    @PutMapping("/{chapterId}")
//    public ChapterDTO updateChapter(@PathVariable Long chapterId, @RequestBody ChapterDTO chapterDTO) {
//        return chapterService.updateChapter(chapterId, chapterDTO);
//    }

    @DeleteMapping("/{chapterId}")
    public void deleteChapter(@PathVariable Long chapterId) {
        chapterService.deleteChapter(chapterId);
    }


    // Update Chapter
    @PutMapping("/stories/{storyId}/chapters/{chapterId}")
    public ResponseEntity<ChapterDTO> updateChapter(
            @PathVariable Long storyId,
            @PathVariable Long chapterId,
            @RequestBody ChapterDTO chapterDTO) {
        ChapterDTO updatedChapter = chapterService.updateChapter(storyId, chapterId, chapterDTO);
        return ResponseEntity.ok(updatedChapter);
    }
}
