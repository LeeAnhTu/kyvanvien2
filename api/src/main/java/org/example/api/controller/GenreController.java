package org.example.api.controller;

import lombok.AllArgsConstructor;
import org.example.api.entity.Genre;
import org.example.api.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/genre")
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @PostMapping("")
    public ResponseEntity<Genre> saveGenre(@RequestBody Genre genre) {
        Genre savedGenre = genreService.saveGenre(genre);
        return ResponseEntity.ok(savedGenre);
    }
    @GetMapping
    public ResponseEntity<List<Genre>> getAllGenres() {
        List<Genre> genres = genreService.fetchAllGenre();
        return ResponseEntity.ok(genres);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Genre> getGenreById(@PathVariable Long id) {
        Genre genre = genreService.getGenreById(id); // Lấy thể loại theo ID
        if (genre != null) {
            return ResponseEntity.ok(genre);
        } else {
            return ResponseEntity.notFound().build(); // Trả về lỗi 404 nếu không tìm thấy thể loại
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody Genre genre) {
        Optional<Genre> updatedGenreOptional = genreService.updateGenre(id, genre);
        return updatedGenreOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
//    @DeleteMapping(value = "/{id}")
//    public ResponseEntity<String> deleteGenre(@PathVariable Long id) {
//        boolean deletionStatus = genreService.deleteGenre(id);
//        if (deletionStatus) {
//            return ResponseEntity.ok("Genre with ID " + id + " has been deleted successfully");
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete Genre with ID " + id);
//        }
//    }
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteGenre(@PathVariable Long id) {
        boolean deletionStatus = genreService.deleteGenre(id);
        if (deletionStatus) {
            return ResponseEntity.ok("Genre with ID " + id + " has been deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete Genre with ID " + id);
        }
    }
}
