package org.example.api.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeProfileDTO {
    private Long userId;
    private String fullName;
    private String userImg;
}
