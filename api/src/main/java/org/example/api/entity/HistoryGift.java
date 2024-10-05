package org.example.api.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "historygift")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistoryGift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hg_id")
    private Long hgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_id", nullable = false)
    @JsonIgnore
    private Story story;

    @Column(name = "amount")
    private Double Amount;

    @Column(name = "create_at")
    private Date createAt;
}
