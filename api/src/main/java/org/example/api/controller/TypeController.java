package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.entity.Genre;
import org.example.api.entity.Type;
import org.example.api.service.TypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/types")
public class TypeController {
    private final TypeService typeService;

    @GetMapping
    public ResponseEntity<List<Type>> getAllTypes() {
        List<Type> types = typeService.getAllTypes();
        return ResponseEntity.ok(types);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Type>> getTypeById(@PathVariable Long id) {
        Optional<Type> type = typeService.getTypeById(id);
        if (type == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(type);
    }

    @PostMapping("/")
    public ResponseEntity<Type> saveGenre(@RequestBody Type type) {
        Type saveType = typeService.saveType(type);
        return ResponseEntity.ok(saveType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Type> updateGenre(@PathVariable long id, @RequestBody Type type) {
        Optional<Type> updatedTypeOptional = typeService.updateType(id, type);
        return updatedTypeOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteGenre(@PathVariable Long id) {
        boolean deletionStatus = typeService.deleteType(id);
        if (deletionStatus) {
            return ResponseEntity.ok("Type with ID " + id + " has been deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete Type with ID " + id);
        }
    }

}
