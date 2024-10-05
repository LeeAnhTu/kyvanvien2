package org.example.api.controller;

import lombok.AllArgsConstructor;
import org.example.api.dto.ChangePasswordDTO;
import org.example.api.dto.ChangeProfileDTO;
import org.example.api.dto.UserDTO;
import org.example.api.entity.User;
import org.example.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping ("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable long id) {
        UserDTO userDTO = userService.findUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        boolean isChanged = userService.changePassword(changePasswordDTO);
        if (isChanged) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid old password or Email");
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody ChangeProfileDTO changeProfileDTO) {
        boolean isUpdated = userService.updateProfile(changeProfileDTO);
        if (isUpdated) {
            return ResponseEntity.ok("Profile updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found or invalid data");
        }
    }

    // API để đếm số lượng thành viên
    @GetMapping("/count")
    public Long countUsers() {
        return userService.countAllUsers(); // Gọi đến phương thức count từ service
    }
}
