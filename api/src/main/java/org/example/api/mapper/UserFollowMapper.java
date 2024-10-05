package org.example.api.mapper;

import org.example.api.dto.UserFollowDTO;
import org.example.api.entity.UserFollow;
import org.springframework.stereotype.Component;

@Component
public class UserFollowMapper {

    public UserFollowDTO toDTO(UserFollow userFollow) {
        if (userFollow == null) {
            return null;
        }

        return new UserFollowDTO(
                userFollow.getFollowId(),
                userFollow.getUser().getId(),
                userFollow.getStory().getId(),
                userFollow.getChapter() != null ? userFollow.getChapter().getChapterId() : null,
                userFollow.getChapter() != null ? userFollow.getChapter().getChapterNumber() : 0,
                userFollow.getStatusFollow(),
                userFollow.getFollowedAt()
        );
    }

    public UserFollow toEntity(UserFollowDTO userFollowDTO) {
        if (userFollowDTO == null) {
            return null;
        }

        UserFollow userFollow = new UserFollow();
        userFollow.setFollowId(userFollowDTO.getFollowId());
        // Set user, story, chapter entities based on IDs, this typically requires additional services or lookups
        userFollow.setStatusFollow(userFollowDTO.getStatusFollow());
        userFollow.setFollowedAt(userFollowDTO.getFollowedAt());
        return userFollow;
    }
}
