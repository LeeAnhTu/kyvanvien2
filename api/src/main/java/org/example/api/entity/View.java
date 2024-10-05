package org.example.api.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "view")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class View {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "view_id")
    private Long viewId;

    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;


    @Column(name = "created_at")
    private Date createdAt;
}
