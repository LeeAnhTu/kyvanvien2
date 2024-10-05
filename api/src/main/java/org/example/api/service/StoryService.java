package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.ChapterDTO;
import org.example.api.dto.StoryDTO;
import org.example.api.entity.*;
import org.example.api.mapper.ChapterMapper;
import org.example.api.mapper.StoryMapper;
import org.example.api.repository.*;
import org.example.api.util.SlugGenerator;
import org.example.api.util.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;

    private final UserRepository userRepository;

    private final GenreRepository genreRepository;

    private final StatusstoryRepository statusstoryRepository;

    private final TypeRepository typeRepository;

    private final ChapterRepository chapterRepository;

    private final RatingRepository ratingRepository;

    private final ViewRepository viewRepository;
    private final UserLikeRepository userLikeRepository;
    private final UserFollowRepository userFollowRepository;

    private List<StoryDTO> getStoryDTOS(List<Story> stories) {
        return stories.stream()
                .map(story -> {
                    // Count number of chapters for each story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;

                    // Map Story entity to StoryDTO and set additional fields
                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .filter(story -> story.getCheckStory() == 1)
                .collect(Collectors.toList());
    }

    public List<StoryDTO> fetchAllStories() {
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by(Sort.Direction.DESC, "id"));

        // Lấy tất cả các stories
        List<Story> stories = storyRepository.findAll(pageable).getContent();


        return getStoryDTOS(stories);
    }

    public List<StoryDTO> fetchAllStoriesByCheck() {
        List<Story> stories = storyRepository.findAllWithCheckStory2(2L);

        return stories.stream()
                .map(story -> {
                    // Count number of chapters for each story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;

                    // Map Story entity to StoryDTO and set additional fields
                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }


    public List<StoryDTO> fetchStoriesByUserId(Long userId) {
        // Fetch stories by userId without sorting
        List<Story> stories = storyRepository.findByUserId(userId);

        // Sort stories by createAt in descending order
        List<Story> sortedStories = stories.stream()
                .sorted(Comparator.comparing(Story::getCreatedAt).reversed())
                .toList();

        return getStoryDTOS(sortedStories);
    }

    public List<StoryDTO> fetchStoriesAwaitingApprovalByUserId(Long userId) {
        // Fetch stories by userId without sorting
        List<Story> stories = storyRepository.findByUserId(userId);

        // Sort stories by createAt in descending order
        List<Story> sortedStories = stories.stream()
                .sorted(Comparator.comparing(Story::getCreatedAt).reversed())
                .toList();

        return sortedStories.stream()
                .map(story -> {
                    // Count number of chapters for each story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;

                    // Map Story entity to StoryDTO and set additional fields
                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .filter(story -> story.getCheckStory() == 2)
                .collect(Collectors.toList());
    }

    public List<StoryDTO> fetchStoriesNotApprovalByUserId(Long userId) {
        // Fetch stories by userId without sorting
        List<Story> stories = storyRepository.findByUserId(userId);

        // Sort stories by createAt in descending order
        List<Story> sortedStories = stories.stream()
                .sorted(Comparator.comparing(Story::getCreatedAt).reversed())
                .toList();

        return sortedStories.stream()
                .map(story -> {
                    // Count number of chapters for each story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;

                    // Map Story entity to StoryDTO and set additional fields
                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .filter(story -> story.getCheckStory() == 3)
                .collect(Collectors.toList());
    }

    public Long countAllStories() {
        try {
            return storyRepository.countByCheckStory(1L); // Đếm số lượng truyện với checkStory = 1
        } catch (Exception e) {
            throw new RuntimeException("Failed to count stories: " + e.getMessage());
        }
    }


    public StoryDTO getStoryById(Long id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with ID: " + id));

        // Đếm số lượng chương liên quan đến story này
        Long chapterCount = chapterRepository.countByStoryId(id);

        Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
        Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
        Long viewCount = viewRepository.countByStoryId(story.getId());

        averageRating = (averageRating != null) ? averageRating : 0.0;
        Long likeCount = userLikeRepository.countByStoryId(story.getId());

        // Map Story thành StoryDTO và set số lượng chương
        StoryDTO storyDTO = StoryMapper.toDTO(story);
        storyDTO.setChapterCount(chapterCount);  // Giả sử bạn đã thêm trường chapterCount vào StoryDTO
        storyDTO.setLikeCount(likeCount);
        storyDTO.setRatingCount(ratingCount);
        storyDTO.setAverageRating(averageRating);
        storyDTO.setViewCount(viewCount);

        return storyDTO;
    }

    public StoryDTO createStory(StoryDTO storyDTO) {
        // Tìm các thực thể liên quan dựa trên ID
        User user = userRepository.findById(storyDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + storyDTO.getUserId()));

        Genre genre = genreRepository.findById(storyDTO.getGenreId())
                .orElseThrow(() -> new RuntimeException("Genre not found with ID: " + storyDTO.getGenreId()));

        Statusstory statusstory = statusstoryRepository.findById(storyDTO.getStatusId())
                .orElseThrow(() -> new RuntimeException("Status not found with ID: " + storyDTO.getStatusId()));

        Type type = typeRepository.findById(storyDTO.getTypeId())
                .orElseThrow(() -> new RuntimeException("Type not found with ID: " + storyDTO.getTypeId()));

        // Chuyển đổi StoryDTO thành Story entity
        Story story = StoryMapper.toEntity(storyDTO);
        String slug = SlugGenerator.toSlug(story.getTitle());
        story.setSlug(slug);
        // Thiết lập các mối quan hệ
        story.setUser(user);
        story.setGenre(genre);
        story.setStatus(statusstory);
        story.setType(type);

        // Lưu Story vào cơ sở dữ liệu
        story = storyRepository.save(story);

        // Chuyển đổi Story entity thành StoryDTO và trả về
        return StoryMapper.toDTO(story);
    }

    public StoryDTO updateStory(Long id, StoryDTO storyDTO) {
        Story existingStory = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with ID: " + id));

        existingStory.setStoryImg(storyDTO.getStoryImg());
        existingStory.setTitle(storyDTO.getTitle());
        existingStory.setDescription(storyDTO.getDescription());
        existingStory.setAuthor(storyDTO.getAuthor());
        // Cập nhật các thuộc tính khác nếu cần
        if (storyDTO.getUserId() != null) {
            User user = userRepository.findById(storyDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + storyDTO.getUserId()));
            existingStory.setUser(user);
        }

        if (storyDTO.getGenreId() != null) {
            Genre genre = genreRepository.findById(storyDTO.getGenreId())
                    .orElseThrow(() -> new RuntimeException("Genre not found with ID: " + storyDTO.getGenreId()));
            existingStory.setGenre(genre);
        }

        if (storyDTO.getStatusId() != null) {
            Statusstory statusstory = statusstoryRepository.findById(storyDTO.getStatusId())
                    .orElseThrow(() -> new RuntimeException("Status not found with ID: " + storyDTO.getStatusId()));
            existingStory.setStatus(statusstory);
        }

        if (storyDTO.getTypeId() != null) {
            Type type = typeRepository.findById(storyDTO.getTypeId())
                    .orElseThrow(() -> new RuntimeException("Type not found with ID: " + storyDTO.getTypeId()));
            existingStory.setType(type);
        }

//        String slug = SlugGenerator.toSlug(storyDTO.getTitle());
//        existingStory.setSlug(slug);

        existingStory.setSlug(storyDTO.getSlug());

        // Cập nhật các thuộc tính thời gian nếu cần
        existingStory.setUpdatedAt(new Date());

        // Lưu đối tượng Story đã được cập nhật vào cơ sở dữ liệu
        Story updatedStory = storyRepository.save(existingStory);

        // Chuyển đổi đối tượng Story thành StoryDTO và trả về
        return StoryMapper.toDTO(updatedStory);
    }

    public void deleteStory(Long id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with ID: " + id));
        storyRepository.delete(story);
    }

    public List<StoryDTO> searchStories(String query) {
    // Chuẩn hóa chuỗi tìm kiếm: loại bỏ dấu và chuyển sang chữ thường
    String normalizedQuery = StringUtils.removeDiacritics(query).toLowerCase();

    // Lấy tất cả các story và lọc theo tiêu chí tìm kiếm đã chuẩn hóa
    List<Story> stories = storyRepository.findAllWithCheckStory().stream()
            .filter(story -> {
                String normalizedTitle = StringUtils.removeDiacritics(story.getTitle()).toLowerCase();
                String normalizedAuthor = StringUtils.removeDiacritics(story.getAuthor()).toLowerCase();
                return normalizedTitle.contains(normalizedQuery) || normalizedAuthor.contains(normalizedQuery);
            })
            .toList();

    // Chuyển đổi danh sách Story entities thành StoryDTOs với chapterCount
        //                Long chapterCount = chapterRepository.countByStoryId(story.getId()); // Đếm số chương
        // Sử dụng phương thức static với chapterCount
        return stories.stream()
                .map(story -> {
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());

                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
}


    public List<StoryDTO> filterStories(Long typeId, Long genreId, Long statusId, String sortBy) {
        List<Story> stories = storyRepository.findByTypeGenreStatus(typeId, genreId, statusId);

        // Lấy chapter mới nhất cho từng truyện
        Map<Long, Chapter> latestChapterMap = new HashMap<>();
        for (Story story : stories) {
            Chapter latestChapter = chapterRepository.findTopByStoryIdOrderByCreatedAtDesc(story.getId());
            latestChapterMap.put(story.getId(), latestChapter);
        }

        // Lấy số lượt xem cho mỗi câu chuyện
        Map<Long, Long> viewCounts = stories.stream()
                .collect(Collectors.toMap(
                        Story::getId,
                        story -> viewRepository.countByStoryId(story.getId())
                ));

        // Sắp xếp danh sách câu chuyện theo tiêu chí
        if ("viewCount".equals(sortBy)) {
            stories.sort((s1, s2) -> Long.compare(viewCounts.get(s2.getId()), viewCounts.get(s1.getId())));
        } else if ("createdAt".equals(sortBy)) {
            stories.sort((s1, s2) -> s2.getCreatedAt().compareTo(s1.getCreatedAt()));
        } else if ("lastChapter".equals(sortBy)) {
            stories.sort((s1, s2) -> {
                try {
                    Chapter c1 = latestChapterMap.get(s1.getId());
                    Chapter c2 = latestChapterMap.get(s2.getId());

                    // Kiểm tra nếu chapter là null
                    if (c1 == null && c2 == null) return 0;
                    if (c1 == null) return 1; // Nếu c1 không có chapter mới nhất, sắp sau c2
                    if (c2 == null) return -1; // Nếu c2 không có chapter mới nhất, sắp sau c1

                    // Kiểm tra nếu createdAt là null
                    Date c1CreatedAt = c1.getCreatedAt();
                    Date c2CreatedAt = c2.getCreatedAt();
                    if (c1CreatedAt == null && c2CreatedAt == null) return 0;
                    if (c1CreatedAt == null) return 1; // Nếu c1 không có createdAt, sắp sau c2
                    if (c2CreatedAt == null) return -1; // Nếu c2 không có createdAt, sắp sau c1

                    return c2CreatedAt.compareTo(c1CreatedAt);
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            });
        }
        else {
            // Sắp xếp theo createdAt (hoặc giá trị mặc định)
            stories.sort((s1, s2) -> s2.getCreatedAt().compareTo(s1.getCreatedAt()));
        }

        // Chuyển đổi danh sách câu chuyện thành danh sách StoryDTO
        return stories.stream()
                .map(story -> {
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());

                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }


    public List<StoryDTO> filterStories1(Long typeId, Long genreId, Long statusId) {
        // Lấy danh sách truyện từ repository
        List<Story> stories = storyRepository.findByTypeGenreStatus(typeId, genreId, statusId);


        return stories.stream()
                .map(story -> {
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());

                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }

    public List<StoryDTO> getNewChapterStories() {
        // Lấy tất cả các câu chuyện từ repository
        List<Story> stories = storyRepository.findAllWithCheckStory();

        // Lấy chapter mới nhất cho từng truyện
        Map<Long, Chapter> latestChapterMap = new HashMap<>();
        for (Story story : stories) {
            Chapter latestChapter = chapterRepository.findTopByStoryIdOrderByCreatedAtDesc(story.getId());
            latestChapterMap.put(story.getId(), latestChapter);
        }

        // Sắp xếp các câu chuyện theo thứ tự chương mới nhất
        stories.sort((s1, s2) -> {
            try {
                Chapter c1 = latestChapterMap.get(s1.getId());
                Chapter c2 = latestChapterMap.get(s2.getId());

                // Kiểm tra nếu chapter là null
                if (c1 == null && c2 == null) return 0;
                if (c1 == null) return 1; // Nếu c1 không có chapter mới nhất, sắp sau c2
                if (c2 == null) return -1; // Nếu c2 không có chapter mới nhất, sắp sau c1

                // Kiểm tra nếu createdAt là null
                Date c1CreatedAt = c1.getCreatedAt();
                Date c2CreatedAt = c2.getCreatedAt();
                if (c1CreatedAt == null && c2CreatedAt == null) return 0;
                if (c1CreatedAt == null) return 1; // Nếu c1 không có createdAt, sắp sau c2
                if (c2CreatedAt == null) return -1; // Nếu c2 không có createdAt, sắp sau c1

                return c2CreatedAt.compareTo(c1CreatedAt);
            } catch (Exception e) {
                // Log lỗi và xử lý ngoại lệ nếu cần
                e.printStackTrace();
                return 0; // Trả về giá trị mặc định nếu xảy ra lỗi
            }
        });

        // Chuyển đổi các Story sang StoryDTO và trả về danh sách
        return stories.stream()
                .map(story -> {
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());

                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }

    public List<StoryDTO> getStoriesCompleted() {
        List<Story> allStories = storyRepository.findAllWithCheckStory();

        // Lọc danh sách câu chuyện có statusId = 3
        List<Story> completedStories = allStories.stream()
                .filter(story -> story.getStatus().getStatusId() == 3)
                .sorted(Comparator.comparing(Story::getUpdatedAt).reversed()) // Sắp xếp theo updatedAt (mới nhất trước)
                .toList();

        return completedStories.stream()
                .map(story -> {
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());

                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }

    public List<StoryDTO> getStoriesByViewCount() {
        // Fetch all stories
        List<Story> stories = storyRepository.findAllWithCheckStory();

        // Calculate view counts for all stories
        Map<Long, Long> viewCounts = stories.stream()
                .collect(Collectors.toMap(
                        Story::getId,
                        story -> viewRepository.countByStoryId(story.getId())
                ));

        // Map to StoryDTO and sort by viewCount in descending order
        return stories.stream()
                .map(story -> {
                    // Retrieve and calculate all necessary data for each story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewCounts.get(story.getId()); // Use precomputed view count
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;

                    // Map Story entity to StoryDTO and set additional fields
                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .sorted(Comparator.comparing(StoryDTO::getViewCount).reversed()) // Sort by viewCount in descending order
                .collect(Collectors.toList());
    }


    public List<StoryDTO> getStoriesByAverageRating() {
        // Fetch all stories
        List<Story> stories = storyRepository.findAllWithCheckStory();

        // Map to StoryDTO and sort by averageRating in descending order
        return stories.stream()
                .map(story -> {
                    // Retrieve and calculate all necessary data for each story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId()); // Use precomputed view count
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;


                    // Map Story entity to StoryDTO and set additional fields
                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .sorted(Comparator.comparing(StoryDTO::getAverageRating).reversed()) // Sort by averageRating in descending order
                .collect(Collectors.toList());
    }

    public List<StoryDTO> getStoriesByFollowCount() {
        // Fetch all stories
        List<Story> stories = storyRepository.findAllWithCheckStory();

        // Map to StoryDTO, calculate follow count, and sort by followCount in descending order
        return stories.stream()
                .sorted((story1, story2) -> {
                    // Calculate follow count for each story
                    Long followCount1 = userFollowRepository.countByStoryId(story1.getId());
                    Long followCount2 = userFollowRepository.countByStoryId(story2.getId());

                    // Sort by followCount in descending order
                    return followCount2.compareTo(followCount1); // Sorting in reverse order
                })
                .map(story -> {
                    // Retrieve and calculate all necessary data for each story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;

                    // Map Story entity to StoryDTO
                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }


    public List<ChapterDTO> getChaptersByStoryId(Long storyId) {
        List<Chapter> chapters = chapterRepository.findByStoryId(storyId);
        return chapters.stream()
                .map(ChapterMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StoryDTO getStoryBySlug(String slug) {
        Story story = storyRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Story not found with slug: " + slug));

        Long chapterCount = chapterRepository.countByStoryId(story.getId()); // Đếm số chương
        Long viewCount = viewRepository.countByStoryId(story.getId());
        Long likeCount = userLikeRepository.countByStoryId(story.getId());
        Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
        Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
        averageRating = (averageRating != null) ? averageRating : 0.0;

        StoryDTO storyDTO = StoryMapper.toDTO(story);
        storyDTO.setChapterCount(chapterCount);
        storyDTO.setRatingCount(ratingCount);
        storyDTO.setAverageRating(averageRating);
        storyDTO.setViewCount(viewCount);
        storyDTO.setLikeCount(likeCount);

        return storyDTO; // Truyền thêm chapterCount vào phương thức toDTO
    }

    public StoryDTO approveStory(Long id, Long isApproved) {
        Story existingStory = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with ID: " + id));

        // Cập nhật giá trị checkStory
        existingStory.setCheckStory(isApproved); // 1 hoặc 2

        // Cập nhật thời gian
        existingStory.setUpdatedAt(new Date());
        existingStory.setCreatedAt(new Date());

        // Lưu đối tượng Story đã được cập nhật vào cơ sở dữ liệu
        Story updatedStory = storyRepository.save(existingStory);

        // Chuyển đổi đối tượng Story thành StoryDTO và trả về
        return StoryMapper.toDTO(updatedStory);
    }


}
