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
@Table(name = "genres")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private Long genreId;

    @Column(name = "genre_name")
    private String genreName;

    @Column(name = "slug")
    private String slug;

//    @OneToMany(mappedBy = "genre")
//    @JsonManagedReference
//    private Set<Story> stories;

    @OneToMany(mappedBy = "genre", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Story> stories;

}