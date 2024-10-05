package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.entity.User;
import org.example.api.model.request_model.LoginUser;
import org.example.api.model.request_model.RegisterUser;
import org.example.api.model.response_model.LoginResponse;
import org.example.api.service.AuthService;
import org.example.api.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;


    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterUser registerUser) {
        System.out.println(registerUser);
        User registeredUser = authService.signUp(registerUser);
        return ResponseEntity.ok(registeredUser);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUser loginUser) {
        User user = authService.login(loginUser);
        String token = jwtService.generateToken(user);
        LoginResponse res = new LoginResponse().setToken(token).setExpires_in(jwtService.getExpirationTime());
        return  ResponseEntity.ok(res);
    }
}
