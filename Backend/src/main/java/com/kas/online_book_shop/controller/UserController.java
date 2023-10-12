package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @GetMapping("/customer")
    public ResponseEntity<Page<User>> getUserByRole(
            @RequestParam(required = false) AccountState state,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        var customers = userService.getCustomerByState(state, pageable);
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/by-email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PutMapping("/set-account-state/{id}")
    public ResponseEntity<Void> setAccountState(
            @PathVariable Long id,
            @RequestParam String state) {
        userService.setAccountState(id, state);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/set-role/{id}")
    public ResponseEntity<Void> setRole(
            @PathVariable Long id,
            @RequestParam String role) {
        userService.setRole(id, role);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add")
    public ResponseEntity<User> addStaff(
        @RequestBody User user) {
            return null;
    }


    
}
