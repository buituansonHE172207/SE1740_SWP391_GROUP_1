package com.kas.online_book_shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.dto.ActivateAccountRequest;
import com.kas.online_book_shop.dto.AuthenticationRequest;
import com.kas.online_book_shop.dto.AuthenticationResponse;
import com.kas.online_book_shop.dto.ChangePasswordRequest;
import com.kas.online_book_shop.dto.ForgotPasswordRequest;
import com.kas.online_book_shop.dto.RegisterRequest;
import com.kas.online_book_shop.dto.ResetPasswordRequest;
import com.kas.online_book_shop.service.AuthenticationService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) throws MessagingException {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<AuthenticationResponse> forgotPassword(
            @RequestBody ForgotPasswordRequest request) throws MessagingException {
        authenticationService.forgotPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/change-password")
    public ResponseEntity<AuthenticationResponse> changePassword(
            @RequestBody ChangePasswordRequest request) {
        ResponseEntity.ok(authenticationService.changePassword(request));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<AuthenticationResponse> resetPassword(
            @RequestBody ResetPasswordRequest request) {
        authenticationService.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/activation")
    public ResponseEntity<AuthenticationResponse> activateAccount(
            @RequestBody ActivateAccountRequest request) throws MessagingException {
        authenticationService.activateAccount(request);
        return ResponseEntity.ok(authenticationService.activateAccount(request));
    }
}
