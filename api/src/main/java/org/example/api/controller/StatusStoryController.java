package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.entity.Statusstory;
import org.example.api.service.StatusStoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/statusstory")
public class StatusStoryController {
    private final StatusStoryService statusStoryService;

    @GetMapping
    public ResponseEntity<List<Statusstory>> getAllStatusstory() {
        List<Statusstory> genres = statusStoryService.getAllStatusstory();
        return ResponseEntity.ok(genres);
    }
    @PostMapping("/")
    public ResponseEntity<Statusstory> saveStatusstory(@RequestBody Statusstory statusstory) {
        Statusstory savedStatusstory = statusStoryService.saveStatusstory(statusstory);
        return ResponseEntity.ok(savedStatusstory);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteGenre(@PathVariable Long id) {
        boolean deletionStatus = statusStoryService.deleteStatusstory(id);
        if (deletionStatus) {
            return ResponseEntity.ok("Genre with ID " + id + " has been deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete Genre with ID " + id);
        }
    }

}
