package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.UserLikeDTO;
import org.example.api.entity.Story;
import org.example.api.entity.User;
import org.example.api.entity.UserLike;
import org.example.api.mapper.UserLikeMapper;
import org.example.api.repository.StoryRepository;
import org.example.api.repository.UserLikeRepository;
import org.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserLikeService {

    private final UserLikeRepository userLikeRepository;

    private final UserRepository userRepository;

    private final StoryRepository storyRepository;

    private final UserLikeMapper userLikeMapper;

    // Kiểm tra xem đã thích chưa
    public UserLikeDTO checkIfLiked(Long userId, Long storyId) {
        Optional<UserLike> userLikeOptional = userLikeRepository.findByUserIdAndStoryId(userId, storyId);

        // Kiểm tra xem UserLike có tồn tại và trạng thái like có phải là 1 không
        if (userLikeOptional.isPresent() && userLikeOptional.get().getStatusLike() == 1) {
            return userLikeMapper.toDTO(userLikeOptional.get());
        }
        return null; // Trả về null nếu không có dữ liệu hoặc trạng thái không đúng
    }

    // Thích câu chuyện
    public UserLikeDTO likeStory(Long userId, Long storyId) {
        // Tìm user và story
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("Story not found"));

        // Tìm UserLike hiện tại
        Optional<UserLike> existingUserLikeOpt = userLikeRepository.findByUserIdAndStoryId(userId, storyId);
        UserLike userLike;

        if (existingUserLikeOpt.isPresent()) {
            // Nếu đã tồn tại, lấy đối tượng UserLike và cập nhật
            userLike = existingUserLikeOpt.get();
            userLike.setStatusLike(1); // Cập nhật trạng thái like
            userLike.setLikeAt(new Date());
        } else {
            // Nếu chưa tồn tại, tạo mới UserLike
            userLike = new UserLike();
            userLike.setUser(user);
            userLike.setStory(story);
            userLike.setStatusLike(1); // Trạng thái like
            userLike.setLikeAt(new Date());
        }
        // Lưu vào cơ sở dữ liệu
        UserLike savedUserLike = userLikeRepository.save(userLike);

        // Chuyển đổi thành DTO và trả về
        return userLikeMapper.toDTO(savedUserLike);
    }

    // Bỏ thích câu chuyện
    public void unlikeStory(Long userId, Long storyId) {
        UserLike userLike = userLikeRepository.findByUserIdAndStoryId(userId, storyId)
                .orElseThrow(() -> new RuntimeException("User like not found"));

        userLike.setStatusLike(2); // 0 có thể là trạng thái chưa like
        userLikeRepository.save(userLike);
    }


}
