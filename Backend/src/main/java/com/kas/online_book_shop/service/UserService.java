package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.model.User;

public interface UserService {
    User getUserById(Long id);

    User updateUser(User user);

    void setAccountState(Long userId, String state);

    void setRole(Long userId, String role);

    User getUserByEmail(String email);

    List<User> getAllUsers();

    Page<User> getCustomerByState(AccountState state, Pageable pageable);

    Page<User> getStaffByRoleAndState(Role role,AccountState state ,Pageable page);

    Page<User> searchCustomerByFullName(String fullName, Pageable pageable);

    Page<User> searchStaffByFullName(String fullName, Pageable pageable);

    
}
