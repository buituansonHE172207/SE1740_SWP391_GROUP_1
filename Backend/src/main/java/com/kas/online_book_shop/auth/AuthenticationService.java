package com.kas.online_book_shop.auth;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.config.JwtService;
import com.kas.online_book_shop.dto.AuthenticationRequest;
import com.kas.online_book_shop.dto.AuthenticationResponse;
import com.kas.online_book_shop.dto.ChangePasswordRequest;
import com.kas.online_book_shop.dto.ForgotPasswordRequest;
import com.kas.online_book_shop.dto.RegisterRequest;
import com.kas.online_book_shop.dto.ResetPasswordRequest;
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
                repository.findByEmail(request.email())
                                .ifPresent(user -> {
                                        throw new UserAlreadyExistsException("Người dùng đã tồn tại.");
                                });

                var user = User.builder()
                                .fullName(request.fullname())
                                .email(request.email())
                                .password(passwordEncoder.encode(request.password()))
                                .role(Role.USER)
                                .province(request.province())
                                .district(request.district())
                                .ward(request.ward())
                                .phone(request.ward())
                                .address(request.address())
                                .build();
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return new AuthenticationResponse(jwtToken);
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                var user = repository.findByEmail(request.email())
                                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy email"));
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.email(),
                                                request.password()));
                var jwtToken = jwtService.generateToken(user);
                return new AuthenticationResponse(jwtToken);
        }

        public AuthenticationResponse forgotPassword(ForgotPasswordRequest request) {
                var existingUser = repository.findByEmail(request.email())
                                .orElseThrow(() -> new UserNotFoundException(
                                                "Người dùng với email '" + request.email() + "' không tồn tại."));
                var jwtToken = jwtService.generateToken(existingUser);
                String urlWithToken = "http://localhost:3000/reset-password/" + jwtToken;
                mailMessage.setFrom("sachtructuyen123@gmail.com");
                mailMessage.setTo(request.email());
                mailMessage.setSubject("Đặt lại mật khẩu");
                mailMessage.setText("Xin chào " + existingUser.getFullName() + "!\n"
                                + "Hãy nhấn vào đường link bên dưới để đặt lại mật khẩu: \n" + urlWithToken);
                javaMailSender.send(mailMessage);
                return new AuthenticationResponse(jwtToken);
        }

        public AuthenticationResponse changePassword(ChangePasswordRequest request) {
                var user = repository.findByEmail(jwtService.extractUsername(request.token()))
                                .orElseThrow();
                if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
                        throw new OldPasswordMismatchException("Mật khẩu cũ không đúng.");
                }
                user.setPassword(passwordEncoder.encode(request.newPassword()));
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return new AuthenticationResponse(jwtToken);
        }

        public AuthenticationResponse resetPassword(ResetPasswordRequest request) {
                var userEmail = jwtService.extractUsername(request.token());
                var user = repository.findByEmail(userEmail)
                                .orElseThrow();
                user.setPassword(passwordEncoder.encode(request.password()));
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return new AuthenticationResponse(jwtToken);
        }
}
