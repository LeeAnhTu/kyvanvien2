package org.example.api.model.request_model;


import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class LoginUser {
    private String email;
    private String password;
}
