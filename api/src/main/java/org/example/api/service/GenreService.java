package org.example.api.service;

import lombok.AllArgsConstructor;
import org.example.api.entity.Genre;
import org.example.api.repository.GenreRepository;
import org.example.api.util.SlugGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GenreService {
    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public Genre saveGenre(Genre genre) {

        String slug1 = SlugGenerator.toSlug(genre.getGenreName());
        genre.setSlug(slug1);
        return genreRepository.save(genre);
    }
    public List<Genre> fetchAllGenre() {
        try {
            return genreRepository.findAll(Sort.by(Sort.Direction.ASC, "genreId"));
        } catch (Exception e) {
            // Xử lý lỗi hoặc ghi log
            throw new RuntimeException("Failed to fetch all genres: " + e.getMessage());
        }
    }

    public Genre getGenreById(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Genre not found with ID: " + id));
    }

//    public Genre saveGenre(Genre genre) {
//        System.out.println("Saving genre: " + genre);
//        return genreRepository.save(genre);
//    }

//    @Transactional(timeout = 10)
    public Optional<Genre> updateGenre(Long id, Genre updatedGenre) {
        return genreRepository.findById(id)
                .map(existingGenre -> {
                    existingGenre.setGenreName(updatedGenre.getGenreName());
                    String slug1 = SlugGenerator.toSlug(updatedGenre.getGenreName());
                    existingGenre.setSlug(slug1);
                    return genreRepository.save(existingGenre);
                });
    }
    public boolean deleteGenre(Long id) {
        try {
            genreRepository.deleteById(id);
            return true; // Deletion successful
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to delete Genre: " + e.getMessage());
        }
    }
}
