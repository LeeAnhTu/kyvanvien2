package org.example.api.service;

import lombok.AllArgsConstructor;
import org.example.api.entity.Type;
import org.example.api.repository.TypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class TypeService {
    private final TypeRepository typeRepository;

    public List<Type> getAllTypes() {
        return typeRepository.findAll();
    }
    public Optional<Type> getTypeById(Long id) {
        try {
            return typeRepository.findById(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to fetch Type by ID: " + e.getMessage());
        }
    }
    public Type saveType(Type type) {
        try {
            return typeRepository.save(type);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to save Type: " + e.getMessage());
        }
    }

    public Optional<Type> updateType(Long id , Type type) {
        try {
            Optional<Type> existingType = typeRepository.findById(id);
            if (existingType.isPresent() ) {
                Type updatedType = existingType.get();
                updatedType.setTypeName(type.getTypeName());
                Type savedType = typeRepository.save(updatedType);
                return Optional.of(savedType);
            }else {
                return Optional.empty();
            }
        }catch (Exception e){
            throw new RuntimeException("Failed to update Type: " + e.getMessage());
        }
    }


    public boolean deleteType(Long id) {
        try {
            typeRepository.deleteById(id);
            return true; // Deletion successful
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to delete Type: " + e.getMessage());
        }
    }
}
