package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.ChangePasswordDTO;
import org.example.api.dto.ChangeProfileDTO;
import org.example.api.dto.UserDTO;
import org.example.api.entity.User;
import org.example.api.mapper.UserMapper;
import org.example.api.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    private final UserMapper userMapper;

    public List<User> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }
    public UserDTO findUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.toDTO(user);
    }

    public boolean changePassword(ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findByEmail(changePasswordDTO.getEmail());
        if (user != null && passwordEncoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean updateProfile(ChangeProfileDTO changeProfileDTO) {
        User user = userRepository.findById(changeProfileDTO.getUserId()).orElse(null);
        if (user != null) {
            if (changeProfileDTO.getFullName() != null) {
                user.setFullName(changeProfileDTO.getFullName());
            }

            if (changeProfileDTO.getUserImg() != null) {
                user.setUserImg(changeProfileDTO.getUserImg());
            }

            userRepository.save(user);
            return true;
        }
        return false;
    }

    public Long countAllUsers() {
        try {
            return userRepository.count(); // Đếm số lượng người dùng trong database
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Failed to count users: " + e.getMessage());
        }
    }
}
