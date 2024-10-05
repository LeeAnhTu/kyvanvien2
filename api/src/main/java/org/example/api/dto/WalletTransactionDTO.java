package org.example.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletTransactionDTO {
    private Long transactionId;
    private Long walletId;
    private Double amount;
    private Date createdAt;
    private String userName;
    private Double  total;

    public WalletTransactionDTO(Long transactionId, Long walletId,String userName, Double amount, Date createdAt) {
        this.transactionId = transactionId;
        this.walletId = walletId;
        this.userName = userName;
        this.amount = amount;
        this.createdAt = createdAt;
    }


    public WalletTransactionDTO(Long walletId, Double total,String userName) {
        this.walletId = walletId;
        this.userName = userName;
        this.total = total;
    }

}
