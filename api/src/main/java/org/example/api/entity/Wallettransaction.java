package org.example.api.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "wallettransactions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Wallettransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_id", nullable = false)
    @JsonBackReference
    private Wallet wallet;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "created_at")
    private Date createdAt;


}
