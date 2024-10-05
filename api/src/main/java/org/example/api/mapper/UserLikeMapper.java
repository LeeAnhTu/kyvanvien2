package org.example.api.mapper;

import org.example.api.dto.UserLikeDTO;
import org.example.api.entity.UserLike;
import org.springframework.stereotype.Component;


@Component
public class UserLikeMapper {
    // Chuyển đổi từ UserLike entity sang UserLikeDTO
    public UserLikeDTO toDTO(UserLike userLike) {
        if (userLike == null) {
            return null;
        }

        UserLikeDTO dto = new UserLikeDTO();
        dto.setLikeId(userLike.getLikeId());
        dto.setUserId(userLike.getUser() != null ? userLike.getUser().getId() : null);
        dto.setStoryId(userLike.getStory() != null ? userLike.getStory().getId() : null);
        dto.setStatusLike(userLike.getStatusLike());
        dto.setLikeAt(userLike.getLikeAt());
        return dto;
    }
}
