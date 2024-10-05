package org.example.api.repository;

import org.example.api.entity.Story;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    @Query("SELECT s FROM Story s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :searchText, '%')) OR LOWER(s.author) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Story> searchByTitleOrAuthor(@Param("searchText") String searchText);

    @Query("SELECT s FROM Story s WHERE s.checkStory = 1 " +
            "AND (:typeId IS NULL OR s.type.typeId = :typeId) " +
            "AND (:genreId IS NULL OR s.genre.genreId = :genreId) " +
            "AND (:statusId IS NULL OR s.status.statusId = :statusId)")
    List<Story> findByTypeGenreStatus(
            @Param("typeId") Long typeId,
            @Param("genreId") Long genreId,
            @Param("statusId") Long statusId);

    @Query("SELECT s FROM Story s WHERE s.checkStory = 1")
    List<Story> findAllWithCheckStory();

    @Query("SELECT s FROM Story s WHERE s.checkStory = :checkStory ORDER BY s.createdAt DESC")
    List<Story> findAllWithCheckStory2(@Param("checkStory") Long checkStory);




    Optional<Story> findBySlug(String slug);

    List<Story> findByUserId(Long userId);

    Long countByCheckStory(Long checkStory);

}
