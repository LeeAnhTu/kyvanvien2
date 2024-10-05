package org.example.api.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "statusstories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Statusstory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private Long statusId;

    @Column(name = "status_name")
    private String statusName;

    @OneToMany
    @JsonIgnore
    private Set<Story> stories;
}
