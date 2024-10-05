package org.example.api.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "stories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "story_id")
    private Long id;

    @Column(name = "story_img")
    private String storyImg;

    @Column(name = "title")
    private String title;

    @Column(name = "slug")
    private String slug;

    @Column(name = "description")
    private String description;

    @Column(name = "author")
    private String author;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "genre_id", nullable = false)
    @JsonBackReference
    private Genre genre;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    @JsonBackReference
    private Statusstory status;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    @JsonBackReference
    private Type type;

    @Column(name = "check_story")
    private Long checkStory;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Chapter> chapters;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Rating> ratings;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserLike> likes;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserFollow> follows;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserProgress> progressList;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<View> views;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<HistoryGift> historyGifts;
}