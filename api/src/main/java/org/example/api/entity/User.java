package org.example.api.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "fullname" )
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "user_img")
    private String userImg;

    @Column(name = "created_at")
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
//    @JsonIgnore
    private Role role;

    @OneToMany
    @JsonIgnore
    private List<Story> stories;

    @OneToMany
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany
    @JsonIgnore
    private List<Rating> ratings;

    @OneToMany
    @JsonIgnore
    private List<UserLike> likes;

    @OneToMany
    @JsonIgnore
    private List<UserFollow> follows;

    @OneToMany
    @JsonBackReference
    private List<UserProgress> progressList;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Wallet wallet;

    @OneToMany
    @JsonIgnore
    private List<HistoryGift> historyGifts;


    public User setId(Long id) {
        this.id = id;
        return this;
    }

    public User setFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }
    public User setUserImg(String userImg) {
        this.userImg = userImg;
        return this;
    }

    public User setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public User setRole(Role role) {
        this.role = role;
        return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = List.of(
                new SimpleGrantedAuthority(getRole().getRoleName())
        );
        return  list;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
