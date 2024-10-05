package org.example.api.mapper;


import org.example.api.dto.HistoryGiftDTO;
import org.example.api.entity.HistoryGift;
import org.springframework.stereotype.Component;

@Component
public class HistoryGiftMapper {
    public static HistoryGiftDTO toDTO(HistoryGift historyGift) {
        if (historyGift == null) {
            return null;
        }

        return new HistoryGiftDTO(
                historyGift.getHgId(),
                historyGift.getUser() != null ? historyGift.getUser().getId() : null,
                historyGift.getUser() != null ? historyGift.getUser().getFullName() : null,
                historyGift.getStory() != null ? historyGift.getStory().getId() : null, // Lấy ID của Story
                historyGift.getStory() != null ? historyGift.getStory().getTitle() : null,
                historyGift.getAmount(),
                historyGift.getCreateAt()

        );
    }
}
