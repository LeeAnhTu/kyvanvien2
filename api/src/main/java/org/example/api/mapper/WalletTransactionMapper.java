package org.example.api.mapper;

import org.example.api.dto.WalletTransactionDTO;
import org.example.api.entity.Wallettransaction;
import org.springframework.stereotype.Component;

@Component
public class WalletTransactionMapper {

    public static WalletTransactionDTO toDTO( Wallettransaction wallettransaction) {
        if (wallettransaction == null) {
            return null;
        }

        return new WalletTransactionDTO(
                wallettransaction.getTransactionId(),
                wallettransaction.getWallet() != null ? wallettransaction.getWallet().getWalletId() : null, // Lấy ID của Story
                wallettransaction.getWallet() != null ? wallettransaction.getWallet().getUser().getFullName() : null,
                wallettransaction.getAmount(),
                wallettransaction.getCreatedAt()
        );
    }
}
