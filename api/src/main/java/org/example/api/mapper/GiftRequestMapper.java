package org.example.api.mapper;


import lombok.AllArgsConstructor;
import org.example.api.dto.GiftRequestDTO;
import org.example.api.entity.GiftRequest;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class GiftRequestMapper {
    public static GiftRequestDTO toDTO(GiftRequest giftRequest) {
        if (giftRequest == null) {
            return null;
        }

        return new GiftRequestDTO(
                giftRequest.getRgId(),
                giftRequest.getUser() != null ? giftRequest.getUser().getId() : null,
                giftRequest.getUser() != null ? giftRequest.getUser().getFullName() : null,
                giftRequest.getAdmin() != null ? giftRequest.getAdmin().getId() : null,
                giftRequest.getAdmin() != null ? giftRequest.getAdmin().getFullName() : null,
                giftRequest.getCardValue(),
                giftRequest.getDiamondsUsed(),
                giftRequest.getRequestDate(),
                giftRequest.getStatus(),
                giftRequest.getAdminResponse(),
                giftRequest.getAdminResponseDate()
        );
    }
}
