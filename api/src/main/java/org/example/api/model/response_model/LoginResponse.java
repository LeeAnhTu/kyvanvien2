package org.example.api.model.response_model;


import lombok.Getter;

@Getter
public class LoginResponse {
    private String token;
    private long expires_in;

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public LoginResponse setExpires_in(long expires_in) {
        this.expires_in = expires_in;
        return this;
    }
}
