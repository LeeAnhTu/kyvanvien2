package org.example.api.service;

import lombok.AllArgsConstructor;
import org.example.api.entity.Statusstory;
import org.example.api.repository.StatusstoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StatusStoryService {
    private final StatusstoryRepository statusstoryRepository;

    public List<Statusstory> getAllStatusstory() {
        return statusstoryRepository.findAll();
    }
    public Optional<Statusstory> getStatusstoryById(Long id) {
        try {
            return statusstoryRepository.findById(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to fetch Status by ID: " + e.getMessage());
        }
    }
    public Statusstory saveStatusstory(Statusstory statusstory) {
        try {
            return statusstoryRepository.save(statusstory);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to save Status: " + e.getMessage());
        }
    }

    public Optional<Statusstory> updateStatusstory(Long id , Statusstory statusstory) {
        try {
            Optional<Statusstory> existingStatusstory = statusstoryRepository.findById(id);
            if (existingStatusstory.isPresent() ) {
                Statusstory updatedStatusstory = existingStatusstory.get();
                updatedStatusstory.setStatusName(statusstory.getStatusName());
                Statusstory savedStatusstory = statusstoryRepository.save(updatedStatusstory);
                return Optional.of(savedStatusstory);
            }else {
                return Optional.empty();
            }
        }catch (Exception e){
            throw new RuntimeException("Failed to update Status: " + e.getMessage());
        }
    }


    public boolean deleteStatusstory(Long id) {
        try {
            statusstoryRepository.deleteById(id);
            return true; // Deletion successful
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to delete Status: " + e.getMessage());
        }
    }
}
