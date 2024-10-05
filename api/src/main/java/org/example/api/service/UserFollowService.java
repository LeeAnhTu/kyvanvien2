package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.UserFollowDTO;
import org.example.api.entity.Chapter;
import org.example.api.entity.Story;
import org.example.api.entity.User;
import org.example.api.entity.UserFollow;
import org.example.api.mapper.UserFollowMapper;
import org.example.api.repository.ChapterRepository;
import org.example.api.repository.StoryRepository;
import org.example.api.repository.UserFollowRepository;
import org.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserFollowService {

    private final UserFollowRepository userFollowRepository;

    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final ChapterRepository chapterRepository;

    private final UserFollowMapper userFollowMapper;


    // Lấy danh sách các bản ghi theo dõi của người dùng
    public List<UserFollowDTO> getActiveUserFollows(Long userId) {
        // Lấy tất cả các bản ghi theo dõi của người dùng
        List<UserFollow> allFollows = userFollowRepository.findByUserId(userId);

        // Lọc danh sách theo statusFollow = 1 và chuyển đổi sang DTO
        return allFollows.stream()
                .filter(follow -> follow.getStatusFollow() == 1)
                .sorted(Comparator.comparing(UserFollow::getFollowedAt).reversed())
                .map(userFollowMapper::toDTO)
                .collect(Collectors.toList());
    }

    //Lấy 1 ban ghi
    public UserFollowDTO getUserFollow(Long userId, Long storyId, Long chapterId) {
        Optional<UserFollow> userFollow;

        if (chapterId != null) {
            userFollow = userFollowRepository.findByUserIdAndStoryIdAndChapter_ChapterId(userId, storyId, chapterId)
                    .filter(follow -> follow.getStatusFollow() == 1);
        } else {
            userFollow = userFollowRepository.findByUserIdAndStoryId(userId, storyId)
                    .filter(follow -> follow.getStatusFollow() == 1);
        }

        return userFollow.map(userFollowMapper::toDTO).orElse(null);
    }


    // tạo follow với userId và storyId
    public UserFollowDTO followStory(Long userId, Long storyId, Long chapterId) {
        // Tìm bản ghi theo userId và storyId
        Optional<UserFollow> existingFollowOpt = userFollowRepository.findByUserIdAndStoryId(userId, storyId);

        UserFollow userFollow;

        if (existingFollowOpt.isPresent()) {
            // Cập nhật bản ghi đã tồn tại
            userFollow = existingFollowOpt.get();
            if (chapterId != null && !chapterId.equals(userFollow.getChapter() != null ? userFollow.getChapter().getChapterId() : null)) {
                userFollow.setChapter(chapterRepository.findById(chapterId).orElse(null));
            }
            // Cập nhật trạng thái theo dõi thành 1 (theo dõi)
            userFollow.setStatusFollow(1);
            userFollow.setFollowedAt(new Date());
        } else {
            // Tạo mới bản ghi theo dõi
            userFollow = new UserFollow();
            userFollow.setUser(userRepository.findById(userId).orElse(null));
            userFollow.setStory(storyRepository.findById(storyId).orElse(null));
            userFollow.setChapter(chapterId != null ? chapterRepository.findById(chapterId).orElse(null) : null);
            userFollow.setStatusFollow(1); // Set statusFollow thành 1 để theo dõi
            userFollow.setFollowedAt(new Date());
        }

        UserFollow savedUserFollow = userFollowRepository.save(userFollow);

        // Trả về UserFollowDTO chỉ với các trường cần thiết
        return userFollowMapper.toDTO(savedUserFollow);
    }

    //unfollow với userId, storyId
    public void unfollowStory(Long userId, Long storyId, Long chapterId) {
        // Tìm bản ghi theo userId và storyId
        Optional<UserFollow> existingFollowOpt = userFollowRepository.findByUserIdAndStoryId(userId, storyId);

        if (existingFollowOpt.isPresent()) {
            UserFollow userFollow = existingFollowOpt.get();

            // Kiểm tra nếu chapterId được cung cấp
            if (chapterId != null) {
                // Kiểm tra chapterId có khớp với bản ghi không
                if (userFollow.getChapter() == null || !chapterId.equals(userFollow.getChapter().getChapterId())) {
                    return; // Nếu không khớp với chapterId, không làm gì cả
                }
            }

            // Cập nhật trạng thái thành 2 (unfollow)
            userFollow.setStatusFollow(2); // Set statusFollow thành 2 để hủy theo dõi
//            userFollow.setFollowedAt(new Date());
            userFollowRepository.save(userFollow);
        }
    }
}
