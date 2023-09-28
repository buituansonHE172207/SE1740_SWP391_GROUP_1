package com.kas.online_book_shop.auth;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.config.JwtService;
import com.kas.online_book_shop.exception.UserAlreadyExistsException;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.RoleRepository;
import com.kas.online_book_shop.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final JwtService jwtService;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final RoleRepository roleRepository;

        public AuthenticationResponse register(RegisterRequest request) {
                var existingUser = repository.findByEmail(request.getEmail());
                if (existingUser != null) {
                        throw new UserAlreadyExistsException("Người dùng đã tồn tại.");
                }

                var user = User.builder()
                                .fullName(request.getFullname())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .roles(List.of(roleRepository.findByName("CUSTOMER")))
                                .build();
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }
}
