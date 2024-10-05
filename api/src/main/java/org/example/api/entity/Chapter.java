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
@Table(name = "chapters")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chapter_id")
    private Long chapterId;

    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    @JsonIgnore
    private Story story;

    @Column(name = "chapter_number")
    private int chapterNumber;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToMany
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany
    @JsonBackReference
    private List<UserProgress> progressList;

    @OneToMany
    @JsonBackReference
    private List<UserFollow> followList;
}
