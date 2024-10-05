package org.example.api.service;


import org.example.api.entity.Role;
import org.example.api.entity.User;
import org.example.api.entity.Wallet;
import org.example.api.model.request_model.LoginUser;
import org.example.api.model.request_model.RegisterUser;
import org.example.api.repository.RoleRepository;
import org.example.api.repository.UserRepository;
import org.example.api.repository.WalletRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final WalletRepository walletRepository;
    private final RoleRepository roleRepository;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, WalletRepository walletRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.walletRepository = walletRepository;
        this.roleRepository = roleRepository;
    }

//    public User signUp(RegisterUser input) {
//        User user = new User()
//                .setEmail(input.getEmail())
//                .setFullName(input.getFullName())
//                .setPassword(passwordEncoder.encode(input.getPassword()))
//                .setRole(input.getRole());
//
//        Wallet wallet = new Wallet();
//        wallet.setUser(user);
//        walletRepository.save(wallet);
//        return userRepository.save(user);
//    }
    public User signUp(RegisterUser input) {
        Role defaultRole = roleRepository.findById(3L)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        User user = new User()
                .setEmail(input.getEmail())
                .setFullName(input.getFullName())
                .setPassword(passwordEncoder.encode(input.getPassword()))
                .setRole(defaultRole);  // Đặt role mặc định là 3

        // Lưu người dùng trước
        user = userRepository.save(user);

        // Tạo và lưu ví sau khi người dùng đã được lưu
        Wallet wallet = new Wallet();
        wallet.setBalance(0.00);
        wallet.setUser(user);
        walletRepository.save(wallet);

        return user;
    }

    public User login(LoginUser input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword())
        );
        User user = userRepository.findByEmail(input.getEmail());
        if(user == null) {
            throw new UsernameNotFoundException("User or password is incorrect");
        }
        return user;
    }
}
