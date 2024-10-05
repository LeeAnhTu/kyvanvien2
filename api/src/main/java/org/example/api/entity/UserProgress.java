package org.example.api.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Entity
@Table(name = "userprogress")

@AllArgsConstructor
@NoArgsConstructor
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long progressId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "story_id")
    @JsonManagedReference
    private Story story;

    @ManyToOne()
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;

    @Column(name = "status_progress")
    private int statusProgress;

    @Column(name = "last_read")
    private Date lastRead;

    public Long getProgressId() {
        return progressId;
    }

    public void setProgressId(Long progressId) {
        this.progressId = progressId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public Chapter getChapter() {
        return chapter;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }

    public int getStatusProgress() {
        return statusProgress;
    }

    public void setStatusProgress(int statusProgress) {
        this.statusProgress = statusProgress;
    }

    public Date getLastRead() {
        return lastRead;
    }

    public void setLastRead(Date lastRead) {
        this.lastRead = lastRead;
    }
}
