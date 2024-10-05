package org.example.api.controller;

import lombok.AllArgsConstructor;
import org.example.api.service.ViewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/views")
public class ViewController {
    private final ViewService viewService;

    @PostMapping("/add-view")
    public ResponseEntity<Void> addView(@RequestParam Long storyId) {
        viewService.addView(storyId);
        return ResponseEntity.ok().build();
    }
}
