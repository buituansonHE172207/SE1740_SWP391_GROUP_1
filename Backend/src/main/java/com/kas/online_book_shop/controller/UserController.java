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

import com.kas.online_book_shop.dto.RegisterRequest;
import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));   
    }

    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @GetMapping("/customer")
    public ResponseEntity<Page<User>> getCustomer(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) AccountState state,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        return ResponseEntity.ok(userService.getCustomerByFullNameContainingAndState(fullName, state, pageable));
    }

    @GetMapping("/staff")
    public ResponseEntity<Page<User>> getStaff(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) AccountState state,
            @RequestParam(required = false) Role role,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        return ResponseEntity.ok(userService.getStaffByFullNameContainingAndRoleAndState(fullName, role, state, pageable));
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

    @PostMapping("/staff/register")
    public ResponseEntity<User> addStaff(
        @RequestBody RegisterRequest user) {
        return ResponseEntity.ok(userService.registerStaff(user));
    }

    @PostMapping("/get-all")
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }
    
}
