package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.UserProgressDTO;
import org.example.api.entity.Chapter;
import org.example.api.entity.Story;
import org.example.api.entity.User;
import org.example.api.entity.UserProgress;
import org.example.api.mapper.UserProgressMapper;
import org.example.api.repository.ChapterRepository;
import org.example.api.repository.StoryRepository;
import org.example.api.repository.UserProgressRepository;
import org.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserProgressService {
    private final UserProgressRepository userProgressRepository;
    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final ChapterRepository chapterRepository;


    //Lấy danh sách lịch sử đọc của người dùng
    public List<UserProgressDTO> getUserProgressByUserId(Long userId) {
        List<UserProgress> userProgressList = userProgressRepository.findByUserId(userId);
        return userProgressList.stream()
                .filter(up -> up.getStatusProgress() == 1)  // Lọc theo điều kiện statusProgress = 1
                .sorted(Comparator.comparing(UserProgress::getLastRead).reversed())  // Sắp xếp theo lastRead mới nhất
                .map(UserProgressMapper::toDTO)
                .collect(Collectors.toList());
    }

    //Lấy ra 1 lịch sử đọc
    public UserProgressDTO getUserProgressByStory(Long userId, Long storyId) {
        UserProgress userProgress = userProgressRepository.findByUserIdAndStoryId(userId, storyId).orElse(null);

        // Kiểm tra nếu statusProgress == 1
        if (userProgress != null && userProgress.getStatusProgress() == 1) {
            return UserProgressMapper.toDTO(userProgress);
        } else {
            return null;
        }
    }

    //Bằng storyId và ChapterId
    public UserProgress saveOrUpdateUserProgress(Long userId, Long storyId, Long chapterId) {
        // Tìm tiến trình đọc hiện tại của người dùng với truyện và chương cụ thể
        Optional<UserProgress> existingProgressOpt = userProgressRepository.findByUserIdAndStoryId(userId, storyId);

        if (existingProgressOpt.isPresent()) {
            UserProgress existingProgress = existingProgressOpt.get();
            existingProgress.setChapter(chapterRepository.findById(chapterId).orElse(null));
            existingProgress.setStatusProgress(1);
            existingProgress.setLastRead(new Date());
            return userProgressRepository.save(existingProgress);
        } else {
            // Tạo tiến trình đọc mới
            UserProgress newProgress = new UserProgress();
            newProgress.setUser(userRepository.findById(userId).orElse(null));
            newProgress.setStory(storyRepository.findById(storyId).orElse(null));
            newProgress.setChapter(chapterRepository.findById(chapterId).orElse(null));
            newProgress.setStatusProgress(1);
            newProgress.setLastRead(new Date());
            return userProgressRepository.save(newProgress);
        }
    }

    // Bằng slug và chapterNumber
    public UserProgress saveOrUpdateUserProgress(Long userId, String slug, int chapterNumber) {
        // Tìm Story dựa trên slug
        Story story = storyRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Story not found with slug: " + slug));

        // Tìm Chapter dựa trên chapterNumber
        Chapter chapter = chapterRepository.findByChapterNumberAndStoryId(chapterNumber, story.getId())
                .orElseThrow(() -> new RuntimeException("Chapter not found with number: " + chapterNumber + " and storyId: " + story.getId()));

        // Tìm User dựa trên userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Tìm tiến trình đọc hiện tại của người dùng với truyện và chương cụ thể
        Optional<UserProgress> existingProgressOpt = userProgressRepository.findByUserIdAndStoryId(user.getId(), story.getId());

        if (existingProgressOpt.isPresent()) {
            UserProgress existingProgress = existingProgressOpt.get();
            existingProgress.setChapter(chapter);
            existingProgress.setStatusProgress(1);
            existingProgress.setLastRead(new Date());
            return userProgressRepository.save(existingProgress);
        } else {
            // Tạo tiến trình đọc mới
            UserProgress newProgress = new UserProgress();
            newProgress.setUser(user);
            newProgress.setStory(story);
            newProgress.setChapter(chapter);
            newProgress.setStatusProgress(1);
            newProgress.setLastRead(new Date());
            return userProgressRepository.save(newProgress);
        }
    }


    // Xóa bằng storyId và chapterId
    public UserProgress updateUserProgressStatusToDeleted(Long userId, Long storyId, Long chapterId) {
        // Tìm tiến trình đọc hiện tại của người dùng với truyện và chương cụ thể
        Optional<UserProgress> existingProgressOpt = userProgressRepository.findAll().stream()
                .filter(up -> up.getUser().getId().equals(userId) &&
                        up.getStory().getId().equals(storyId) &&
                        up.getChapter().getChapterId().equals(chapterId))
                .findFirst();

        if (existingProgressOpt.isPresent()) {
            UserProgress existingProgress = existingProgressOpt.get();
            // Cập nhật trạng thái đọc thành 2 (xóa)
            existingProgress.setStatusProgress(2);
            existingProgress.setLastRead(new Date()); // Cập nhật ngày đọc mới (tuỳ chọn)
            return userProgressRepository.save(existingProgress);
        } else {
            // Trả về null hoặc xử lý khi không tìm thấy tiến trình đọc
            return null; // Hoặc ném một ngoại lệ tùy thuộc vào yêu cầu
        }
    }


    // Xóa bằng slug và chapterNumber
    public UserProgress updateUserProgressStatusToDeleted(Long userId, String slug, int chapterNumber) {
        // Tìm Story dựa trên slug
        Story story = storyRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Story not found with slug: " + slug));

        // Tìm Chapter dựa trên chapterNumber
        Chapter chapter = chapterRepository.findByChapterNumberAndStoryId(chapterNumber, story.getId())
                .orElseThrow(() -> new RuntimeException("Chapter not found with number: " + chapterNumber + " and storyId: " + story.getId()));

        // Tìm User dựa trên userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Tìm tiến trình đọc hiện tại của người dùng với truyện và chương cụ thể
        Optional<UserProgress> existingProgressOpt = userProgressRepository.findByUserIdAndStoryIdAndChapter_ChapterId(user.getId(), story.getId(), chapter.getChapterId());

        if (existingProgressOpt.isPresent()) {
            UserProgress existingProgress = existingProgressOpt.get();
            // Cập nhật trạng thái đọc thành 2 (xóa)
            existingProgress.setStatusProgress(2);
//            existingProgress.setLastRead(new Date()); // Cập nhật ngày đọc mới (tuỳ chọn)
            return userProgressRepository.save(existingProgress);
        } else {
            // Trả về null hoặc xử lý khi không tìm thấy tiến trình đọc
            return null; // Hoặc ném một ngoại lệ tùy thuộc vào yêu cầu
        }
    }

}
