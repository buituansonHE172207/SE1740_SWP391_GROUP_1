package com.kas.online_book_shop.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
import com.kas.online_book_shop.exception.AccountInactiveException;
import com.kas.online_book_shop.exception.ExpiredtTokenException;
import com.kas.online_book_shop.exception.OldPasswordMismatchException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.exception.UnauthorizedException;
import com.kas.online_book_shop.exception.UserAlreadyExistsException;
import com.kas.online_book_shop.exception.UserNotFoundException;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.UserRepository;
import com.kas.online_book_shop.service.email.EmailService;

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
                                        throw new UserAlreadyExistsException(
                                                        "Người dùng với email: " + request.email() + " đã tồn tại.");
                                });
                var user = User.builder()
                                .fullName(request.fullName())
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
                emailService.sendActivationEmail(request.email(), request.fullName(), jwtService.generateToken(user));
                return;
        }

        public AuthenticationResponse activateAccount(ActivateAccountRequest request) throws MessagingException {
                var userEmail = jwtService.extractUsername(request.token());
                var user = userRepository.findByEmail(userEmail)
                                .orElseThrow();
                if (jwtService.isTokenExpired(request.token())) {
                        emailService.sendActivationEmail(userEmail, user.getFullName(), jwtService.generateToken(user));
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
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Người dùng với email: " + request.email()
                                                                + " không tồn tại. \nVui lòng đăng ký tài khoản mới."));
                if (user.getState() == AccountState.INACTIVE) {
                        emailService.sendActivationEmail(request.email(), user.getFullName(),
                                        jwtService.generateToken(user));
                        throw new AccountInactiveException("");
                } else if (user.getState() == AccountState.DISABLE) {
                        throw new AccountDisabledException("");
                } else if (user.getState() == AccountState.ACTIVE) {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(
                                                        request.email(),
                                                        request.password()));
                        var jwtToken = jwtService.generateToken(user);
                        return new AuthenticationResponse(jwtToken);
                }
                return null;
        }

        public void forgotPassword(ForgotPasswordRequest request) throws MessagingException {
                var existingUser = userRepository.findByEmail(request.email())
                                .orElseThrow(() -> new UserNotFoundException(
                                                "Người dùng với email '" + request.email() + "' không tồn tại."));
                if (existingUser.getRole() != Role.USER) {
                        throw new UnauthorizedException(
                                        "Không có quyền truy cập. Vui lòng liên hệ quản trị viên để được hỗ trợ.");
                }
                emailService.sendResetPasswordEmail(request.email(), existingUser.getFullName(),
                                jwtService.generateToken(existingUser));
                return;
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
                if (user.getRole() == Role.USER) {
                        user.setPassword(passwordEncoder.encode(request.password()));
                        userRepository.save(user);
                        var jwtToken = jwtService.generateToken(user);
                        return new AuthenticationResponse(jwtToken);
                } else {
                        throw new UnauthorizedException("Không có quyền truy cập.");
                }
        }
}
