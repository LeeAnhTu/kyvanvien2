package org.example.api.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "historytransaction")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Historytransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ht_id")
    private Long historyTransactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(name = "TransactionType")
    private String TransactionType;

    @Column(name = "Amount")
    private Double Amount;

    @Column(name = "Currency")
    private String Currency;

    @Column(name = "TransactionDate")
    private String TransactionDate;

    @Column(name = "TransactionStatus")
    private String TransactionStatus;

    @Column(name = "PaymentMethod")
    private String PaymentMethod;

    @Column(name = "TransactionReference")
    private String TransactionReference;

    @Column(name = "Remarks")
    private String Remarks;
}
