package com.kas.online_book_shop.controller;

import java.util.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<List<User>> getUser() {
        var users = userService.getAllUsers();
        if (users.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(users);
    }
}
