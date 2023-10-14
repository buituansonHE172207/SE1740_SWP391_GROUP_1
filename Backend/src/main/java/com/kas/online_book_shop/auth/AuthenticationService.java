package com.kas.online_book_shop.auth;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.config.JwtService;
import com.kas.online_book_shop.dto.ActivateAccountRequest;
import com.kas.online_book_shop.dto.AuthenticationRequest;
import com.kas.online_book_shop.dto.AuthenticationResponse;
import com.kas.online_book_shop.dto.ChangePasswordRequest;
import com.kas.online_book_shop.dto.ForgotPasswordRequest;
import com.kas.online_book_shop.dto.RegisterRequest;
import com.kas.online_book_shop.dto.ResetPasswordRequest;
import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.exception.AccountDisabledException;
import com.kas.online_book_shop.exception.ExpiredtTokenException;
import com.kas.online_book_shop.exception.OldPasswordMismatchException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.exception.UserAlreadyExistsException;
import com.kas.online_book_shop.exception.UserNotFoundException;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.UserRepository;
import com.kas.online_book_shop.email.EmailService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository userRepository;
        private final JwtService jwtService;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final EmailService emailService;

        public void register(RegisterRequest request) throws MessagingException {
                userRepository.findByEmail(request.email())
                                .ifPresent(user -> {
                                        throw new UserAlreadyExistsException("Người dùng đã tồn tại.");
                                });

                var user = User.builder()
                                .fullName(request.fullname())
                                .email(request.email())
                                .password(passwordEncoder.encode(request.password()))
                                .role(Role.USER)
                                .state(AccountState.INACTIVE)
                                .province(request.province())
                                .district(request.district())
                                .ward(request.ward())
                                .phone(request.phone())
                                .address(request.address())
                                .build();
                userRepository.save(user);
                String url = "https://sachtructuyen.shop/activation/" + jwtService.generateToken(user);
                        emailService.sendActivationEmail(request.email(), url, request.fullname());
                return;
        }

        public AuthenticationResponse activateAccount(ActivateAccountRequest request) throws MessagingException {
                var userEmail = jwtService.extractUsername(request.token());
                var user = userRepository.findByEmail(userEmail)
                                .orElseThrow();
                if (jwtService.isTokenExpired(request.token())) {
                        String url = "https://sachtructuyen.shop/activation/" + jwtService.generateToken(user);
                        emailService.sendActivationEmail(userEmail, url, user.getFullName());

                        throw new ExpiredtTokenException(
                                        "Email kích hoạt đã hết hạn. Vui lòng kiểm tra email để nhận hướng dẫn kích hoạt mới.");
                } else {
                        user.setState(AccountState.ACTIVE);
                        userRepository.save(user);
                        return new AuthenticationResponse(request.token());
                }
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) throws MessagingException {
                var user = userRepository.findByEmail(request.email())
                                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy email"));
                if (user.getState() == AccountState.INACTIVE) {
                        String url = "https://sachtructuyen.shop/activation/" + jwtService.generateToken(user);
                        emailService.sendActivationEmail(request.email(), url, user.getFullName());
                        throw new UserNotFoundException(
                                        "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.");
                }
                if (user.getState() == AccountState.ACTIVE) {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(
                                                        request.email(),
                                                        request.password()));
                        var jwtToken = jwtService.generateToken(user);
                        return new AuthenticationResponse(jwtToken);
                } else if (user.getState() == AccountState.DISABLE) {
                        throw new AccountDisabledException("Tài khoản của bạn không được phép đăng nhập.");
                }
                return null;
        }

        public AuthenticationResponse forgotPassword(ForgotPasswordRequest request) throws MessagingException {
                var existingUser = userRepository.findByEmail(request.email())
                                .orElseThrow(() -> new UserNotFoundException(
                                                "Người dùng với email '" + request.email() + "' không tồn tại."));
                var jwtToken = jwtService.generateToken(existingUser);
                String url = "https://sachtructuyen.shop/reset-password/" + jwtToken;
                emailService.sendResetPasswordEmail(request.email(), url, existingUser.getFullName());
                return new AuthenticationResponse(jwtToken);
        }

        public AuthenticationResponse changePassword(ChangePasswordRequest request) {
                var user = userRepository.findByEmail(jwtService.extractUsername(request.token()))
                                .orElseThrow();
                if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
                        throw new OldPasswordMismatchException("Mật khẩu cũ không đúng.");
                }
                user.setPassword(passwordEncoder.encode(request.newPassword()));
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return new AuthenticationResponse(jwtToken);
        }

        public AuthenticationResponse resetPassword(ResetPasswordRequest request) {
                var userEmail = jwtService.extractUsername(request.token());
                var user = userRepository.findByEmail(userEmail)
                                .orElseThrow();
                user.setPassword(passwordEncoder.encode(request.password()));
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return new AuthenticationResponse(jwtToken);
        }
}
