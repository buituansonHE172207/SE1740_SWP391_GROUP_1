package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.dto.RegisterRequest;
import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.model.User;

public interface UserService {
    User getUserById(Long id);

    User registerStaff(RegisterRequest user);

    User updateUser(User user);

    void setAccountState(Long userId, String state);

    void setRole(Long userId, String role);

    User getUserByEmail(String email);

    Page<User> getCustomerByFullNameContainingAndState(String fullName ,AccountState state, Pageable pageable);

    Page<User> getStaffByFullNameContainingAndRoleAndState(String fullName, Role role,AccountState state ,Pageable page);

    List<User> getAll();

}
