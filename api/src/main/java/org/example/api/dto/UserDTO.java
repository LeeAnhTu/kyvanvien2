package org.example.api.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String fullName;
    private String email;
    private String password;
    private String userImg;
    private double balance;
    private Date createdAt;
}
