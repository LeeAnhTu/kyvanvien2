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
@Table(name = "ratings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Long ratingId;

    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    @JsonIgnore
    private Story story;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(name = "rating")
    private double rating;

    @Column(name = "created_at")
    private Date createdAt;
}
