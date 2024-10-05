package org.example.api.mapper;


import org.example.api.dto.UserDTO;
import org.example.api.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        return new UserDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPassword(),
                user.getUserImg(),
                user.getWallet() != null ? user.getWallet().getBalance() : null, // Lấy ID của Story
                user.getCreatedAt()
        );
    }
}
