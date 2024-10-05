package org.example.api.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "giftrequest")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GiftRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rg_id")
    private Long rgId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;  // Liên kết với bảng User (người dùng gửi yêu cầu)

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "user_id")
    private User admin;  // Liên kết với bảng User (admin xử lý yêu cầu)

    @Column(name = "card_value")
    private Integer cardValue;

    @Column(name = "diamonds_used")
    private Integer diamondsUsed;

    @Column(name = "request_date", nullable = false)
    private Date requestDate;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "admin_response")
    private String adminResponse;

    @Column(name = "admin_response_date")
    private Date adminResponseDate;
}
