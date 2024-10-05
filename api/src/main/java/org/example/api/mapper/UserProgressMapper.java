package org.example.api.mapper;

import org.example.api.dto.UserProgressDTO;
import org.example.api.entity.UserProgress;

public class UserProgressMapper {

    public static UserProgressDTO toDTO(UserProgress userProgress) {
        UserProgressDTO dto = new UserProgressDTO();
        dto.setProgressId(userProgress.getProgressId());
        dto.setUserId(userProgress.getUser().getId());
        dto.setStoryId(userProgress.getStory().getId());
        dto.setStoryTitle(userProgress.getStory().getTitle());
        dto.setChapterId(userProgress.getChapter().getChapterId());
        dto.setChapterNumber(userProgress.getChapter().getChapterNumber());
        dto.setStatusProgress(userProgress.getStatusProgress());
        dto.setLastRead(userProgress.getLastRead());
        return dto;
    }
}
