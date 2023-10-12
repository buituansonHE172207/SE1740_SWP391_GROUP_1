package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.model.User;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    Page<User> getUserByRole(Role role, Pageable page);

    Page<User> getCustomerByState(AccountState state, Pageable pageable);

    User getUserByEmail(String email);

    User updateUser(User user);

    void setAccountState(Long userId, String state);

    void setRole(Long userId, String role);
}
