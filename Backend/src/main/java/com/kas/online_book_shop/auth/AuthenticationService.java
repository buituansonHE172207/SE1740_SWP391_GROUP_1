package com.kas.online_book_shop.auth;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.config.JwtService;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.exception.OldPasswordMismatchException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.exception.UserAlreadyExistsException;
import com.kas.online_book_shop.exception.UserNotFoundException;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final JwtService jwtService;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final JavaMailSender javaMailSender;

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        public AuthenticationResponse register(RegisterRequest request) {
                repository.findByEmail(request.getEmail())
                                .ifPresent(user -> {
                                        throw new UserAlreadyExistsException("Người dùng đã tồn tại.");
                                });

                var user = User.builder()
                                .fullName(request.getFullname())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy email"));
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse forgotPassword(ForgotPasswordRequest request) {
                var existingUser = repository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new UserNotFoundException(
                                                "Người dùng với email '" + request.getEmail() + "' không tồn tại."));
                var jwtToken = jwtService.generateToken(existingUser);
                String urlWithToken = "http://localhost:3000/reset-password/" + jwtToken;
                mailMessage.setFrom("sachtructuyen123@gmail.com");
                mailMessage.setTo(request.getEmail());
                mailMessage.setSubject("Đặt lại mật khẩu");
                mailMessage.setText("Xin chào " + existingUser.getFullName() + "!\n"
                                + "Hãy nhấn vào đường link bên dưới để đặt lại mật khẩu: \n" + urlWithToken);
                javaMailSender.send(mailMessage);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse changePassword(ChangePasswordRequest request) {
                var user = repository.findByEmail(jwtService.extractUsername(request.getToken()))
                                .orElseThrow();
                if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                        throw new OldPasswordMismatchException("Mật khẩu cũ không đúng.");
                }
                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse resetPassword(ResetPasswordRequest request) {
                var userEmail = jwtService.extractUsername(request.getToken());
                var user = repository.findByEmail(userEmail)
                                .orElseThrow();
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }
}
