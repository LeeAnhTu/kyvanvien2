package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.entity.Story;
import org.example.api.entity.View;
import org.example.api.repository.StoryRepository;
import org.example.api.repository.ViewRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class ViewService {

    private final ViewRepository viewRepository;

    private final StoryRepository storyRepository;

    public void addView(Long storyId) {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("Story not found"));

        View view = new View();
        view.setStory(story);
        view.setCreatedAt(new Date());

        viewRepository.save(view);
    }
}
