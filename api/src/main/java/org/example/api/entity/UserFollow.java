package org.example.api.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "userfollows")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserFollow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    @JsonBackReference
    private Story story;

    @ManyToOne
    @JoinColumn(name = "chapter_id", nullable = true)
    @JsonBackReference
    private Chapter chapter;

    @Column(name = "status_follow", nullable = false)
    private int statusFollow;

    @Column(name = "followed_at")
    private Date followedAt;

}
