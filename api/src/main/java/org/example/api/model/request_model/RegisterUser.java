package org.example.api.model.request_model;

import lombok.Getter;
import lombok.Setter;
import org.example.api.entity.Role;

@Setter
@Getter
public class RegisterUser {
    private String fullName;
    private String email;
    private String password;
    private Role role;
}
